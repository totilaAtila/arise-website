# Arise — website redesign (developer handoff)

Static **HTML + CSS + vanilla JS**. No React, no Vite, no build step. Drop the files
into your repo and serve as-is. The 4-language translation system is kept.

## Files

```
index.html            static markup (semantic HTML, no framework)
src/styles.css        all styles, two themes via [data-theme]
src/app.js            vanilla JS: i18n, theme, language, routing, gallery, FAQ
src/translations.js   copy for all 4 languages (en, ro, pl, hu)  ← source of truth
assets/               brand icon + screenshots
```

## How it maps to your current repo

- **`index.html`** — replaces the current React entry. It no longer loads `/src/main.jsx`;
  it loads `./src/styles.css` and `./src/app.js` (a plain ES module).
- **`src/styles.css`** — replaces the old CSS. Class-based, not inline.
- **`src/translations.js`** — see "Copy changes" below; reconcile keys, keep all 4 languages.
- **Assets** — I included `assets/` so the package runs standalone. In your repo the
  screenshots live in `public/assets/`, served at `/assets/`. Either keep `assets/` next to
  `index.html`, or change the paths in `index.html` + `src/app.js` from `assets/...` to
  `/assets/...` (search & replace) to reuse your existing `public/assets`.
- No `config.js` needed — Play/test URLs, e-mail, version live in `CONFIG` at the top of `app.js`.

## Behaviour

- **Default theme = dark (Nightfall).** Persisted in `localStorage['arise-theme']`.
- **Language** auto-detected, persisted in `localStorage['arise-lang']` (same key as before).
- Home ↔ Privacy handled by JS (show/hide `<main>`), not URL routes. If you need real
  `/privacy` routing, wire `goPrivacy()` / `goHome()` to `history.pushState`.

## Translation structure

`translations.js` exports `translations`, `LANGS`, `detectLang`, `PERMISSION_CODES`.
Each language object uses **string keys** for single texts and **arrays** for repeating
blocks:

- `why[]`, `cards[]`  → `[iconName, title, text]`
- `groups[]`          → `[groupTitle, [[iconName, title, text], …]]`
- `shots[]`           → `[title, description]`  (order matches `GALLERY_SRCS` in app.js)
- `faqs[]`            → `[question, answer]`
- `perms[]`           → purpose text, order matches `PERMISSION_CODES`

## Copy changes vs. the original site (to reconcile in all 4 languages)

1. **All "Premium" wording removed.** No free/premium tiers, chips, badges or the premium
   notice card. Every feature is presented as free — features section shows a single pill
   "Every feature is free".
2. **Rewritten tone** — factual, no self-praise (per request). Hero, section headings and
   feature descriptions were rephrased.
3. **Languages** — now stated as **"32 languages, from English to Japanese"** (overview card)
   and the FAQ answer lists examples (English, Română, Polski, Magyar, Deutsch, Русский,
   Português, Ελληνικά, हिन्दी, 日本語). Was previously "English, Română, Polski and Magyar".
4. **Themes** — copy names the real presets: Classic, Aurora, Sunrise, Ocean, Green, Black.
5. **New content**: "World clock" feature + "Your cities" card (Make it yours); new gallery
   captions — World clock, Theme editor, Settings, Wake screen, Alarm sound; theme-editor copy
   mentions live light/colour/size/glass controls.
6. **Removed** "Default alarm app" (OEMs often block it).
7. New **Themes** section (Sunrise / Aurora / Ocean / Black phone shots).

The full, final strings for all 4 languages are in `src/translations.js` — use it as the
source of truth when merging into your existing keys.
