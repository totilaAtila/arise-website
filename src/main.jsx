import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { appConfig } from './config.js';

const icon = '/assets/brand/icon_512.png';

const screenshots = [
  {
    src: '/assets/screenshots/HomeScreen.png',
    title: 'Home screen',
    description: 'Create and manage alarms with a clean animated interface.',
  },
  {
    src: '/assets/screenshots/MultipleAlarms.jpg',
    title: 'Multiple alarms',
    description: 'Keep several alarms ready for different routines.',
  },
  {
    src: '/assets/screenshots/AlarmSelect.png',
    title: 'Edit alarm',
    description: 'Set the alarm time, label, repeat days, wake-up options, vibration, and snooze duration.',
  },
  {
    src: '/assets/screenshots/LockScreenAlarm.jpg',
    title: 'Lock-screen alarm',
    description: 'Snooze with one tap or swipe up to stop.',
  },
  {
    src: '/assets/screenshots/clock.jpg',
    title: 'Clock',
    description: 'View the current time in a calm full-screen layout.',
  },
  {
    src: '/assets/screenshots/Timer.jpg',
    title: 'Timer',
    description: 'Set countdowns for daily tasks and routines.',
  },
  {
    src: '/assets/screenshots/Stopwatch.jpg',
    title: 'Stopwatch',
    description: 'Measure time precisely with a dedicated stopwatch.',
  },
  {
    src: '/assets/screenshots/OceanTheme.png',
    title: 'Ocean theme',
    description: 'Choose from polished built-in visual presets.',
  },
  {
    src: '/assets/screenshots/GreenCustomTheme.png',
    title: 'Custom themes',
    description: 'Create a personal look using custom colors.',
  },
  {
    src: '/assets/screenshots/RingTonesFilePicker.png',
    title: 'Audio picker',
    description: 'Pick alarm tones from available sounds or local audio files.',
  },
  {
    src: '/assets/screenshots/Permissions.png',
    title: 'Permission shortcuts',
    description: 'Open Android settings quickly for alarm-related permissions.',
  },
];

const features = [
  {
    group: 'Smart alarms',
    items: [
      ['Multiple alarms', 'Set alarms for any day of the week.', 'bell', 'free'],
      ['5 default tones', 'Meadow Dance, Up Beat, Quiet Mind, 7 AM, and Morning Meadow.', 'music', 'free'],
      ['Audio file picker', 'Choose an alarm tone from your device.', 'fileMusic', 'premium'],
      ['Different tone per alarm', 'Customize the sound for each alarm separately.', 'sparkles', 'premium'],
    ],
  },
  {
    group: 'Gentle wake-up',
    items: [
      ['Volume fade-in', 'Volume gradually increases from 5% to 100%.', 'volume', 'free'],
      ['Theme-based fade-in', 'The active app theme fades in from darker tones to brighter colors during the wake-up sequence.', 'sunrise', 'free'],
      ['Smart snooze', 'Large snooze button with automatically decreasing duration.', 'hand', 'free'],
      ['Swipe up to stop', 'Protection against accidentally dismissing the alarm.', 'shield', 'free'],
    ],
  },
  {
    group: 'Timer & stopwatch',
    items: [
      ['Configurable timer', 'Set any duration with an optional sound at the end.', 'timer', 'free'],
      ['Precise stopwatch', 'Stopwatch with milliseconds for exact measurements.', 'stopwatch', 'free'],
    ],
  },
  {
    group: 'Customization',
    items: [
      ['4 preset themes', 'Classic, Aurora, Sunrise, and Ocean.', 'palette', 'free'],
      ['Custom themes', 'Create your own theme with the color palette.', 'sparkles', 'premium'],
      ['Flexible time format', 'Choose between 12-hour or 24-hour time format.', 'calendar', 'free'],
    ],
  },
  {
    group: 'Reliability',
    items: [
      ['Do Not Disturb support', 'Alarm sound can work through Do Not Disturb when the required Android permission is granted.', 'moon', 'free'],
      ['Lock-screen support', 'The alarm screen is designed to appear and work on the lock screen.', 'phone', 'free'],
      ['Settings shortcuts', 'Quick access to Android settings for alarm-related permissions.', 'settings', 'free'],
      ['Boot persistence', 'Enabled alarms are rescheduled after the device restarts.', 'rotate', 'free'],
    ],
  },
];

const privacyCards = [
  ['Local storage', 'Alarms, settings, selected sounds, and custom themes stay on your device.', 'database'],
  ['No internet', 'Arise works completely offline and has no external servers.', 'wifiOff'],
  ['No tracking', 'No analytics, no ads, no tracking tools, and no third-party data sharing.', 'eyeOff'],
  ['Minimal permissions', 'Only permissions required for reliable alarm functionality are requested.', 'lock'],
  ['Private source code', 'The Arise source code is private and is not available for public download.', 'shield'],
  ['No account required', 'No sign-up, no login, and no personal profile.', 'fileText'],
];

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

