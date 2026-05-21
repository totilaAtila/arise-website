import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { appConfig } from './config.js';
import { detectLang, getT } from './translations.js';

const icon = '/assets/brand/icon_512.png';

const LangContext = createContext(() => '');

function getScreenshots(t) {
  return [
    { src: '/assets/screenshots/HomeScreen.png', title: t('ss_home_t'), description: t('ss_home_d') },
    { src: '/assets/screenshots/MultipleAlarms.jpg', title: t('ss_multi_t'), description: t('ss_multi_d') },
    { src: '/assets/screenshots/AlarmSelect.png', title: t('ss_edit_t'), description: t('ss_edit_d') },
    { src: '/assets/screenshots/LockScreenAlarm.jpg', title: t('ss_lock_t'), description: t('ss_lock_d') },
    { src: '/assets/screenshots/clock.jpg', title: t('ss_clock_t'), description: t('ss_clock_d') },
    { src: '/assets/screenshots/Timer.jpg', title: t('ss_timer_t'), description: t('ss_timer_d') },
    { src: '/assets/screenshots/Stopwatch.jpg', title: t('ss_stop_t'), description: t('ss_stop_d') },
    { src: '/assets/screenshots/OceanTheme.png', title: t('ss_ocean_t'), description: t('ss_ocean_d') },
    { src: '/assets/screenshots/GreenCustomTheme.png', title: t('ss_custom_t'), description: t('ss_custom_d') },
    { src: '/assets/screenshots/RingTonesFilePicker.png', title: t('ss_audio_t'), description: t('ss_audio_d') },
    { src: '/assets/screenshots/Permissions.png', title: t('ss_perm_t'), description: t('ss_perm_d') },
  ];
}

function getFeatures(t) {
  return [
    {
      group: t('fg_smart'),
      items: [
        [t('fi_multi_t'), t('fi_multi_d'), 'bell', 'free'],
        [t('fi_tones_t'), t('fi_tones_d'), 'music', 'free'],
        [t('fi_picker_t'), t('fi_picker_d'), 'fileMusic', 'premium'],
        [t('fi_difftone_t'), t('fi_difftone_d'), 'sparkles', 'premium'],
      ],
    },
    {
      group: t('fg_gentle'),
      items: [
        [t('fi_vol_t'), t('fi_vol_d'), 'volume', 'free'],
        [t('fi_themefade_t'), t('fi_themefade_d'), 'sunrise', 'free'],
        [t('fi_snooze_t'), t('fi_snooze_d'), 'hand', 'free'],
        [t('fi_swipestop_t'), t('fi_swipestop_d'), 'shield', 'free'],
        [t('fi_circular_t'), t('fi_circular_d'), 'hand', 'free'],
      ],
    },
    {
      group: t('fg_timer'),
      items: [
        [t('fi_timer_t'), t('fi_timer_d'), 'timer', 'free'],
        [t('fi_sw_t'), t('fi_sw_d'), 'stopwatch', 'free'],
        [t('fi_swipenav_t'), t('fi_swipenav_d'), 'hand', 'free'],
      ],
    },
    {
      group: t('fg_custom'),
      items: [
        [t('fi_preset_t'), t('fi_preset_d'), 'palette', 'free'],
        [t('fi_edittheme_t'), t('fi_edittheme_d'), 'sparkles', 'premium'],
        [t('fi_3zone_t'), t('fi_3zone_d'), 'palette', 'premium'],
        [t('fi_finetune_t'), t('fi_finetune_d'), 'settings', 'premium'],
        [t('fi_timefmt_t'), t('fi_timefmt_d'), 'calendar', 'free'],
      ],
    },
    {
      group: t('fg_lang'),
      items: [
        [t('fi_langsel_t'), t('fi_langsel_d'), 'globe', 'free'],
        [t('fi_expandloc_t'), t('fi_expandloc_d'), 'fileText', 'free'],
        [t('fi_swipenav2_t'), t('fi_swipenav2_d'), 'chevronRight', 'free'],
      ],
    },
    {
      group: t('fg_rely'),
      items: [
        [t('fi_dnd_t'), t('fi_dnd_d'), 'moon', 'free'],
        [t('fi_lockscr_t'), t('fi_lockscr_d'), 'phone', 'free'],
        [t('fi_settshort_t'), t('fi_settshort_d'), 'settings', 'free'],
        [t('fi_safedel_t'), t('fi_safedel_d'), 'shield', 'free'],
        [t('fi_boot_t'), t('fi_boot_d'), 'rotate', 'free'],
      ],
    },
  ];
}

