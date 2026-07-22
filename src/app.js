// Arise — vanilla site logic (no framework). Uses translations.js for 4-language copy.
import { translations, LANGS, detectLang, PERMISSION_CODES } from './translations.js';

const CONFIG = {
  play: 'https://play.google.com/store/apps/details?id=com.arise.alarm',
  test: 'https://play.google.com/apps/testing/com.arise.alarm',
  email: 'ariseapplicationsupport@gmail.com',
  version: '1.0',
  updated: '2026',
};

const GALLERY_SRCS = [
  'assets/screenshots/HomeScreen.png', 'assets/screenshots/MultipleAlarms.jpg',
  'assets/screenshots/AlarmSelect.png', 'assets/screenshots/LockScreenAlarm.jpg',
  'assets/screenshots/clock.jpg', 'assets/screenshots/Timer.jpg',
  'assets/screenshots/Stopwatch2.jpg', 'assets/screenshots/OceanTheme.png',
  'assets/screenshots/GreenCustomTheme.png', 'assets/screenshots/RingTonesFilePicker.png',
  'assets/screenshots/WorldClock.jpg', 'assets/screenshots/ThemeEditor.jpg',
  'assets/screenshots/Settings.jpg', 'assets/screenshots/AlarmRinging.jpg',
  'assets/screenshots/AlarmSound.jpg',
];
const THEME_SHOTS = [
  ['assets/screenshots/AlarmsSunrise.jpg', 'Sunrise'],
  ['assets/screenshots/AlarmsAurora.jpg', 'Aurora'],
  ['assets/screenshots/AlarmsOcean.jpg', 'Ocean'],
  ['assets/screenshots/AlarmsBlack.jpg', 'Black'],
];

