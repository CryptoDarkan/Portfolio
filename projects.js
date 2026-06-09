/**
 * Projekti — logo → logos/ | screenshot(i) → images/
 *
 * Pošalji agentu za svaki projekat:
 *   name, type, role (npr. "CMO · Strategy & execution"),
 *   logo, description, achievements[], url, x (X profile URL), screenshots[]
 */
const PROJECTS = [
  {
    id: "multibank",
    name: "mb.io",
    type: "MultiBank Group · Exchange",
    role: "CMO · Strategy & Execution",
    teaser: "0 to 141K organic on X · ~$50M TGE vol",
    featured: true,
    logo: "/logos/Multibank.jpg",
    visualsLabel: "Proof",
    screenshots: [
      {
        src: "/images/multibank-tge-proof.png",
        alt: "MBG token chart showing TGE launch spike",
        headline: "MBG chart at TGE launch",
        headlineStyle: "note",
      },
      {
        src: "/images/multibank-x-proof.png",
        alt: "mb.io X profile showing 141.6K followers",
        headline: "141K followers, built from scratch",
        headlineStyle: "note",
      },
    ],
    description:
      "Marketing leadership for mb.io (MultiBank Group), one of the most regulated crypto exchanges globally. I built the GTM strategy from scratch, organized and executed every campaign end to end, and led the MBG token launch from pre-launch through TGE: community, KOL, airdrop, PR, and coordination with market makers and listing partners.",
    achievements: [
      "0 to 141K organic followers on @multibank_io",
      "KOL campaign with 200+ influencers",
      "Airdrop, PR, and community built end to end",
      "TGE peak: ~$50M daily volume",
    ],
    url: "https://mb.io",
    x: "https://x.com/multibank_io",
  },
  {
    id: "t-rize",
    name: "T-Rize",
    type: "Institutional RWA · Tokenization",
    role: "CMO · Launch & GTM",
    teaser: "0 to 60K on Discord · 5x at TGE",
    logo: "/logos/T-Rize.jpg",
    visualsLabel: "Proof",
    screenshots: [
      {
        src: "/images/t-rize-tge-1h.png",
        alt: "RIZE 1h chart showing TGE launch spike",
        headline: "5x at TGE launch",
        headlineStyle: "note",
      },
      {
        src: "/images/t-rize-coinbase.png",
        alt: "RIZE listed on Coinbase Wallet",
        headline: "Listed on Coinbase Wallet",
        headlineStyle: "note",
      },
    ],
    description:
      "External CMO at T-Rize, a leading institutional RWA tokenization platform. Led the full Zealy airdrop campaign end to end and organized all growth campaigns: community, PR, KOL, partnerships, Coinbase Wallet listing, Aerodrome DEX launch, and token momentum with market makers.",
    achievements: [
      "5x at TGE peak",
      "0 to 60K community members on Discord at peak",
      "Coinbase Wallet + Aerodrome DEX launch",
      "Token momentum strategy with market makers",
    ],
    url: "https://t-rize.io",
    x: "https://x.com/trize_io",
  },
  {
    id: "foru",
    name: "ForU AI",
    type: "AI DiD · BNB Chain",
    role: "CMO · Community & Campaigns",
    teaser: "0 to 250K on X · 0 to 100K on Discord · 100K on TG Mini App",
    logo: "/logos/ForU.jpg",
    visualsLabel: "Proof",
    screenshots: [],
    description:
      "Ran marketing and community for ForU AI, a proof-based reputation layer on BNB Chain. Grew X to 250K followers and Discord to 100K members through campaigns and initiatives. Supported TGE on both DEX and CEX.",
    achievements: [
      "0 to 250K followers on @4uaicrypto",
      "0 to 100K members on Discord",
      "Cookie campaign, NFT mint GTM, hackathons, and TG Mini App launch",
      "TGE execution on DEX and CEX",
    ],
    url: "https://foru.ai",
    x: "https://x.com/4uaicrypto",
  },
  {
    id: "sixr",
    name: "SIXR Cricket",
    type: "TON · SportsFi",
    role: "CMO · Sports & Community",
    teaser: "108K on X · 225K waitlist · Chris Gayle",
    logo: "/logos/SixR.jpg",
    visualsLabel: "Proof",
    screenshots: [],
    description:
      "Pre-TGE growth for SIXR Cricket, the first Web3 SportsFi ecosystem for cricket on TON. Chris Gayle partnership, First Innings mini-app campaigns, cricket calendar content, and celebrity collectibles ahead of beta launch.",
    achievements: [
      "Chris Gayle partnership: #SIXRChallenge + Icon Player collectibles",
      "108K+ on @SIXR_cricket, 225K+ waitlist, 80K+ wallets",
      "Chase tasks + social farming: pre-TGE retention at scale",
      "Early NFT drop sell-out + Bongo distribution",
    ],
    url: "https://sixrcricket.com",
    x: "https://x.com/SIXR_cricket",
  },
  {
    id: "yescoin",
    name: "Yescoin",
    type: "TON · Telegram Mini App",
    role: "CMO · Token Launch & Scale",
    teaser: "3.55M on X · 13M users · TGE 35M FDV",
    logo: "/logos/Yescoin.jpg",
    visualsLabel: "Proof",
    screenshots: [],
    description:
      "Global growth lead for Yescoin, a TON rewards network and one of the largest Telegram mini-apps in crypto. TGE and public sale, viral airdrop series, affiliate program launch, and TON ecosystem campaigns.",
    achievements: [
      "3.55M+ followers on @Yescoin_Fam",
      "13M+ users on Telegram mini-app",
      "TGE + public sale: 35M FDV community round",
      "TON Open League win: 1M+ new wallets in one day",
    ],
    url: "https://yescoin.foundation",
    x: "https://x.com/Yescoin_Fam",
  },
  {
    id: "origins-trail",
    name: "OriginTrail",
    type: "DKG · Verifiable AI",
    role: "CMO · Enterprise & Product",
    teaser: "91K on X · 30K audits · nOS launch",
    logo: "/logos/OriginsTrail.jpg",
    visualsLabel: "Proof",
    screenshots: [],
    description:
      "Product and narrative marketing for OriginTrail, the decentralized knowledge graph behind verifiable AI. nOS and DKG v10 launch, enterprise campaigns with SCAN and Guardian, and builder adoption across Claude, Cursor, and VSCode.",
    achievements: [
      "nOS + DKG v10 launch: 100K+ views on launch content",
      "SCAN partnership: 30K live factory audits, ~$9M network revenue",
      "Guardian agent campaign with umanitek (deepfake detection)",
      "91K followers on @origin_trail (builders + enterprise)",
    ],
    url: "https://origintrail.io",
    x: "https://x.com/origin_trail",
  },
  {
    id: "litvm",
    name: "LitVM",
    type: "Litecoin L2 · zkRollup",
    role: "CMO · Infra & Community",
    teaser: "36.5K on X · 40M testnet tx · Reddit r/litecoin",
    logo: "/logos/LitVM.png",
    visualsLabel: "Proof",
    screenshots: [],
    description:
      "Infra marketing for LitVM, the first trustless EVM zkRollup on Litecoin. LiteForge testnet launch, Reddit campaign with consistent top placement in r/litecoin, Builders Program growth, and Hard Money Web3 narrative with Litecoin Foundation backing.",
    achievements: [
      "Led Reddit campaign: consistently top posts in r/litecoin",
      "LiteForge testnet: 40M+ transactions, thousands of active wallets",
      "51% community supply narrative + LTC holder incentives",
      "36.5K+ followers on @LitecoinVM",
    ],
    url: "https://litvm.com",
    x: "https://x.com/LitecoinVM",
  },
];