function getPrivacyCards(t) {
  return [
    [t('pc_stor_t'), t('pc_stor_d'), 'database'],
    [t('pc_net_t'), t('pc_net_d'), 'wifiOff'],
    [t('pc_track_t'), t('pc_track_d'), 'eyeOff'],
    [t('pc_perm_t'), t('pc_perm_d'), 'lock'],
    [t('pc_src_t'), t('pc_src_d'), 'shield'],
    [t('pc_acct_t'), t('pc_acct_d'), 'fileText'],
  ];
}

function getFaqs(t) {
  return [
    [t('faq_q1'), t('faq_a1')],
    [
      t('faq_q2'),
      <>
        {t('faq_a2p1')}
        <a href={appConfig.googlePlayUrl} target="_blank" rel="noopener noreferrer">{t('faq_a2play')}</a>
        {t('faq_a2p2')}
        <a href={appConfig.googlePlayInternalUrl} target="_blank" rel="noopener noreferrer">{t('faq_a2internal')}</a>
        {t('faq_a2p3')}
      </>,
    ],
    [t('faq_q3'), t('faq_a3')],
    [t('faq_q4'), t('faq_a4')],
    [t('faq_q5'), t('faq_a5')],
    [t('faq_q6'), t('faq_a6')],
    [t('faq_q7'), t('faq_a7')],
    [t('faq_q8'), t('faq_a8')],
    [t('faq_q9'), t('faq_a9')],
    [t('faq_q10'), t('faq_a10')],
    [t('faq_q11'), t('faq_a11')],
    [t('faq_q12'), t('faq_a12')],
    [t('faq_q13'), t('faq_a13')],
  ];
}

const permissions = [
  ['SCHEDULE_EXACT_ALARM / USE_EXACT_ALARM', 'Fire alarms at the exact scheduled time.'],
  ['RECEIVE_BOOT_COMPLETED', 'Reschedule alarms after device reboot.'],
  ['FOREGROUND_SERVICE', 'Keep the alarm ringing while the screen is off.'],
  ['WAKE_LOCK', 'Wake the CPU when an alarm fires.'],
  ['USE_FULL_SCREEN_INTENT', 'Show the ringing screen over the lock screen.'],
  ['POST_NOTIFICATIONS', 'Show the alarm notification.'],
  ['VIBRATE', 'Vibrate on alarm.'],
  ['REQUEST_IGNORE_BATTERY_OPTIMIZATIONS', 'Prevent Android from delaying alarms.'],
  ['READ_MEDIA_AUDIO', 'Let you pick a custom audio file as an alarm tone.'],
];

function App() {
  const [route, setRoute] = useState(getRoute());
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState(detectLang);
  const t = useMemo(() => getT(lang), [lang]);

  const changeLang = (code) => {
    setLang(code);
    localStorage.setItem('arise-lang', code);
  };

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const isPrivacy = route === '/privacy' || route === '/privacy-policy';

  const navigate = (target) => {
    setMenuOpen(false);
    if (target.startsWith('/')) {
      window.history.pushState({}, '', target);
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const node = document.querySelector(target);
    node?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LangContext.Provider value={t}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} isPrivacy={isPrivacy} lang={lang} setLang={changeLang} />
      <main>{isPrivacy ? <PrivacyPage /> : <HomePage navigate={navigate} />}</main>
    </LangContext.Provider>
  );
}

function getRoute() {
  return window.location.pathname.replace(/\/$/, '') || '/';
}

