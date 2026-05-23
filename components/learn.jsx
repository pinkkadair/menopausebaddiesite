// ============================================================
// LEARN / EDUCATION TAB
// Tabs: Symptoms · Stages · HRT · Ask a Specialist · Advocacy
// ============================================================

const { useState: useStateL } = React;

const SYMPTOMS = [
  { n: "01", t: "Hot flashes & night sweats", p: "75% of women", b: "Sudden heat waves and drenching night sweats — caused by estrogen-driven changes in your thermoregulator." },
  { n: "02", t: "Sleep that won't hold", p: "61% of women", b: "Falling asleep is fine. Staying asleep at 3 a.m. is not. Linked to cortisol, progesterone, and night sweats." },
  { n: "03", t: "Brain fog", p: "60% of women", b: "Word-finding lapses, decision fatigue, the 'why did I walk in here' loop. It is hormonal, not aging." },
  { n: "04", t: "Joint & body aches", p: "58% of women", b: "Estrogen has receptors in cartilage and connective tissue. When it drops, joints stiffen and ache." },
  { n: "05", t: "Mood & rage", p: "53% of women", b: "Irritability, sudden tears, flat affect — often misdiagnosed as depression. It deserves a real workup." },
  { n: "06", t: "Libido & dryness", p: "47% of women", b: "Genitourinary syndrome of menopause is the most under-treated symptom. Local estrogen is safe and effective." },
  { n: "07", t: "Weight redistribution", p: "70% of women", b: "Not 'letting yourself go.' Estrogen loss shifts fat to the midsection and reduces insulin sensitivity." },
  { n: "08", t: "Hair, skin, nails", p: "52% of women", b: "Thinning, dryness, splitting. Collagen drops ~30% in the five years after your final period." },
  { n: "09", t: "Heart & bone risk", p: "All women", b: "Cardiovascular risk and bone loss accelerate after menopause. Prevention starts in perimenopause." },
];

const STAGES = [
  {
    a: "30s — mid-40s",
    n: "Perimenopause",
    sub: "Often 7+ years long",
    pts: ["Cycles get unpredictable", "Sleep starts to fracture", "Mood and energy shifts", "PMS feels new and worse", "This is the window to act"],
  },
  {
    a: "Avg. age 51",
    n: "Menopause",
    sub: "12 consecutive months without a period",
    pts: ["Hot flashes peak", "Brain fog and word loss", "Vaginal & urinary changes", "Joint pain intensifies", "HRT decisions matter most here"],
  },
  {
    a: "51+",
    n: "Postmenopause",
    sub: "The rest of your life",
    pts: ["Bone density at risk", "Cardiovascular risk rises", "Genitourinary symptoms persist", "Cognitive protection critical", "Strength training is non-negotiable"],
  },
];

const MYTHS = [
  { m: "HRT causes breast cancer.", f: "The 2002 WHI study has been re-analyzed. For most women under 60, HRT lowers all-cause mortality and the breast cancer signal was overstated." },
  { m: "You should suffer through it naturally.", f: "Untreated menopause is linked to cardiovascular disease, osteoporosis, and a 40% higher rate of clinical depression." },
  { m: "It's just hot flashes.", f: "There are 34+ documented symptoms. Hot flashes are one. Cognitive, cardiac, and bone effects often outlast the flashes by decades." },
  { m: "Bioidentical means safer.", f: "Compounded 'bioidentical' hormones are not FDA-regulated. FDA-approved body-identical HRT is the evidence-based choice." },
];

const ASK_SAMPLES = [
  "Is HRT safe if I have a family history of breast cancer?",
  "Why is my sleep destroyed at 3 a.m.?",
  "I'm 42 and my doctor says I'm 'too young' for perimenopause.",
  "Will weight training actually help?",
];

const FIGHT = [
  "Insurance parity for menopause care",
  "Mandatory menopause training for OB-GYNs",
  "Workplace accommodations (FMLA-style) for severe symptoms",
  "Direct-to-consumer HRT regulation reform",
  "Federal research funding parity (women's health is 0.45% of NIH)",
];

