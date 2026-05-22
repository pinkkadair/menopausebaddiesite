// ============================================================
// MEMBERSHIP TIERS · TESTIMONIALS · BIG CTA · FOOTER
// ============================================================

const { useState: useStateM } = React;

function Membership() {
  return (
    <section className="membership" id="membership" data-screen-label="05 Membership">
      <div className="membership-inner">
        <div className="membership-head">
          <div>
            <div className="eyebrow gold" style={{ marginBottom: 20 }}>✦ Two Tiers · One Standard · Zero Settling</div>
            <h2 className="display h2" style={{ color: 'var(--ivory)' }}>
              Pick your<br />
              <em style={{ color: 'var(--recruit)' }}>seat at the table.</em>
            </h2>
          </div>
          <div>
            <p className="body-lg" style={{ color: 'rgba(244,236,221,0.78)' }}>
              The Club is enrolling now — cohort 01 closes when we hit 500 founding members.
              Both tiers unlock the full education library, your local chapter, and
              member pricing on everything we ship. VIP adds priority access, weekly
              text drops, and the experiences money usually can't fix.
            </p>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 18 }}>
              ✦ 153 founding spots remaining
            </div>
          </div>
        </div>

        <div className="tier-grid">
          <div className="tier">
            <div className="label">Tier 01 · Club Member</div>
            <h3>The Hot Girls Club</h3>
            <div className="price">$15<small>/month</small></div>
            <ul>
              <li>Full education library + monthly drops</li>
              <li>Member pricing on every event & product</li>
              <li>Access to the private community platform</li>
              <li>Chapter access in your city</li>
              <li>Founding-member badge (limited to first 500)</li>
              <li>15% of dues funds advocacy</li>
            </ul>
            <div className="tier-cta">
              <a className="btn btn-ghost-light btn-lg" style={{ width: '100%', justifyContent: 'center' }} href={window.MB_LINKS.clubMemberCheckout}>Become a Club Member ✦</a>
            </div>
          </div>

          <div className="tier vip">
            <div className="badge">Most Baddie</div>
            <div className="label">Tier 02 · VIP Baddie</div>
            <h3>Amplified Access</h3>
            <div className="price">$45<small>/month</small></div>
            <ul>
              <li>Everything in Club Member</li>
              <li>Weekly VIP text drops from the team</li>
              <li>Priority event access + VIP-only experiences</li>
              <li>Quarterly small-group sessions with specialists</li>
              <li>First access to every product drop</li>
              <li>Annual in-person VIP summit</li>
            </ul>
            <div className="tier-cta">
              <a className="btn btn-recruit btn-lg" style={{ width: '100%', justifyContent: 'center' }} href={window.MB_LINKS.vipBaddieCheckout}>Go VIP Baddie ✦</a>
            </div>
          </div>
        </div>

        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,236,221,0.5)', marginTop: 32, textAlign: 'center' }}>
          Stripe-secured · cancel any time · all dues USD
        </div>
      </div>
    </section>);

}

const TESTIMONIALS = [
{
  s: 5,
  q: "I was 47, couldn't sleep, gaining weight for no reason, and my doctor kept telling me my labs were 'normal.' Joining this club was the first time someone said — that's real, and here's what you can actually do about it.",
  n: "Kristin W.",
  ini: "KW",
  loc: "Atlanta, GA · Founding Member"
},
{
  s: 5,
  q: "I've done the therapy, the supplements, the Instagram rabbit holes at 3am. Nothing clicked until I found women who were in it with me — not just talking about it. The VIP experience is next level.",
  n: "Michelle R.",
  ini: "MR",
  loc: "Houston, TX · VIP Baddie"
},
{
  s: 5,
  q: "My mother went through menopause completely alone and I swore I wouldn't. This club is exactly what I needed — real experts, real products, and women who remind you this chapter is not a decline. It's a damn glow-up.",
  n: "Janelle T.",
  ini: "JT",
  loc: "Chicago, IL · Founding Member"
}];