function LangSelector({ lang, setLang }) {
  const t = useContext(LangContext);
  const [open, setOpen] = useState(false);
  const langs = [
    { code: 'en', flag: '🇬🇧' },
    { code: 'ro', flag: '🇷🇴' },
    { code: 'pl', flag: '🇵🇱' },
    { code: 'hu', flag: '🇭🇺' },
  ];

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!e.target.closest('.lang-selector')) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  return (
    <div className="lang-selector">
      <button className="lang-button" onClick={() => setOpen((o) => !o)} aria-label={t('lang_select')}>
        {lang.toUpperCase()}
      </button>
      {open && (
        <div className="lang-dropdown">
          {langs.map(({ code, flag }) => (
            <button
              key={code}
              className={lang === code ? 'active' : ''}
              onClick={() => { setLang(code); setOpen(false); }}
            >
              {flag} {t(`lang_${code}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, navigate, isPrivacy, lang, setLang }) {
  const t = useContext(LangContext);
  const links = isPrivacy
    ? [
        [t('nav_home'), '/'],
        [t('nav_policy'), '#policy'],
        [t('nav_permissions'), '#permissions'],
        [t('nav_faq'), '#faq'],
      ]
    : [
        [t('nav_features'), '#features'],
        [t('nav_gallery'), '#gallery'],
        [t('nav_privacy'), '#privacy'],
        [t('nav_faq'), '#faq'],
      ];

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
        <img src={icon} alt="Arise app icon" />
        <span>Arise</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <button key={href} onClick={() => navigate(href)}>{label}</button>
        ))}
      </nav>
      <div className="header-actions">
        <LangSelector lang={lang} setLang={setLang} />
        <a className="icon-button" href="/privacy" aria-label="Privacy Policy" onClick={(event) => { event.preventDefault(); navigate('/privacy'); }}>
          {Icon('globe')}
        </a>
        <button className="menu-button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {Icon(menuOpen ? 'x' : 'menu')}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {links.map(([label, href]) => (
            <button key={href} onClick={() => navigate(href)}>{label}</button>
          ))}
          <a href={`mailto:${appConfig.supportEmail}`}>{t('nav_contact')}</a>
        </div>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  const t = useContext(LangContext);
  const privacyCards = useMemo(() => getPrivacyCards(t), [t]);

  return (
    <>
      <section className="hero section-pad" id="top">
        <div className="hero-content">
          <div className="pill">{Icon('star')} {t('hero_pill')}</div>
          <h1><span>Arise</span><br />{t('hero_tagline')}</h1>
          <p className="hero-copy">{t('hero_copy')}</p>
          <div className="cta-row">
            <a className="button primary" href={appConfig.googlePlayUrl} target="_blank" rel="noopener noreferrer">{Icon('download')} {t('hero_cta_primary')}</a>
            <a className="button secondary" href={appConfig.googlePlayInternalUrl} target="_blank" rel="noopener noreferrer">{Icon('download')} {t('hero_cta_secondary')}</a>
          </div>
          <p className="small-note">{t('hero_note')}</p>
          <div className="quick-points">
            <span>{Icon('bell')} {t('hero_point_alarms')}</span>
            <span>{Icon('palette')} {t('hero_point_themes')}</span>
            <span>{Icon('volume')} {t('hero_point_volume')}</span>
            <span>{Icon('eyeOff')} {t('hero_point_privacy')}</span>
          </div>
        </div>
        <HeroDevice />
      </section>

      <section className="section-pad compact" id="features">
        <SectionHeading eyebrow={t('features_eyebrow')} title={t('features_title')} text={t('features_text')} />
        <div className="feature-summary-grid">
          <SummaryCard iconName="alarm" title={t('features_card1_title')} text={t('features_card1_text')} />
          <SummaryCard iconName="sunrise" title={t('features_card2_title')} text={t('features_card2_text')} />
          <SummaryCard iconName="palette" title={t('features_card3_title')} text={t('features_card3_text')} />
          <SummaryCard iconName="globe" title={t('features_card4_title')} text={t('features_card4_text')} />
        </div>
      </section>

      <section className="section-pad gallery-section" id="gallery">
        <SectionHeading eyebrow={t('gallery_eyebrow')} title={t('gallery_title')} text={t('gallery_text')} />
        <Gallery />
      </section>

      <section className="section-pad privacy-teaser" id="privacy">
        <SectionHeading eyebrow={t('privacy_eyebrow')} title={t('privacy_title')} text={t('privacy_text')} />
        <div className="privacy-grid">
          {privacyCards.slice(0, 6).map(([title, text, iconName], i) => <SummaryCard key={i} iconName={iconName} title={title} text={text} />)}
        </div>
        <div className="center-row">
          <button className="button primary" onClick={() => navigate('/privacy')}>{t('privacy_btn')}</button>
        </div>
      </section>

      <section className="section-pad full-features">
        <SectionHeading eyebrow={t('full_eyebrow')} title={t('full_title')} text={t('full_text')} />
        <div className="tabs-note">
          <span className="chip free">{t('full_chip_free')}</span>
          <span className="chip premium">{t('full_chip_premium')}</span>
        </div>
        <FeatureGroups />
        <div className="notice-card">
          <strong>{t('full_note_label')}</strong>{' '}
          {t('full_notice_pre')}
          <a href={appConfig.googlePlayUrl} target="_blank" rel="noopener noreferrer">{t('full_notice_link')}</a>
          {t('full_notice_post')}
        </div>
      </section>

      <FaqSection />
      <Footer navigate={navigate} />
    </>
  );
}

function PrivacyPage() {
  const t = useContext(LangContext);
  const privacyCards = useMemo(() => getPrivacyCards(t), [t]);

  return (
    <>
      <section className="section-pad privacy-page-hero" id="policy">
        <div className="privacy-icon">{Icon('shield')}</div>
        <h1>{t('pp_title')}</h1>
        <p>{t('pp_intro')}</p>
        <div className="policy-meta">
          <span><strong>{t('pp_version')}</strong> {appConfig.version}</span>
          <span><strong>{t('pp_updated')}</strong> {appConfig.lastUpdated}</span>
        </div>
      </section>

      <section className="section-pad policy-content">
        <div className="policy-card wide">
          <h2>{t('pp_summary_title')}</h2>
          <p>{t('pp_summary_p1')}</p>
          <p>{t('pp_summary_p2')}</p>
        </div>

        <div className="privacy-grid policy-grid">
          {privacyCards.map(([title, text, iconName], i) => <SummaryCard key={i} iconName={iconName} title={title} text={text} />)}
        </div>

        <div className="policy-card wide" id="permissions">
          <h2>{t('pp_perm_title')}</h2>
          <p>{t('pp_perm_intro')}</p>
          <div className="permission-list">
            {permissions.map(([permission, purpose]) => (
              <div className="permission-card" key={permission}>
                <code>{permission}</code>
                <p>{purpose}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="policy-card wide">
          <h2>{t('pp_backup_title')}</h2>
          <p>{t('pp_backup_text')}</p>
        </div>

        <div className="policy-card wide">
          <h2>{t('pp_contact_title')}</h2>
          <p>{t('pp_contact_text')} <a href={`mailto:${appConfig.supportEmail}`}>{appConfig.supportEmail}</a>.</p>
        </div>
      </section>

      <FaqSection />
      <Footer />
    </>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function SummaryCard({ iconName, title, text }) {
  return (
    <article className="summary-card">
      <div className="card-icon">{Icon(iconName)}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function FeatureGroups() {
  const t = useContext(LangContext);
  const features = useMemo(() => getFeatures(t), [t]);

  return (
    <div className="feature-groups">
      {features.map((group, gi) => (
        <section className="feature-group" key={gi}>
          <h3>{group.group}</h3>
          <div className="feature-cards">
            {group.items.map(([title, text, iconName, tier], ii) => (
              <article className={`feature-card ${tier === 'premium' ? 'is-premium' : ''}`} key={ii}>
                <div className="card-icon">{Icon(iconName)}</div>
                <div>
                  <h4>{title} {tier === 'premium' && <span>{t('feature_premium')}</span>}</h4>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Gallery() {
  const t = useContext(LangContext);
  const screenshots = useMemo(() => getScreenshots(t), [t]);
  const [index, setIndex] = useState(0);
  const current = screenshots[index];
  const next = () => setIndex((v) => (v + 1) % screenshots.length);
  const prev = () => setIndex((v) => (v - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="gallery-wrap">
      <button className="gallery-button left" aria-label={t('gallery_prev')} onClick={prev}>{Icon('chevronLeft')}</button>
      <div className="phone-frame gallery-phone">
        <img src={current.src} alt={`${current.title} screenshot`} />
      </div>
      <button className="gallery-button right" aria-label={t('gallery_next')} onClick={next}>{Icon('chevronRight')}</button>
      <div className="gallery-caption">
        <h3>{current.title}</h3>
        <p>{current.description}</p>
      </div>
      <div className="gallery-dots" aria-label="Screenshot selector">
        {screenshots.map((item, i) => (
          <button
            key={i}
            aria-label={`Show ${item.title}`}
            className={i === index ? 'active' : ''}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

function HeroDevice() {
  return (
    <div className="hero-device" aria-hidden="true">
      <div className="phone-frame hero-phone">
        <img src="/assets/screenshots/HomeScreen.png" alt="" />
      </div>
    </div>
  );
}

function FaqSection() {
  const t = useContext(LangContext);
  const faqs = useMemo(() => getFaqs(t), [t]);

  return (
    <section className="section-pad faq-section" id="faq">
      <SectionHeading eyebrow={t('faq_eyebrow')} title={t('faq_title')} text={t('faq_text')} />
      <div className="faq-list">
        {faqs.map(([question, answer], i) => <FaqItem key={i} question={question} answer={answer} defaultOpen={i === 0} />)}
      </div>
    </section>
  );
}

function FaqItem({ question, answer, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className="faq-item">
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{question}</span>
        {Icon(open ? 'chevronUp' : 'chevronDown')}
      </button>
      {open && <p>{answer}</p>}
    </article>
  );
}

function Footer({ navigate }) {
  const t = useContext(LangContext);
  const goPrivacy = (event) => {
    if (!navigate) return;
    event.preventDefault();
    navigate('/privacy');
  };
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <div className="footer-brand"><img src={icon} alt="" /><strong>Arise</strong></div>
          <p>{t('footer_tagline')}</p>
          <div className="footer-icons">
            <a href={`mailto:${appConfig.supportEmail}`} aria-label={t('footer_email_support')}>{Icon('mail')}</a>
          </div>
        </div>
        <div>
          <h3>{t('footer_links')}</h3>
          <a href="/#gallery">{t('nav_gallery')}</a>
          <a href="/privacy" onClick={goPrivacy}>{t('nav_privacy')}</a>
          <a href="/#faq">{t('nav_faq')}</a>
        </div>
        <div>
          <h3>{t('footer_contact')}</h3>
          <a href={`mailto:${appConfig.supportEmail}`}>{appConfig.supportEmail}</a>
          <a href={`mailto:${appConfig.supportEmail}`}>{t('footer_email_support')}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footer_copyright')}</p>
        <div>
          <a href="/privacy" onClick={goPrivacy}>{t('pp_title')}</a>
        </div>
      </div>
    </footer>
  );
}

function Icon(name) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const icons = {
    alarm: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M5 3 2 6"/><path d="m19 3 3 3"/></>,
    bell: <><path d="M10 21h4"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    chevronLeft: <path d="m15 18-6-6 6-6"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    chevronUp: <path d="m18 15-6-6-6 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    eyeOff: <><path d="M3 3l18 18"/><path d="M10.6 10.6A2 2 0 0 0 13.4 13.4"/><path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 9 4 10 8a11.8 11.8 0 0 1-2.5 4.1"/><path d="M6.2 6.2A11.8 11.8 0 0 0 2 12c1 4 5 8 10 8 1.3 0 2.5-.3 3.6-.8"/></>,
    fileMusic: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 17a2 2 0 1 1-2-2"/><path d="M10 15v-5l4 1"/></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/></>,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.5-.4 7-1.7 7-7.5A5.8 5.8 0 0 0 19.5 3 5.4 5.4 0 0 0 19.4 0S18.1-.4 15 1.5a15 15 0 0 0-8 0C3.9-.4 2.6 0 2.6 0a5.4 5.4 0 0 0-.1 3A5.8 5.8 0 0 0 1 7c0 5.8 3.5 7.1 7 7.5a4.8 4.8 0 0 0-1 3.5v4"/><path d="M9 18c-4.5 2-5-2-7-2"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></>,
    hand: <><path d="M18 11.5V9a2 2 0 0 0-4 0v2"/><path d="M14 10V7a2 2 0 0 0-4 0v5"/><path d="M10 10.5V9a2 2 0 0 0-4 0v5"/><path d="M18 12a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-2a7 7 0 0 1-6.3-4L5 14"/></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>,
    music: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    palette: <><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 5.8 2 10.5S6 19 11 19h1.5a2.5 2.5 0 0 0 0-5H11a2 2 0 0 1 0-4h1c5 0 10-1.6 10-4.5C22 3.6 17.5 2 12 2z"/></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/></>,
    rotate: <><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></>,
    settings: <><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    sparkles: <><path d="M12 3 10 8l-5 2 5 2 2 5 2-5 5-2-5-2-2-5z"/><path d="M19 15l-1 2-2 1 2 1 1 2 1-2 2-1-2-1-1-2z"/></>,
    star: <path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.9 3.1 1.1-6.5L2.5 8.9 9 8z"/>,
    stopwatch: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/></>,
    sunrise: <><path d="M12 2v8"/><path d="m4.9 4.9 5.7 5.7"/><path d="M2 18h20"/><path d="M3 22h18"/><path d="M18.4 10.6 12 17l-4-4"/></>,
    timer: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4"/><path d="M9 2h6"/><path d="M17 5l2-2"/></>,
    volume: <><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></>,
    wifiOff: <><path d="M1 1l22 22"/><path d="M16.7 16.7A6 6 0 0 0 7.3 16"/><path d="M12 20h.01"/><path d="M5 12.5a10 10 0 0 1 6-2.5"/><path d="M2 8.8a15 15 0 0 1 4.2-2.1"/><path d="M22 8.8A15 15 0 0 0 10.8 5"/></>,
    x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
  };
  return <svg {...common}>{icons[name] || icons.star}</svg>;
}

createRoot(document.getElementById('root')).render(<App />);