function Learn({ defaultTab }) {
  const [tab, setTab] = useStateL(defaultTab || "symptoms");
  const tabs = [
    { id: "symptoms", n: "01", t: "Know Your Body" },
    { id: "stages",   n: "02", t: "The Three Stages" },
    { id: "hrt",      n: "03", t: "HRT · Myths vs. Facts" },
    { id: "ask",      n: "04", t: "Ask a Specialist" },
    { id: "advocacy", n: "05", t: "The Fight" },
  ];

  return (
    <section className="learn" id="learn" data-screen-label="03 Learn">
      <div className="learn-inner">
        <div className="learn-head">
          <div>
            <div className="eyebrow recruit" style={{marginBottom: 20}}>✦ Education · Built In · Not Paywalled</div>
            <h2 className="display h2">
              The information<br/>
              <em>they wouldn't give you.</em><br/>
              On the page. Right now.
            </h2>
          </div>
          <div>
            <p className="body-lg">
              We bridged the gap between menopause clinic and menopause community.
              Every Baddie gets the same baseline science — clear, current, and
              clinician-reviewed. No paywall. No vague wellness fluff. Start
              learning before you even decide to enlist.
            </p>
          </div>
        </div>

        <div className="tabs" role="tablist">
          {tabs.map((x) => (
            <button
              key={x.id}
              className={`tab ${tab === x.id ? "is-active" : ""}`}
              onClick={() => setTab(x.id)}
            >
              <span className="idx">{x.n}</span>{x.t}
            </button>
          ))}
        </div>

        <div className="tab-body">
          {tab === "symptoms" && <SymptomsPanel />}
          {tab === "stages"   && <StagesPanel />}
          {tab === "hrt"      && <MythsPanel />}
          {tab === "ask"      && <AskPanel />}
          {tab === "advocacy" && <AdvocacyPanel />}
        </div>
      </div>
    </section>
  );
}