function Testimonials() {
  return (
    <section className="testimonials" id="voices" data-screen-label="06 Voices">
      <div className="t-inner">
        <div className="t-head">
          <div>
            <div className="eyebrow recruit" style={{ marginBottom: 20 }}>✦ Real Women · Real Words</div>
            <h2 className="display h2">
              They said it<br />
              <em>better than we could.</em>
            </h2>
          </div>
          <div>
            <p className="body-lg">
              2,847 members. 24 chapters. The reviews aren't polite — they're
              specific. These are the women already in the room.
            </p>
          </div>
        </div>
        <div className="t-grid">
          {TESTIMONIALS.map((t) =>
          <div key={t.n} className="t-card">
              <div className="stars">{"★".repeat(t.s)}</div>
              <p className="quote">{t.q}</p>
              <div className="who">
                <div className="ini">{t.ini}</div>
                <div>
                  <div className="nm">{t.n}</div>
                  <div className="loc">{t.loc}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function BigCTA() {
  return (
    <section className="bigcta" id="enlist" data-screen-label="07 Enlist">
      <div className="bigcta-bg"></div>
      <div className="bigcta-inner">
        <div className="eyebrow ivory" style={{ marginBottom: 32 }}>✦ The Final Word</div>
        <div className="brand-slogan brand-slogan-light">
          We are bad, <em>but that's good.</em>
        </div>
        <h2>
          Wait it out.<br />
          Or <em>show up.</em>
        </h2>
        <p className="sub">
          You can keep losing sleep, keep filtering bad advice, and keep waiting
          for the doctor who actually treats this. Or you can take the seat we built
          for you. The door is open. The room is full of women who get it.
        </p>
        <div className="cta-row">
          <a className="btn btn-ink btn-lg" href="#membership">See Membership Options ✦</a>
          <a className="btn btn-ghost-light btn-lg" href={window.MB_LINKS.waitlist}>Join the Waitlist</a>
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 40, opacity: 0.8 }}>
          ✦ 153 founding spots remaining · cohort 01 closes when we hit 500
        </div>
      </div>
    </section>);

}

function Enrollment() {
  return (
    <section className="enrollment" id="join" data-screen-label="08 Join">
      <div className="enrollment-inner">
        <div>
          <div className="eyebrow recruit" style={{ marginBottom: 20 }}>✦ Join the Club</div>
          <h2 className="display h2">
            Claim your access.<br />
            <em>Before the door closes.</em>
          </h2>
          <p className="body-lg">
            Get updates, member news, event access, and priority notice when new
            drops, experiences, and chapter opportunities open.
          </p>
          <div className="cta-row">
            <a className="btn btn-recruit btn-lg" href="#membership">See Membership Options</a>
            <a className="btn btn-ghost btn-lg" href={window.MB_LINKS.waitlist}>Open Waitlist Page</a>
          </div>
        </div>
        <div className="join-form waitlist-card">
          <h3>Claim your city.</h3>
          <p>Use the official Menopause Baddie waitlist page to share your email and city one time. That keeps signup, chapter updates, and launch notifications in the same place.</p>
          <a className="btn btn-recruit btn-lg" href={window.MB_LINKS.waitlist}>Notify Me ✦</a>
          <a className="btn btn-ghost btn-lg" href="#membership">See Membership Options</a>
          <p className="form-note">No duplicate form here. This button opens the official waitlist signup page.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img className="footer-logo" src={window.MB_SITE.logoUrl} alt="Menopause Baddie logo" />
            <h3>Stronger together.<br /><em>Bolder always.</em></h3>
            <div className="footer-slogan">We are bad, but that's good.</div>
            <p className="body" style={{ color: 'rgba(244,236,221,0.65)', maxWidth: 360 }}>
              The Hot Girls Club — a premium membership, a real-world chapter network,
              and a movement for women rewriting how menopause is lived in America.
            </p>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 24 }}>
              Wellness · Wisdom · Sisterhood · Self-Care
            </div>
          </div>
          <div>
            <h5>The Club</h5>
            <ul>
              <li><a href="#mission">Mission</a></li>
              <li><a href="#membership">Membership</a></li>
              <li><a href="#chapters">Chapters</a></li>
              <li><a href="#voices">Voices</a></li>
            </ul>
          </div>
          <div>
            <h5>Learn</h5>
            <ul>
              <li><a href="#learn">Know Your Body</a></li>
              <li><a href="#learn">Stages 101</a></li>
              <li><a href="#learn">HRT Receipts</a></li>
              <li><a href="#learn">Ask a Specialist</a></li>
              <li><a href="#learn">The Fight</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href={window.MB_LINKS.contact}>{window.MB_SITE.contactEmail}</a></li>
              <li><a href={window.MB_LINKS.contact}>Press</a></li>
              <li><a href={window.MB_LINKS.contact}>Partner with us</a></li>
              <li><a href={window.MB_LINKS.waitlist}>Found a chapter</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Menopause Baddie · All rights reserved</div>
          <div><a href={window.MB_LINKS.contact}>Privacy</a> · <a href={window.MB_LINKS.contact}>Terms</a> · <a href={window.MB_LINKS.contact}>Accessibility</a></div>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Membership, Testimonials, BigCTA, Enrollment, Footer });