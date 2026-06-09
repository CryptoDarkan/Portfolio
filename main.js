const toast = document.getElementById("toast");

let audioCtx = null;
let lastHoverSound = 0;
let hoverSoundPending = false;

function prefersReducedEffects() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ensureAudioContext() {
  if (prefersReducedEffects()) return null;

  try {
    if (!audioCtx || audioCtx.state === "closed") {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      void audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function unlockAudioSync() {
  const ctx = ensureAudioContext();
  if (!ctx || ctx.state === "running") return ctx;
  try {
    void ctx.resume();
  } catch {
    // Browser blocked until a user gesture.
  }
  return ctx;
}

async function unlockAudio() {
  const ctx = unlockAudioSync();
  if (!ctx) return false;
  if (ctx.state === "running") return true;

  try {
    await ctx.resume();
    return ctx.state === "running";
  } catch {
    return false;
  }
}

function playProjectHoverSound() {
  const ctx = ensureAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const now = performance.now();
  if (now - lastHoverSound < 90) return;
  lastHoverSound = now;

  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(640, t);
  osc.frequency.exponentialRampToValueAtTime(420, t + 0.05);

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.08);
}

function requestHoverSound() {
  if (prefersReducedEffects()) return;

  const ctx = ensureAudioContext();
  if (!ctx) return;
  if (ctx.state === "running") {
    playProjectHoverSound();
    return;
  }

  hoverSoundPending = true;
  const tryPlay = () => {
    if (!hoverSoundPending || ctx.state !== "running") return;
    hoverSoundPending = false;
    playProjectHoverSound();
  };

  ctx.onstatechange = tryPlay;
  void ctx.resume().then(tryPlay).catch(() => {
    hoverSoundPending = false;
  });
}

function bootAudio() {
  if (prefersReducedEffects()) return;
  const activation = navigator.userActivation;
  if (activation?.isActive || activation?.hasBeenActive) {
    void unlockAudio();
  }
}

function onPageActivate() {
  unlockAudioSync();
  if (audioCtx?.state === "running") {
    if (hoverSoundPending) {
      hoverSoundPending = false;
      playProjectHoverSound();
    }
    return;
  }
  void unlockAudio();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootAudio, { once: true });
} else {
  bootAudio();
}

document.addEventListener("pointerdown", onPageActivate, { capture: true, passive: true });
document.addEventListener("touchstart", onPageActivate, { capture: true, passive: true });
document.addEventListener("click", onPageActivate, { capture: true, passive: true });
document.addEventListener("wheel", onPageActivate, { capture: true, passive: true });
document.addEventListener("keydown", onPageActivate, { capture: true });

const projectList = document.getElementById("project-list");
const projectModal = document.getElementById("project-modal");
const modalLogo = document.getElementById("modal-logo");
const modalTitle = document.getElementById("modal-title");
const modalType = document.getElementById("modal-type");
const modalRole = document.getElementById("modal-role");
const modalDescription = document.getElementById("modal-description");
const modalAchievements = document.getElementById("modal-achievements");
const modalScreenshots = document.getElementById("modal-screenshots");
const modalVisuals = document.getElementById("modal-visuals");
const modalVisualsLabel = document.getElementById("modal-visuals-label");
const modalLink = document.getElementById("modal-link");
const modalXLink = document.getElementById("modal-x-link");

function normalizeScreenshot(item) {
  if (typeof item === "string") {
    return { src: item, alt: "", headline: "" };
  }
  return {
    src: item.src,
    alt: item.alt || "",
    headline: item.headline || "",
    headlineStyle: item.headlineStyle || "",
    imageFocus: item.imageFocus || "",
  };
}

function getProjectScreenshots(project) {
  if (Array.isArray(project.screenshots) && project.screenshots.length > 0) {
    return project.screenshots.map(normalizeScreenshot);
  }
  if (project.screenshot) {
    return [normalizeScreenshot(project.screenshot)];
  }
  return [];
}

function bindProjectRowSound(row) {
  row.addEventListener("pointerenter", () => {
    requestHoverSound();
  });

  row.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    unlockAudioSync();
    playProjectHoverSound();
  });
}