const faqs = [
  ['What devices does Arise work on?', 'Arise is designed for Android 8.0 / API 26 or newer. Some alarm permissions and lock-screen behavior can depend on Android version and device manufacturer settings.'],
  ['Where can I download Arise?', 'Arise is not currently available for public download. The Google Play release is being prepared.'],
  ['Is Arise free?', 'Core alarm features are planned to remain free after the Google Play launch. Some advanced features may later become available as a one-time purchase.'],
  ['Does it need an internet connection?', 'No. Arise works completely offline. It does not use external servers, analytics, advertising SDKs, or cloud sync.'],
  ['How does the gentle wake-up effect work?', 'The alarm volume gradually increases from a low level to full volume, while the active app theme fades in visually from darker tones to brighter colors in sync with the wake-up sequence.'],
  ['How do I stop the alarm?', 'The alarm is dismissed by swiping up. This helps reduce accidental dismissals while still keeping snooze easy to access.'],
  ['Does the alarm sound when the phone is on Do Not Disturb?', 'Arise supports Do Not Disturb override when the required Android permission is granted. The exact behavior may depend on Android settings and device manufacturer restrictions.'],
  ['Can I create custom themes?', 'Yes. Arise includes preset themes and a custom theme creator. Some advanced customization features may later become available as premium features.'],
  ['What time formats are available?', 'Arise supports both 12-hour and 24-hour time formats.'],
  ['Why does Arise request exact alarm permissions?', 'Exact alarm permissions are required so scheduled alarms can fire at the intended time instead of being delayed by Android power management.'],
  ['Why does Arise ask to ignore battery optimization?', 'Some Android devices aggressively delay background alarm work. This permission helps keep alarms reliable.'],
  ['Is the source code available?', 'No. The Arise source code is private.'],
];

function App() {
  const [route, setRoute] = useState(getRoute());
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} isPrivacy={isPrivacy} />
      <main>{isPrivacy ? <PrivacyPage /> : <HomePage navigate={navigate} />}</main>
    </>
  );
}

function getRoute() {
  return window.location.pathname.replace(/\/$/, '') || '/';
}

