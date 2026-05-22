// ============================================================
// HERO + URGENCY MECHANICS
// Rallying-cry hero with cycle-able tagline, live status,
// stats, and a pressure-stamp seal.
// ============================================================

const { useState, useEffect, useRef } = React;

const TAGLINES = [
  { line1: "Menopause", line2: <em>met</em>, line3: "its", line4: <em>match.</em> },
  { line1: "This isn't", line2: <>a <em>phase.</em></>, line3: "It's a", line4: <em>force.</em> },
  { line1: "Hormones", line2: <em>shifted.</em>, line3: "So", line4: <em>did we.</em> },
  { line1: "Built to", line2: <em>fight</em>, line3: "menopause.", line4: <em>Built to win.</em> },
];

function Ribbon() {
  const items = [
    "Enrolling now",
    "Founding members \u2014 cohort of 500",
    "Chapters open in 14 cities",
    "Next live event \u2014 Tue 8pm ET",
    "Not coming soon. Already here.",
    "The Hot Girls Club is in session",
  ];
  const loop = [...items, ...items];
  return (
    <div className="ribbon">
      <div className="ribbon-track">
        {loop.map((t, i) => (
          <span key={i}><span className="dot">●</span>{t}<span className="dot">♛</span></span>
        ))}
      </div>
    </div>
  );
}