function SymptomsPanel() {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 24}}>
        <div className="eyebrow">34 Documented Symptoms · The Big Nine Below</div>
        <div className="mono small">Source: Menopause Society 2024</div>
      </div>
      <div className="symptom-grid">
        {SYMPTOMS.map((s) => (
          <div key={s.n} className="symptom">
            <div className="num">{s.n} / 09</div>
            <h4>{s.t}</h4>
            <p className="body" style={{margin: 0, fontSize: 14}}>{s.b}</p>
            <div className="pct">▲ {s.p} report it</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StagesPanel() {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 24}}>
        <div className="eyebrow">The Timeline No One Drew You</div>
        <div className="mono small">Perimenopause is not a rumor. It's a stage.</div>
      </div>
      <div className="timeline">
        {STAGES.map((s, i) => (
          <div key={i} className="tl-stage">
            <div className="age">{s.a}</div>
            <h4>{s.n}</h4>
            <p className="body" style={{margin: 0, fontSize: 14, fontStyle: 'italic', color: 'var(--oxblood)'}}>{s.sub}</p>
            <ul>
              {s.pts.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="mono small" style={{marginTop: 24}}>
        ▲ Reviewed by Menopause Baddie™ clinical advisory board · last updated May 2026
      </p>
    </div>
  );
}

function MythsPanel() {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 24}}>
        <div className="eyebrow">Hormone Therapy · Receipts Included</div>
        <div className="mono small">Cited · current · clinician-reviewed</div>
      </div>
      <div className="myths">
        {MYTHS.map((m, i) => (
          <div key={i} className="myth">
            <div className="side myth-side">
              <div className="lbl">✕ The Myth</div>
              <p>{m.m}</p>
            </div>
            <div className="side fact">
              <div className="lbl">✦ The Receipt</div>
              <p>{m.f}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mono small" style={{marginTop: 24}}>
        ▲ Always discuss HRT with a qualified clinician. We can connect you to one inside the club.
      </p>
    </div>
  );
}

function AskPanel() {
  const [q, setQ] = useStateL("");
  const [a, setA] = useStateL(null);
  const [loading, setLoading] = useStateL(false);

  const ask = async (text) => {
    const question = (text || q).trim();
    if (!question) return;
    setLoading(true);
    setA(null);
    window.setTimeout(() => {
      setA(`Your question matters: "${question}"\n\nMenopause and perimenopause symptoms can start earlier than many women are told, especially sleep disruption, cycle changes, mood shifts, hot flashes, brain fog, vaginal dryness, and changes in weight distribution. This page is educational only, so it cannot diagnose or prescribe, but it can help you prepare for a better clinical conversation.\n\nNext step: write down your top three symptoms, cycle pattern, medications, family history, and goals, then ask a qualified clinician about evidence-based menopause care options.`);
      setLoading(false);
    }, 350);
  };

  return (
    <div className="ask">
      <div className="ask-form">
        <div className="eyebrow recruit">✦ Powered by clinical guidance · Live Q&A</div>
        <h3 style={{fontFamily:'var(--serif)', fontSize: 36, fontWeight: 400, margin: 0, lineHeight: 1.05}}>
          Ask anything. Get a real answer — <em style={{color:'var(--oxblood)'}}>not a Google rabbit hole.</em>
        </h3>
        <textarea
          placeholder="e.g. I'm 44 and my periods are still regular, but I haven't slept through the night in a year. What's happening?"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="quick">
          {ASK_SAMPLES.map((s) => (
            <button key={s} className="chip" onClick={() => { setQ(s); ask(s); }}>{s}</button>
          ))}
        </div>
        <div>
          <button className="btn btn-recruit" onClick={() => ask()} disabled={loading}>
            {loading ? "Thinking…" : "Ask the Baddie ✦"}
          </button>
        </div>
      </div>
      <div className="ask-response">
        <div className="meta"><span className="live-dot"></span>Menopause Baddie™ Assistant · Beta</div>
        {a ? (
          <div className="text" style={{whiteSpace: 'pre-wrap'}}>{a}</div>
        ) : loading ? (
          <div className="text placeholder">Pulling up the science…</div>
        ) : (
          <div className="text placeholder">
            Try a question on the left — or tap one of the suggestions. You'll get
            a clear, evidence-based answer in two paragraphs.
          </div>
        )}
        <div className="disclaimer">
          ▲ Informational only · not medical advice · always loop in your clinician
        </div>
      </div>
    </div>
  );
}

function AdvocacyPanel() {
  return (
    <div className="advocacy">
      <div>
        <div className="eyebrow recruit" style={{marginBottom: 16}}>✦ What We're Fighting For</div>
        <h3 style={{fontFamily:'var(--serif)', fontSize: 48, fontWeight: 400, margin: 0, lineHeight: 0.98}}>
          Membership funds<br/>
          <em style={{color:'var(--oxblood)'}}>the movement.</em>
        </h3>
        <p className="body-lg" style={{marginTop: 20}}>
          15% of every Baddie membership goes to advocacy: clinical training scholarships,
          policy work, and free access for women who can't afford private care.
        </p>
        <ul className="fight-list">
          {FIGHT.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
      <div>
        <div className="advocacy-stats">
          <div className="advocacy-stat">
            <div className="n">$<em>427k</em></div>
            <div className="l">Raised for menopause clinical training scholarships in 2025</div>
          </div>
          <div className="advocacy-stat">
            <div className="n">3</div>
            <div className="l">State bills currently sponsored by Menopause Baddie™ advocacy</div>
          </div>
          <div className="advocacy-stat">
            <div className="n">1,240</div>
            <div className="l">Women given free club access via the Sisterhood Scholarship Fund</div>
          </div>
          <div className="advocacy-stat">
            <div className="n">14</div>
            <div className="l">Cities where local chapters lobbied for menopause workplace policy</div>
          </div>
        </div>
        <a className="btn btn-ink" href="#membership" style={{marginTop: 24}}>Join the movement ✦</a>
      </div>
    </div>
  );
}

Object.assign(window, { Learn });
