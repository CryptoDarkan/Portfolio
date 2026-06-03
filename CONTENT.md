# Što popuniti (copy-paste checklist)

Otvori `index.html` i zamijeni placeholder tekst. Ovo je redoslijed kao na kosta.fyi.

## Header

| Polje | Gdje u HTML | Primjer |
|-------|-------------|---------|
| Inicijali (logo) | `.mark` i `favicon.svg` | `NK` |
| Puno ime | `.name` + `<title>` | Nikola Kostadinovic |
| Podnaslov | `.tagline` | prev. co-founder of … |

## Bio (5 paragrafa — možeš skratiti)

1. Tko si / što radiš (1–2 rečenice)
2. Što trenutno radiš + linkovi (projekti, alati, hobby)
3. Prethodno iskustvo (firme, brojke, klijenti)
4. Featured / nagrade (opcionalno)
5. Otvoren za posao + **email** (`data-copy`) + **Twitter/LinkedIn**

## Highlights (projekti)

Za svaki red u `.project-list`:

- **Ime projekta** → `project-name`
- **Tip** → `project-type` (npr. Web, Product, Next.js)
- **URL** → `href` na `<a>` (mora biti puni link: `https://...`)

Dodaj ili obriši `<li>...</li>` blokove po potrebi.

## Meta / SEO

U `<head>`:

- `meta name="description"`
- `meta property="og:title"` i `og:description`
- Kasnije na Vercelu: Settings → dodaj **og:image** (screenshot 1200×630) ako želiš lijep preview na Twitteru

## Kad pošalješ u chat

Napiši mi:

1. Ime i podnaslov
2. Bio tekst (možeš grubo, ja ću dotjerati HTML)
3. Listu projekata: ime | tip | URL
4. Email + društvene mreže
5. GitHub username (za link u projektima)
6. Želiš li domenu (npr. tvojeime.dev) ili samo `*.vercel.app`

Ja ću ti ubaciti sve u `index.html`.
