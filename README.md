# Arise Website

Official landing page and Privacy Policy site for **Arise — Alarm Clock for Android**.

## Stack

Static **HTML + CSS + vanilla JS (ES modules)**. No React, no Vite, **no build step** — the
files are served exactly as they are in the repo.

## Local development

There is nothing to install and nothing to compile. Serve the repo root over HTTP (ES module
imports do not work over `file://`) and open the printed URL:

```bash
npx serve .
# or: python -m http.server 8000
```

## Deployment

Vercel serves the repo as-is; there is no build command and no output directory.
`vercel.json` rewrites everything except `/.well-known/` to `index.html`, which is what makes
the client-side routes below resolve.

## Layout

```
index.html          static markup (semantic HTML, no framework)
src/styles.css      all styles, two themes via [data-theme]
src/app.js          i18n, theme, language, routing, gallery, FAQ, scroll indicator
src/i18n/index.js   language list, detection, permission codes, translations map
src/i18n/<code>.js  copy for one language — en.js is the source of truth for structure
assets/             brand icon + screenshots
vercel.json         rewrites
```

Play Store / test-build URLs, the support e-mail and the policy version live in the `CONFIG`
object at the top of `src/app.js`.

## Behaviour

- **Theme** — default dark (Nightfall), persisted in `localStorage['arise-theme']`.
- **Language** — resolved in this order: `?lang=de` in the URL → `localStorage['arise-lang']`
  → the device languages from `navigator.languages`, in the user's own priority order →
  English. Regional tags fold to their base language (`de-AT` → `de`, `fr-CA` → `fr`).
- **Routes** — `/` and `/privacy` (plus the legacy `/privacy-policy`) are real, linkable URLs,
  resolved by `routeFromPath()` on load and by `history.pushState` when navigating. Browser
  back/forward works and any `?lang=` query is preserved. The privacy URL is the one published
  on Google Play, so it must keep resolving directly to the policy.
- **Scroll indicator** — the nav entry for the current section is underlined and a progress bar
  sits on the bottom edge of the header. Nav entries are kept in document order so the
  indicator only moves forward; `#themes` folds into the Gallery entry.
- **Feature list** — below 700px each feature group collapses into an accordion.

## Translations

Nine languages ship: `en, de, fr, lv, lt, hu, pl, ro, ru`.

`src/i18n/index.js` exports `translations`, `LANGS`, `detectLang`, `storeLang` and
`PERMISSION_CODES`. Each language module default-exports one object using **string keys** for
single texts and **arrays** for repeating blocks:

- `why[]`, `cards[]`  → `[iconName, title, text]`
- `groups[]`          → `[groupTitle, [[iconName, title, text], …]]`
- `shots[]`           → `[title, description]` (order matches `GALLERY_SRCS` in `app.js`)
- `faqs[]`            → `[question, answer]`
- `perms[]`           → purpose text (order matches `PERMISSION_CODES`)

Icon names are **structure, not copy** — index 0 of `why[]`, `cards[]` and every `groups[][]`
entry must be byte-identical across languages, and every array must keep the same length as
`en.js`. The browser loads these files directly, so a mismatch is a runtime bug.

To add a language: copy `src/i18n/en.js`, translate the values, then register it in
`src/i18n/index.js` (one `import`, one entry in `translations`, one entry in `LANGS`).

Two counts are easy to confuse: the **site** ships nine languages (`LANGS`), while the
"19 languages" figure in the copy describes the **Android app's** in-app language selector.
When that figure changes, note that numeral agreement differs per language — Romanian drops
"de" below 20, and Polish, Russian and Lithuanian switch case — so it is not a
find-and-replace.

## Verifying a change

There is no test runner. Serve the site and check it in a browser, or drive headless Chrome
over the DevTools protocol for the things that are easy to break silently: the scroll
indicator in every section, absence of horizontal overflow, the nav fitting at its tightest
desktop width in every language, and the `/privacy` route.