/* ---------- Icons ---------- */
const ICONS = {
  bell: [['path', { d: 'M10 21h4' }], ['path', { d: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9' }]],
  music: [['path', { d: 'M9 18V5l12-2v13' }], ['circle', { cx: 6, cy: 18, r: 3 }], ['circle', { cx: 18, cy: 16, r: 3 }]],
  fileMusic: [['path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }], ['path', { d: 'M14 2v6h6' }], ['path', { d: 'M10 17a2 2 0 1 1-2-2' }], ['path', { d: 'M10 15v-5l4 1' }]],
  sparkles: [['path', { d: 'M12 3 10 8l-5 2 5 2 2 5 2-5 5-2-5-2-2-5z' }], ['path', { d: 'M19 15l-1 2-2 1 2 1 1 2 1-2 2-1-2-1-1-2z' }]],
  volume: [['path', { d: 'M11 5 6 9H2v6h4l5 4z' }], ['path', { d: 'M15.5 8.5a5 5 0 0 1 0 7' }], ['path', { d: 'M19 5a10 10 0 0 1 0 14' }]],
  sunrise: [['path', { d: 'M12 2v3' }], ['path', { d: 'm5.6 6.6 1.4 1.4' }], ['path', { d: 'm17 8 1.4-1.4' }], ['path', { d: 'M2 13h2' }], ['path', { d: 'M20 13h2' }], ['path', { d: 'M2 18h20' }], ['path', { d: 'M22 22H2' }], ['path', { d: 'M6 18a6 6 0 0 1 12 0' }]],
  hand: [['path', { d: 'M18 11.5V9a2 2 0 0 0-4 0v2' }], ['path', { d: 'M14 10V7a2 2 0 0 0-4 0v5' }], ['path', { d: 'M10 10.5V9a2 2 0 0 0-4 0v5' }], ['path', { d: 'M18 12a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-2a7 7 0 0 1-6.3-4L5 14' }]],
  shield: [['path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }]],
  timer: [['circle', { cx: 12, cy: 13, r: 8 }], ['path', { d: 'M12 9v4' }], ['path', { d: 'M9 2h6' }], ['path', { d: 'M17 5l2-2' }]],
  stopwatch: [['circle', { cx: 12, cy: 13, r: 8 }], ['path', { d: 'M12 9v4l2 2' }], ['path', { d: 'M9 2h6' }]],
  palette: [['circle', { cx: 13.5, cy: 6.5, r: .6 }], ['circle', { cx: 17.5, cy: 10.5, r: .6 }], ['circle', { cx: 8.5, cy: 7.5, r: .6 }], ['circle', { cx: 6.5, cy: 12.5, r: .6 }], ['path', { d: 'M12 2C6.5 2 2 5.8 2 10.5S6 19 11 19h1.5a2.5 2.5 0 0 0 0-5H11a2 2 0 0 1 0-4h1c5 0 10-1.6 10-4.5C22 3.6 17.5 2 12 2z' }]],
  settings: [['circle', { cx: 12, cy: 12, r: 3 }], ['path', { d: 'M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z' }]],
  calendar: [['rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }], ['path', { d: 'M16 2v4' }], ['path', { d: 'M8 2v4' }], ['path', { d: 'M3 10h18' }]],
  moon: [['path', { d: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z' }]],
  phone: [['rect', { x: 7, y: 2, width: 10, height: 20, rx: 2 }], ['path', { d: 'M12 18h.01' }]],
  rotate: [['path', { d: 'M21 12a9 9 0 1 1-3-6.7' }], ['path', { d: 'M21 3v6h-6' }]],
  database: [['ellipse', { cx: 12, cy: 5, rx: 8, ry: 3 }], ['path', { d: 'M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5' }], ['path', { d: 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3' }]],
  wifiOff: [['path', { d: 'M1 1l22 22' }], ['path', { d: 'M16.7 16.7A6 6 0 0 0 7.3 16' }], ['path', { d: 'M12 20h.01' }], ['path', { d: 'M5 12.5a10 10 0 0 1 6-2.5' }], ['path', { d: 'M2 8.8a15 15 0 0 1 4.2-2.1' }], ['path', { d: 'M22 8.8A15 15 0 0 0 10.8 5' }]],
  eyeOff: [['path', { d: 'M3 3l18 18' }], ['path', { d: 'M10.6 10.6A2 2 0 0 0 13.4 13.4' }], ['path', { d: 'M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 9 4 10 8a11.8 11.8 0 0 1-2.5 4.1' }], ['path', { d: 'M6.2 6.2A11.8 11.8 0 0 0 2 12c1 4 5 8 10 8 1.3 0 2.5-.3 3.6-.8' }]],
  lock: [['rect', { x: 4, y: 11, width: 16, height: 10, rx: 2 }], ['path', { d: 'M8 11V7a4 4 0 0 1 8 0v4' }]],
  fileText: [['path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }], ['path', { d: 'M14 2v6h6' }], ['path', { d: 'M8 13h8' }], ['path', { d: 'M8 17h6' }]],
  globe: [['circle', { cx: 12, cy: 12, r: 10 }], ['path', { d: 'M2 12h20' }], ['path', { d: 'M12 2a15 15 0 0 1 0 20' }], ['path', { d: 'M12 2a15 15 0 0 0 0 20' }]],
  download: [['path', { d: 'M12 3v12' }], ['path', { d: 'm7 10 5 5 5-5' }], ['path', { d: 'M5 21h14' }]],
  mail: [['rect', { x: 3, y: 5, width: 18, height: 14, rx: 2 }], ['path', { d: 'm3 7 9 6 9-6' }]],
  menu: [['path', { d: 'M4 6h16' }], ['path', { d: 'M4 12h16' }], ['path', { d: 'M4 18h16' }]],
  x: [['path', { d: 'M18 6 6 18' }], ['path', { d: 'm6 6 12 12' }]],
  chevronLeft: [['path', { d: 'm15 18-6-6 6-6' }]],
  chevronRight: [['path', { d: 'm9 18 6-6-6-6' }]],
  chevronDown: [['path', { d: 'm6 9 6 6 6-6' }]],
  chevronUp: [['path', { d: 'm18 15-6-6-6 6' }]],
  sun: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 2v2' }], ['path', { d: 'M12 20v2' }], ['path', { d: 'm4.9 4.9 1.4 1.4' }], ['path', { d: 'm17.7 17.7 1.4 1.4' }], ['path', { d: 'M2 12h2' }], ['path', { d: 'M20 12h2' }], ['path', { d: 'm6.3 17.7-1.4 1.4' }], ['path', { d: 'm19.1 4.9-1.4 1.4' }]],
};
function icon(name, size = 22) {
  const parts = (ICONS[name] || ICONS.globe).map(([tag, attrs]) => {
    const a = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `<${tag} ${a}></${tag}>`;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;flex-shrink:0">${parts}</svg>`;
}

/* ---------- State ---------- */
const state = {
  lang: detectLang(),
  theme: (() => { try { return localStorage.getItem('arise-theme') || 'dark'; } catch (e) { return 'dark'; } })(),
  page: 'home',
  gallery: 0,
  faqOpen: { 0: true },
};
let t = translations[state.lang] || translations.en;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Renderers ---------- */
function applyStaticText() {
  $$('[data-i18n]').forEach((el) => {
    const v = t[el.dataset.i18n];
    if (typeof v === 'string') el.textContent = v;
  });
  $$('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon, el.classList.contains('shield') ? 34 : 22); });
}

function renderNav() {
  const links = state.page === 'privacy'
    ? [[t.nav_home, 'home'], [t.nav_policy, '#policy'], [t.nav_permissions, '#permissions']]
    : [[t.nav_features, '#features'], [t.nav_gallery, '#gallery'], [t.nav_privacy, '#privacy'], [t.nav_faq, '#faq']];
  const html = links.map(([label, target]) => `<button class="nav-btn" data-target="${target}">${label}</button>`).join('');
  $('#desktop-nav').innerHTML = html;
  $('#mobile-menu').innerHTML = html.replace(/nav-btn/g, 'nav-btn') +
    `<a href="mailto:${CONFIG.email}">${t.nav_contact}</a>`;
}

function renderHeader() {
  $('#lang-btn').innerHTML = `${state.lang.toUpperCase()} ${icon('chevronDown', 16)}`;
  $('#lang-menu').innerHTML = LANGS.map((l) =>
    `<button data-lang="${l.code}" class="${l.code === state.lang ? 'active' : ''}">${l.label}</button>`).join('');
  $$('.seg-btn').forEach((b) => b.classList.toggle('active', b.dataset.themeSet === state.theme));
  $('[data-theme-set="dark"]').innerHTML = icon('moon', 20);
  $('[data-theme-set="light"]').innerHTML = icon('sun', 20);
  $('#menu-btn').innerHTML = icon('menu');
}

function renderQuickPoints() {
  const qp = [['bell', t.qp_alarms], ['palette', t.qp_themes], ['volume', t.qp_volume], ['eyeOff', t.qp_privacy]];
  $('#quick-points').innerHTML = qp.map(([ic, label]) =>
    `<span><span class="i">${icon(ic, 20)}</span>${label || ''}</span>`).join('');
}

function cardHTML(ic, title, text) {
  return `<article class="card"><div class="card-icon">${icon(ic, 26)}</div><h3>${title}</h3><p>${text}</p></article>`;
}

function renderLists() {
  $('#why-grid').innerHTML = (t.why || []).map((w) => cardHTML(w[0], w[1], w[2])).join('');
  $('#privacy-grid').innerHTML = (t.cards || []).map((c) => cardHTML(c[0], c[1], c[2])).join('');
  $('#policy-grid').innerHTML = (t.cards || []).map((c) => cardHTML(c[0], c[1], c[2])).join('');

  $('#themes-row').innerHTML = THEME_SHOTS.map(([src, label]) =>
    `<div class="theme-item"><div class="phone phone--theme"><img src="${src}" alt="${label} theme" /></div><span class="theme-label">${label}</span></div>`).join('');

  $('#feature-groups').innerHTML = (t.groups || []).map((g) =>
    `<section><h3 class="serif group-title">${g[0]}</h3><div class="feature-cards">${g[1].map((it) =>
      `<article class="feature-card"><div class="feature-icon">${icon(it[0], 24)}</div><div><h4>${it[1]}</h4><p>${it[2]}</p></div></article>`).join('')}</div></section>`).join('');

  $('#faq-list').innerHTML = (t.faqs || []).map((f, i) =>
    `<article class="faq-item ${state.faqOpen[i] ? 'open' : ''}" data-faq="${i}">
      <button class="faq-btn"><span>${f[0]}</span><span class="chev">${icon('chevronDown', 20)}</span></button>
      <p class="faq-answer" ${state.faqOpen[i] ? '' : 'hidden'}>${f[1]}</p>
    </article>`).join('');

  $('#perm-list').innerHTML = PERMISSION_CODES.map((code, i) =>
    `<div class="perm-row"><code>${code}</code><p>${(t.perms || [])[i] || ''}</p></div>`).join('');
}

function renderGallery() {
  const shots = t.shots || [];
  const i = Math.min(state.gallery, Math.max(0, shots.length - 1));
  $('#gal-img').src = GALLERY_SRCS[i];
  $('#gal-img').alt = shots[i] ? shots[i][0] : '';
  $('#gal-title').textContent = shots[i] ? shots[i][0] : '';
  $('#gal-desc').textContent = shots[i] ? shots[i][1] : '';
  $('#gal-prev').innerHTML = icon('chevronLeft');
  $('#gal-next').innerHTML = icon('chevronRight');
  $('#gal-dots').innerHTML = shots.map((_, k) =>
    `<button class="dot ${k === i ? 'active' : ''}" data-dot="${k}" aria-label="${shots[k][0]}"></button>`).join('');
}

function renderStaticRefs() {
  $('#cta-play').href = CONFIG.play;
  $('#cta-test').href = CONFIG.test;
  $('#pp-version').textContent = CONFIG.version;
  $('#pp-updated').textContent = CONFIG.updated;
  $('#pp-contact-mail').href = 'mailto:' + CONFIG.email;
  $('#pp-contact-mail').textContent = CONFIG.email;
  $('#footer-mail').href = 'mailto:' + CONFIG.email;
  $('#footer-email-1').href = 'mailto:' + CONFIG.email;
  $('#footer-email-1').textContent = CONFIG.email;
  $('#footer-email-2').href = 'mailto:' + CONFIG.email;
  $('#footer-copyright').textContent = `© ${new Date().getFullYear()} Arise. ${t.footer_rights || ''}`;
}

function renderAll() {
  t = translations[state.lang] || translations.en;
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.lang = state.lang;
  applyStaticText();
  renderHeader();
  renderNav();
  renderQuickPoints();
  renderLists();
  renderGallery();
  renderStaticRefs();
}

/* ---------- Navigation ---------- */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 82;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
function goHome() { state.page = 'home'; $('#page-home').hidden = false; $('#page-privacy').hidden = true; window.scrollTo({ top: 0, behavior: 'smooth' }); renderNav(); }
function goPrivacy() { state.page = 'privacy'; $('#page-home').hidden = true; $('#page-privacy').hidden = false; window.scrollTo({ top: 0, behavior: 'smooth' }); renderNav(); }
function navTarget(target) {
  closeMenus();
  if (target === 'home') return goHome();
  if (target === 'privacy') return goPrivacy();
  if (target && target[0] === '#') {
    const id = target.slice(1);
    if (state.page !== 'home') { goHome(); setTimeout(() => scrollToId(id), 60); } else scrollToId(id);
  }
}
function closeMenus() { $('#lang-menu').hidden = true; $('#lang-btn').setAttribute('aria-expanded', 'false'); $('#mobile-menu').hidden = true; $('#menu-btn').setAttribute('aria-expanded', 'false'); }

/* ---------- Events (delegated) ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-nav],[data-target],[data-scroll],[data-theme-set],[data-lang],[data-dot],[data-faq] .faq-btn');
  if (!el) {
    if (!e.target.closest('.lang')) { $('#lang-menu').hidden = true; $('#lang-btn').setAttribute('aria-expanded', 'false'); }
    return;
  }
  if (el.dataset.nav) navTarget(el.dataset.nav);
  else if (el.dataset.target) navTarget(el.dataset.target);
  else if (el.dataset.scroll) navTarget('#' + el.dataset.scroll);
  else if (el.dataset.themeSet) { state.theme = el.dataset.themeSet; try { localStorage.setItem('arise-theme', state.theme); } catch (x) {} renderAll(); }
  else if (el.dataset.lang) { state.lang = el.dataset.lang; try { localStorage.setItem('arise-lang', state.lang); } catch (x) {} closeMenus(); renderAll(); }
  else if (el.dataset.dot) { state.gallery = +el.dataset.dot; renderGallery(); }
  else if (el.classList.contains('faq-btn')) { const i = +el.closest('[data-faq]').dataset.faq; state.faqOpen[i] = !state.faqOpen[i]; renderLists(); }
});

$('#lang-btn').addEventListener('click', (e) => { e.stopPropagation(); const m = $('#lang-menu'); m.hidden = !m.hidden; $('#lang-btn').setAttribute('aria-expanded', String(!m.hidden)); });
$('#menu-btn').addEventListener('click', (e) => { e.stopPropagation(); const m = $('#mobile-menu'); m.hidden = !m.hidden; $('#menu-btn').setAttribute('aria-expanded', String(!m.hidden)); });
$('#gal-prev').addEventListener('click', () => { const n = (t.shots || []).length; state.gallery = (state.gallery - 1 + n) % n; renderGallery(); });
$('#gal-next').addEventListener('click', () => { const n = (t.shots || []).length; state.gallery = (state.gallery + 1) % n; renderGallery(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenus(); });
$('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => { $('#back-to-top').classList.toggle('visible', window.scrollY > 480); }, { passive: true });

renderAll();