function Nav({ active, onTab }) {
  const tabs = [
    { label: "Mission", id: "mission" },
    { label: "Learn", id: "learn" },
    { label: "Chapters", id: "chapters" },
    { label: "Membership", id: "membership" },
    { label: "Waitlist", href: window.MB_LINKS.waitlist },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          <img className="brand-logo" src={window.MB_SITE.logoUrl} alt="Menopause Baddie logo" />
          <span>Menopause Baddie</span>
        </div>
        <div className="nav-links">
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href={tab.href || `#${tab.id}`}
              className={active === tab.id ? "active" : ""}
              onClick={(e) => {
                if (tab.href) return;
                e.preventDefault();
                onTab(tab.id);
                document.getElementById(tab.id)?.scrollIntoView({behavior:"smooth", block:"start"});
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost" href={window.MB_LINKS.waitlist}>Join Waitlist</a>
          <a className="btn btn-recruit" href="#membership">Become a Member ✦</a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ taglineIndex, heroLayout, showStamp }) {
  const t = TAGLINES[taglineIndex % TAGLINES.length];
  const heroTitle = (
    <h1 className="hero-title">
      <span className="line">{t.line1}</span>
      <span className="line">{t.line2}</span>
      <span className="line">{t.line3}</span>
      <span className="line">{t.line4}</span>
    </h1>
  );
  const heroSlogan = (
    <div className="brand-slogan hero-slogan" aria-label="Menopause Baddie slogan">
      We are bad, <em>but that's good.</em>
    </div>
  );

  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-status">
        <span className="live-dot"></span>
        <span>Live · Enrolling cohort 01</span>
        <span style={{color:'var(--ink-3)'}}>·</span>
        <span>2,847 members · 14 chapters active</span>
      </div>

      {heroLayout === "image-right" ? (
        <div className="hero-grid">
          <div className="hero-copy">
            {heroTitle}
            <p className="hero-sub">
              The Hot Girls Club is in session. Expert-led education, sisterhood
              chapters in fourteen cities, and a community that refuses to let women
              go through this alone. Doors are open. Take your seat.
            </p>
            {heroSlogan}
            <div className="hero-cta">
              <a className="btn btn-recruit btn-lg" href="#membership">Become a Member ✦</a>
              <a className="btn btn-ghost btn-lg" href="#learn">See what you'll learn →</a>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img src="https://www.menopausebaddies.com/hero-lifestyle.png" alt="Women of the Hot Girls Club" />
            {showStamp && (
              <div className="hero-stamp">
                COHORT 01
                <strong>Now</strong>
                ENROLLING
              </div>
            )}
          </div>
          <HeroStats />
        </div>
      ) : (
        <div className="hero-centered">
          {heroTitle}
          <p className="hero-sub">
            The Hot Girls Club is in session. Expert-led education, sisterhood
            chapters in fourteen cities, real answers — not "wait it out."
          </p>
          {heroSlogan}
          <div className="hero-cta">
            <a className="btn btn-recruit btn-lg" href="#membership">Become a Member ✦</a>
            <a className="btn btn-ghost btn-lg" href="#learn">See what you'll learn →</a>
          </div>
          <HeroStats />
        </div>
      )}
    </section>
  );
}

function HeroStats() {
  return (
    <div className="hero-stats">
      <div className="stat">
        <div className="num">2,847</div>
        <div className="lbl">Members enrolled</div>
      </div>
      <div className="stat">
        <div className="num">14<em>/50</em></div>
        <div className="lbl">Chapters active · 50 by 2027</div>
      </div>
      <div className="stat">
        <div className="num">68%</div>
        <div className="lbl">Women dismissed by their first doctor</div>
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section className="manifesto" id="mission" data-screen-label="02 Mission">
      <div className="manifesto-inner">
        <div>
          <div className="eyebrow gold" style={{marginBottom: 24}}>✦ The Mission</div>
          <h2>
            Forty million women.<br/>
            <em>One army.</em><br/>
            Zero apologies.
          </h2>
        </div>
        <div>
          <p className="body-lg" style={{fontSize: 22, lineHeight: 1.45}}>
            One in two American women will hit menopause. Most will be told it's
            "normal," handed an antidepressant, and sent home. <strong style={{color:'var(--ivory)'}}>That ends here.</strong>
          </p>
          <p className="body-lg" style={{marginTop: 20}}>
            Menopause Baddie is the membership, the movement, and the standing
            order to stop waiting. We replace silence with strategy, dismissal with
            data, and "just deal with it" with the largest sisterhood of women
            taking action on their own terms.
          </p>
          <div className="figures">
            <div className="figure">
              <div className="n">73%</div>
              <div className="l">Of women never told<br/>perimenopause was starting</div>
            </div>
            <div className="figure">
              <div className="n">$26B</div>
              <div className="l">Lost annually to untreated<br/>menopause symptoms at work</div>
            </div>
            <div className="figure">
              <div className="n">7<span style={{fontSize:32}}>yrs</span></div>
              <div className="l">Average delay between<br/>onset and diagnosis</div>
            </div>
            <div className="figure">
              <div className="n">1<span style={{fontSize:32}}>%</span></div>
              <div className="l">Of OB-GYNs trained<br/>specifically in menopause</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { g: "◈", t: "Authority", b: "Straight answers from clinicians who actually treat menopause. No wellness theater, no recycled TikTok." },
    { g: "◇", t: "Access", b: "Expert events, VIP speakers, member pricing, and resources you can't get anywhere else." },
    { g: "◉", t: "Belonging", b: "A club identity and a chapter in your city. Sisterhood you can actually walk into." },
    { g: "✦", t: "Action", b: "We don't just talk. We advocate for HRT access, workplace policy, and clinical reform." },
  ];
  return (
    <div className="section section-tight">
      <div className="pillars">
        {items.map((p) => (
          <div key={p.t} className="pillar">
            <span className="glyph">{p.g}</span>
            <h3>{p.t}</h3>
            <p className="body" style={{margin:0}}>{p.b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StickyBar({ visible }) {
  return (
    <div className={`sticky-bar ${visible ? "" : "hidden"}`}>
      <span className="live"><span className="live-dot"></span>Doors open</span>
      <span className="count">+47 enrolled this week</span>
      <a className="btn btn-recruit" href="#membership">
        Join ✦
      </a>
    </div>
  );
}

function Marquee() {
  const items = [
    "Wellness", "Wisdom", "Sisterhood", "Standards",
    "Authority", "Access", "Belonging", "Action",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <span key={i}>{t}<span className="star"> ✦ </span></span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Ribbon, Nav, Hero, Manifesto, Pillars, StickyBar, Marquee, TAGLINES });
