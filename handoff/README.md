# Arise — website redesign (developer handoff)

Static **HTML + CSS + vanilla JS**. No React, no Vite, no build step. Drop the files
into your repo and serve as-is. The 4-language translation system is kept.

## Files

```
index.html            static markup (semantic HTML, no framework)
src/styles.css        all styles, two themes via [data-theme]
src/app.js            vanilla JS: i18n, theme, language, routing, gallery, FAQ, scroll indicator
src/i18n/index.js     language list, detection, permission codes, translations map
src/i18n/<code>.js    copy for one language — en is the source of truth for structure
assets/               brand icon + screenshots
```

Nine languages ship: `en, de, fr, lv, lt, hu, pl, ro, ru`. Adding a tenth means copying
`src/i18n/en.js`, translating the values, then registering it in `src/i18n/index.js`
(one `import` plus one entry in `translations` and in `LANGS`).

## How it maps to your current repo

- **`index.html`** — replaces the current React entry. It no longer loads `/src/main.jsx`;
  it loads `./src/styles.css` and `./src/app.js` (a plain ES module).
- **`src/styles.css`** — replaces the old CSS. Class-based, not inline.
- **`src/i18n/`** — see "Copy changes" below; reconcile keys, keep every language in sync.
- **Assets** — I included `assets/` so the package runs standalone. In your repo the
  screenshots live in `public/assets/`, served at `/assets/`. Either keep `assets/` next to
  `index.html`, or change the paths in `index.html` + `src/app.js` from `assets/...` to
  `/assets/...` (search & replace) to reuse your existing `public/assets`.
- No `config.js` needed — Play/test URLs, e-mail, version live in `CONFIG` at the top of `app.js`.

## Behaviour

- **Default theme = dark (Nightfall).** Persisted in `localStorage['arise-theme']`.
- **Language** resolved in this order: `?lang=de` in the URL → `localStorage['arise-lang']` →
  the device languages from `navigator.languages`, in the user's own priority order → English.
  Regional tags fold to their base language (`de-AT` → `de`, `fr-CA` → `fr`).
- **Scroll indicator** — the nav entry for the section you are in is underlined, and a progress
  bar sits on the bottom edge of the header. Nav entries are in document order; sections without
  their own entry fold into the neighbouring one (`#themes` → Gallery).
- **Feature list** — below 700px each feature group collapses into an accordion.
- Home ↔ Privacy handled by JS (show/hide `<main>`), not URL routes. If you need real
  `/privacy` routing, wire `goPrivacy()` / `goHome()` to `history.pushState`.

## Translation structure

`src/i18n/index.js` exports `translations`, `LANGS`, `detectLang`, `storeLang`,
`PERMISSION_CODES`. Each language module default-exports one object that uses **string keys**
for single texts and **arrays** for repeating blocks:

- `why[]`, `cards[]`  → `[iconName, title, text]`
- `groups[]`          → `[groupTitle, [[iconName, title, text], …]]`
- `shots[]`           → `[title, description]`  (order matches `GALLERY_SRCS` in app.js)
- `faqs[]`            → `[question, answer]`
- `perms[]`           → purpose text, order matches `PERMISSION_CODES`

Icon names are **structure, not copy** — index 0 of `why[]`, `cards[]` and every `groups[][]`
entry must be byte-identical in every language, and every array must keep the same length as
`en.js`. The site loads these files directly, so a mismatch is a runtime bug.

## Copy changes vs. the original site (reconciled across every language)

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
