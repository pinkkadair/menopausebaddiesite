// ============================================================
// APP — Menopause Baddie landing page
// Wires all components together + handles tweaks + sticky bar
// ============================================================

const { useState: useStateA, useEffect: useEffectA } = React;

// EDITMODE: tweakable defaults (also re-used as initial state)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tagline": 0,
  "accent": "#B84A5C",
  "heroLayout": "image-right",
  "showUrgencyRibbon": true,
  "showStamp": true,
  "learnDefault": "symptoms",
  "showStickyBar": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [stickyVisible, setSticky] = useStateA(false);
  const [activeSection, setActive] = useStateA("mission");

  // Apply accent live
  useEffectA(() => {
    document.documentElement.style.setProperty("--recruit", t.accent);
    // derive a darker shade
    document.documentElement.style.setProperty("--recruit-dk", shade(t.accent, -18));
  }, [t.accent]);

  // Sticky bar after scrolling past hero
  useEffectA(() => {
    if (!t.showStickyBar) { setSticky(false); return; }
    const onScroll = () => {
      const y = window.scrollY;
      setSticky(y > 800 && y < (document.documentElement.scrollHeight - window.innerHeight - 600));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [t.showStickyBar]);

  // Section spy for nav underline
  useEffectA(() => {
    const sections = ["mission", "learn", "chapters", "membership"];
    const onScroll = () => {
      let curr = "mission";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) curr = id;
      }
      setActive(curr);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {t.showUrgencyRibbon && <Ribbon />}
      <Nav active={activeSection} onTab={(id) => setActive(id)} />
      <Hero
        taglineIndex={t.tagline}
        heroLayout={t.heroLayout}
        showStamp={t.showStamp}
      />
      <Manifesto />
      <Pillars />
      <Marquee />
      <Learn defaultTab={t.learnDefault} key={t.learnDefault /* remount when default changes */} />
      <Chapters />
      <Membership />
      <Testimonials />
      <BigCTA />
      <Enrollment />
      <Footer />
      <StickyBar visible={stickyVisible} />

      <TweaksPanelOuter t={t} setTweak={setTweak} />
    </>
  );
}

// ============= TWEAKS PANEL =============
function TweaksPanelOuter({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection title="Hero · Rallying Cry">
        <TweakRadio
          label="Tagline"
          value={String(t.tagline)}
          onChange={(v) => setTweak("tagline", parseInt(v))}
          options={[
            { value: "0", label: "Match" },
            { value: "1", label: "Force" },
            { value: "2", label: "Shifted" },
            { value: "3", label: "Built" },
          ]}
        />
        <TweakRadio
          label="Hero layout"
          value={t.heroLayout}
          onChange={(v) => setTweak("heroLayout", v)}
          options={[
            { value: "image-right", label: "Image right" },
            { value: "centered",    label: "Centered" },
          ]}
        />
        <TweakToggle
          label="Pressure-stamp seal"
          value={t.showStamp}
          onChange={(v) => setTweak("showStamp", v)}
        />
      </TweakSection>

      <TweakSection title="Urgency">
        <TweakToggle
          label="Top scrolling ribbon"
          value={t.showUrgencyRibbon}
          onChange={(v) => setTweak("showUrgencyRibbon", v)}
        />
        <TweakToggle
          label="Sticky 'Enlist' bar"
          value={t.showStickyBar}
          onChange={(v) => setTweak("showStickyBar", v)}
        />
      </TweakSection>

      <TweakSection title="Color · Rallying Accent">
        <TweakColor
          label="Recruit accent"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#B84A5C", "#7A2E3C", "#C2392E", "#8E2840"]}
        />
      </TweakSection>

      <TweakSection title="Education Tab Default">
        <TweakSelect
          label="Default Learn tab"
          value={t.learnDefault}
          onChange={(v) => setTweak("learnDefault", v)}
          options={[
            { value: "symptoms", label: "Know Your Body" },
            { value: "stages",   label: "The Three Stages" },
            { value: "hrt",      label: "HRT · Myths vs. Facts" },
            { value: "ask",      label: "Ask a Specialist" },
            { value: "advocacy", label: "The Fight" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// helper: darken/lighten a hex color
function shade(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = ((num >> 8) & 0x00FF) + amt;
  let B = (num & 0x0000FF) + amt;
  R = Math.max(Math.min(255, R), 0);
  G = Math.max(Math.min(255, G), 0);
  B = Math.max(Math.min(255, B), 0);
  return "#" + ((R << 16) | (G << 8) | B).toString(16).padStart(6, "0");
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