function openProjectModal(project) {
  if (!projectModal) return;

  modalTitle.textContent = project.name;
  modalType.textContent = project.type;
  modalDescription.textContent = project.description;
  modalLogo.src = project.logo;
  modalLogo.alt = `${project.name} logo`;

  if (modalRole) {
    if (project.role) {
      modalRole.textContent = project.role;
      modalRole.hidden = false;
    } else {
      modalRole.textContent = "";
      modalRole.hidden = true;
    }
  }

  modalAchievements.innerHTML = "";
  project.achievements.forEach((item) => {
    const li = document.createElement("li");
    li.className = "modal-achievement";
    li.textContent = item;
    modalAchievements.appendChild(li);
  });

  const screenshots = getProjectScreenshots(project);
  if (modalScreenshots) {
    modalScreenshots.innerHTML = "";
    if (screenshots.length > 0) {
      screenshots.forEach((shot, index) => {
        const figure = document.createElement("figure");
        figure.className = "modal-shot modal-shot--proof";

        if (shot.headline) {
          const headline = document.createElement("p");
          headline.className = "modal-shot-headline";
          if (shot.headlineStyle) {
            headline.classList.add(`modal-shot-headline--${shot.headlineStyle}`);
          }
          headline.textContent = shot.headline;
          figure.appendChild(headline);
        }

        const img = document.createElement("img");
        img.className = "modal-screenshot";
        if (shot.imageFocus) {
          img.classList.add(`modal-screenshot--focus-${shot.imageFocus}`);
        }
        img.src = shot.src;
        img.alt = shot.alt || `${project.name} image ${index + 1}`;
        img.loading = "lazy";
        img.decoding = "async";
        figure.appendChild(img);

        modalScreenshots.appendChild(figure);
      });
    }
  }

  if (modalVisualsLabel) {
    modalVisualsLabel.textContent = project.visualsLabel || "Proof of work";
  }

  if (modalVisuals) {
    modalVisuals.hidden = screenshots.length === 0;
  }

  if (modalLink) {
    if (project.url) {
      modalLink.href = project.url;
      modalLink.hidden = false;
    } else {
      modalLink.hidden = true;
    }
  }

  if (modalXLink) {
    if (project.x) {
      modalXLink.href = project.x;
      modalXLink.hidden = false;
    } else {
      modalXLink.hidden = true;
    }
  }

  const modalFooter = projectModal.querySelector(".modal-footer");
  if (modalFooter) {
    modalFooter.hidden = !project.url && !project.x;
  }

  projectModal.showModal();
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  if (!projectModal?.open) return;
  projectModal.close();
  document.body.classList.remove("modal-open");
}

function renderProjects() {
  if (!projectList || typeof PROJECTS === "undefined") return;

  projectList.innerHTML = "";

  PROJECTS.forEach((project) => {
    const li = document.createElement("li");
    const row = document.createElement("button");
    row.type = "button";
    row.className = "project-row";
    if (project.featured) {
      row.classList.add("project-row--featured");
    }
    row.setAttribute("data-project-id", project.id);

    const teaserMarkup = project.teaser
      ? `<span class="project-teaser">${project.teaser}</span>`
      : "";

    row.innerHTML = `
      <span class="project-leading">
        <img class="project-logo" src="${project.logo}" alt="" width="32" height="32" loading="lazy" />
        <span class="project-name">${project.name}</span>
      </span>
      <span class="project-meta">
        <span class="project-type">${project.type}</span>
        ${teaserMarkup}
      </span>
      <span class="project-open" aria-hidden="true">→</span>
    `;

    row.addEventListener("click", () => openProjectModal(project));
    bindProjectRowSound(row);

    li.appendChild(row);
    projectList.appendChild(li);
  });
}

renderProjects();
initSignature();
scrollToHashTarget({ smooth: false });

window.addEventListener("hashchange", () => {
  scrollToHashTarget();
});

function initSignature() {
  const hero = document.getElementById("hero");
  const signature = hero?.querySelector(".signature-img");
  if (!hero || !signature) return;

  if (prefersReducedEffects()) {
    signature.classList.add("signature-img--done");
    hero.classList.add("is-ready");
    return;
  }

  signature.classList.add("signature-img--animate");

  window.setTimeout(() => {
    signature.classList.add("signature-img--done");
    hero.classList.add("is-ready");
  }, 380);
}

function scrollToHashTarget({ smooth = true } = {}) {
  const { hash } = window.location;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  target.scrollIntoView({
    behavior: smooth && !prefersReducedEffects() ? "smooth" : "auto",
    block: "start",
  });
}

function socialLinkContent(item) {
  const icon = SOCIAL_ICONS?.[item.id] ?? "";
  return `<span class="social-link__icon" aria-hidden="true">${icon}</span>`;
}

function renderSocialLinks() {
  const container = document.getElementById("social-links");
  if (!container || typeof SOCIAL_LINKS === "undefined") return;

  container.innerHTML = "";

  SOCIAL_LINKS.forEach((item) => {
    if (item.copy) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "social-link is-copy";
      button.setAttribute("aria-label", item.label);
      button.title = item.label;
      button.innerHTML = socialLinkContent(item);
      button.setAttribute("data-copy", item.copy);
      container.appendChild(button);
      return;
    }

    const link = document.createElement("a");
    link.className = "social-link";
    link.href = item.href;
    link.setAttribute("aria-label", item.label);
    link.title = item.label;
    link.innerHTML = socialLinkContent(item);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    container.appendChild(link);
  });

  container.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy");
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        showToast("Email copied to clipboard");
      } catch {
        showToast(value);
      }
    });
  });
}

renderSocialLinks();

projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});

projectModal?.addEventListener("cancel", () => {
  document.body.classList.remove("modal-open");
});

projectModal
  ?.querySelector(".modal-close")
  ?.addEventListener("click", closeProjectModal);

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  if (button.closest(".social-links")) return;

  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      showToast("Email copied to clipboard");
    } catch {
      showToast(value);
    }
  });
});
