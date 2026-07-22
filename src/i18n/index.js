// Arise — i18n aggregator.
// Every language lives in its own module and must expose exactly the same
// key set and array shapes as en.js:
//   why[], cards[]  -> [iconName, title, text]
//   groups[]        -> [groupTitle, [[iconName, title, text], ...]]
//   shots[]         -> [title, description]   (order matches GALLERY_SRCS in app.js)
//   faqs[]          -> [question, answer]
//   perms[]         -> purpose text           (order matches PERMISSION_CODES)
// Icon names are structural, not copy — they are identical in every language.
import en from './en.js';
import de from './de.js';
import fr from './fr.js';
import lv from './lv.js';
import lt from './lt.js';
import hu from './hu.js';
import pl from './pl.js';
import ro from './ro.js';
import ru from './ru.js';

export const translations = { en, de, fr, lv, lt, hu, pl, ro, ru };

// Display order in the language menu: English first, then alphabetical by native name.
export const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'lv', flag: '🇱🇻', label: 'Latviešu' },
  { code: 'lt', flag: '🇱🇹', label: 'Lietuvių' },
  { code: 'hu', flag: '🇭🇺', label: 'Magyar' },
  { code: 'pl', flag: '🇵🇱', label: 'Polski' },
  { code: 'ro', flag: '🇷🇴', label: 'Română' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
];

export const STORAGE_KEY = 'arise-lang';

// Deprecated tags that map onto a language we ship ("mo" is legacy Moldovan).
const ALIASES = { mo: 'ro' };

const SUPPORTED = new Set(LANGS.map((l) => l.code));

// "de-AT", "fr_CA", "RU-ru" -> "de" / "fr" / "ru"; null when unsupported.
function normalise(tag) {
  if (!tag) return null;
  const base = String(tag).toLowerCase().replace(/_/g, '-').split('-')[0];
  const code = ALIASES[base] || base;
  return SUPPORTED.has(code) ? code : null;
}

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

export function storeLang(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch (e) {}
}

/**
 * Resolve the language to start in, most explicit signal first:
 *   1. ?lang=de in the URL   — lets a shared link open in a specific language
 *   2. a previously chosen language from localStorage
 *   3. the device languages, in the order the user ranked them in their OS
 *   4. English
 */
export function detectLang() {
  try {
    const fromUrl = normalise(new URLSearchParams(window.location.search).get('lang'));
    if (fromUrl) {
      storeLang(fromUrl);
      return fromUrl;
    }
  } catch (e) {}

  // Normalised like every other source, so a hand-edited or legacy value such as
  // "de-AT" or "mo" still resolves instead of being silently discarded.
  const saved = normalise(readStored());
  if (saved) return saved;

  const tags = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const tag of tags) {
    const code = normalise(tag);
    if (code) return code;
  }

  return 'en';
}

// Permission identifiers are constant; only the purpose text is localised.
export const PERMISSION_CODES = [
  'SCHEDULE_EXACT_ALARM / USE_EXACT_ALARM',
  'RECEIVE_BOOT_COMPLETED',
  'FOREGROUND_SERVICE',
  'WAKE_LOCK',
  'USE_FULL_SCREEN_INTENT',
  'POST_NOTIFICATIONS',
  'VIBRATE',
  'REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
  'READ_MEDIA_AUDIO',
];