function Header({ menuOpen, setMenuOpen, navigate, isPrivacy }) {
  const links = isPrivacy
    ? [
        ['Home', '/'],
        ['Policy', '#policy'],
        ['Permissions', '#permissions'],
        ['FAQ', '#faq'],
      ]
    : [
        ['Features', '#features'],
        ['Gallery', '#gallery'],
        ['Privacy', '#privacy'],
        ['FAQ', '#faq'],
      ];

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
        <img src={icon} alt="Arise app icon" />
        <span>Arise</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <button key={label} onClick={() => navigate(href)}>{label}</button>
        ))}
      </nav>
      <div className="header-actions">
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
            <button key={label} onClick={() => navigate(href)}>{label}</button>
          ))}
          <a href={`mailto:${appConfig.supportEmail}`}>Contact</a>
        </div>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero section-pad" id="top">
        <div className="hero-content">
          <div className="pill">{Icon('star')} Google Play release is being prepared</div>
          <h1><span>Arise</span><br />Modern alarm clock for Android</h1>
          <p className="hero-copy">A beautifully animated alarm clock with custom themes, gradual volume fade-in, lock-screen support, and fully offline operation.</p>
          <div className="cta-row">
            <span className="button primary" aria-disabled="true">{Icon('store')} Google Play coming soon</span>
          </div>
          <p className="small-note">Arise is not currently available for public download.</p>
          <div className="quick-points">
            <span>{Icon('bell')} Multiple alarms</span>
            <span>{Icon('palette')} Custom themes</span>
            <span>{Icon('volume')} Volume fade-in</span>
            <span>{Icon('eyeOff')} No tracking</span>
          </div>
        </div>
        <HeroDevice />
      </section>

      <section className="section-pad compact" id="features">
        <SectionHeading eyebrow="Features" title="Everything needed for a reliable wake-up" text="Arise combines alarm reliability, visual customization, gentle wake-up behavior, and offline privacy." />
        <div className="feature-summary-grid">
          <SummaryCard iconName="alarm" title="Reliable alarms" text="Exact scheduling, boot persistence, lock-screen support, and Android settings shortcuts." />
          <SummaryCard iconName="sunrise" title="Gentle wake-up" text="Volume fade-in, sunrise animation, snooze, and swipe-to-stop protection." />
          <SummaryCard iconName="palette" title="Personal design" text="Preset themes, custom themes, flexible time format, and animated backgrounds." />
        </div>
      </section>

      <section className="section-pad gallery-section" id="gallery">
        <SectionHeading eyebrow="Gallery" title="Explore the Arise interface" text="Real app screenshots presented in a mobile-first gallery." />
        <Gallery />
      </section>

      <section className="section-pad privacy-teaser" id="privacy">
        <SectionHeading eyebrow="Privacy" title="Privacy by design" text="Arise does not collect, store, share, or transmit personal data. Everything stays on your device." />
        <div className="privacy-grid">
          {privacyCards.slice(0, 6).map(([title, text, iconName]) => <SummaryCard key={title} iconName={iconName} title={title} text={text} />)}
        </div>
        <div className="center-row">
          <button className="button primary" onClick={() => navigate('/privacy')}>Read full Privacy Policy</button>
        </div>
      </section>

      <section className="section-pad full-features">
        <SectionHeading eyebrow="Complete feature list" title="Prepared for Google Play" text="The public Google Play release is being prepared." />
        <div className="tabs-note">
          <span className="chip free">Free</span>
          <span className="chip premium">Premium — Coming soon</span>
        </div>
        <FeatureGroups />
        <div className="notice-card">
          <strong>Note:</strong> Arise is not currently available for public download. The Google Play release is being prepared. Core alarm features are planned to remain free, while some advanced features may later become available as a one-time purchase.
        </div>
      </section>

      <FaqSection />
      <Footer navigate={navigate} />
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <section className="section-pad privacy-page-hero" id="policy">
        <div className="privacy-icon">{Icon('shield')}</div>
        <h1>Privacy Policy</h1>
        <p>Arise respects your privacy by design. The app does not collect, store, share, or transmit personal data.</p>
        <div className="policy-meta">
          <span><strong>Version:</strong> {appConfig.version}</span>
          <span><strong>Last updated:</strong> {appConfig.lastUpdated}</span>
        </div>
      </section>

      <section className="section-pad policy-content">
        <div className="policy-card wide">
          <h2>Summary</h2>
          <p>Arise works completely offline. The app does not use analytics, advertising SDKs, tracking tools, cloud sync, or external servers.</p>
          <p>All app data, including alarms, settings, selected sounds, and custom themes, is stored locally on your device.</p>
        </div>

        <div className="privacy-grid policy-grid">
          {privacyCards.map(([title, text, iconName]) => <SummaryCard key={title} iconName={iconName} title={title} text={text} />)}
        </div>

        <div className="policy-card wide" id="permissions">
          <h2>Permissions used</h2>
          <p>Arise requests the following Android permissions exclusively for alarm functionality.</p>
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
          <h2>Android backup note</h2>
          <p>Alarm configuration may be included in Android's standard device backup to your Google account if Android Auto Backup is enabled on your device.</p>
        </div>

        <div className="policy-card wide">
          <h2>Contact</h2>
          <p>For questions about this policy, contact us at <a href={`mailto:${appConfig.supportEmail}`}>{appConfig.supportEmail}</a>.</p>
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
  return (
    <div className="feature-groups">
      {features.map((group) => (
        <section className="feature-group" key={group.group}>
          <h3>{group.group}</h3>
          <div className="feature-cards">
            {group.items.map(([title, text, iconName, tier]) => (
              <article className={`feature-card ${tier === 'premium' ? 'is-premium' : ''}`} key={title}>
                <div className="card-icon">{Icon(iconName)}</div>
                <div>
                  <h4>{title} {tier === 'premium' && <span>Premium</span>}</h4>
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
  const [index, setIndex] = useState(0);
  const current = screenshots[index];
  const next = () => setIndex((value) => (value + 1) % screenshots.length);
  const prev = () => setIndex((value) => (value - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="gallery-wrap">
      <button className="gallery-button left" aria-label="Previous screenshot" onClick={prev}>{Icon('chevronLeft')}</button>
      <div className="phone-frame gallery-phone">
        <img src={current.src} alt={`${current.title} screenshot`} />
      </div>
      <button className="gallery-button right" aria-label="Next screenshot" onClick={next}>{Icon('chevronRight')}</button>
      <div className="gallery-caption">
        <h3>{current.title}</h3>
        <p>{current.description}</p>
      </div>
      <div className="gallery-dots" aria-label="Screenshot selector">
        {screenshots.map((item, itemIndex) => (
          <button
            key={item.title}
            aria-label={`Show ${item.title}`}
            className={itemIndex === index ? 'active' : ''}
            onClick={() => setIndex(itemIndex)}
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
  return (
    <section className="section-pad faq-section" id="faq">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" text="Answers to common questions about Arise, permissions, downloads, and privacy." />
      <div className="faq-list">
        {faqs.map(([question, answer], index) => <FaqItem key={question} question={question} answer={answer} defaultOpen={index === 0} />)}
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
          <p>Modern alarm clock for Android with customizable themes, volume fade-in, and completely offline functionality.</p>
          <div className="footer-icons">
            <a href={`mailto:${appConfig.supportEmail}`} aria-label="Email support">{Icon('mail')}</a>
          </div>
        </div>
        <div>
          <h3>Links</h3>
          <a href="/#gallery">Gallery</a>
          <a href="/privacy" onClick={goPrivacy}>Privacy</a>
          <a href="/#faq">FAQ</a>
        </div>
        <div>
          <h3>Contact</h3>
          <a href={`mailto:${appConfig.supportEmail}`}>{appConfig.supportEmail}</a>
          <a href={`mailto:${appConfig.supportEmail}`}>Email support</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Arise. All rights reserved.</p>
        <div>
          <a href="/privacy" onClick={goPrivacy}>Privacy Policy</a>
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
