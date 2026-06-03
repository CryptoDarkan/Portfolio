# Portfolio

Minimalistički portfolio (inspiracija: [kosta.fyi](https://kosta.fyi/)) — statični HTML/CSS/JS, spreman za Vercel.

## Lokalno pokretanje

```bash
npx serve .
```

Otvori http://localhost:3000

## Što urediti prije objave

1. `index.html` — ime, bio, projekti, email, linkovi
2. `favicon.svg` — inicijali u krugu
3. Meta tagovi u `<head>` (title, description, og:*)
4. Zamijeni `tvoj@email.com` i `tvoj_handle` stvarnim podacima

## GitHub + Vercel (prvi put)

### 1. GitHub repozitorij

1. Idi na https://github.com/new
2. Ime: npr. `portfolio` (Public)
3. **Ne** dodavaj README/license (već postoji lokalno)
4. Kreiraj repo i kopiraj URL (npr. `https://github.com/TVOJ-USER/portfolio.git`)

U terminalu u ovom folderu:

```powershell
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/TVOJ-USER/portfolio.git
git push -u origin main
```

### 2. Vercel deploy

1. https://vercel.com — prijavi se s GitHub računom
2. **Add New Project** → odaberi `portfolio` repo
3. Framework: **Other** (statika)
4. Root Directory: `.` — Deploy

Svaki `git push` na `main` automatski redeploya stranicu.

### 3. Custom domena (opcionalno)

Vercel → Project → Settings → Domains → dodaj domenu i slijedi DNS upute.

## Optimizacije uključene

- Responsive, pristupačan layout
- `meta` + Open Graph za dijeljenje linka
- Security headers (`vercel.json`)
- Cache za statičke assete
- Copy-to-clipboard za email (kao na kosta.fyi)
