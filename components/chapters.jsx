// ============================================================
// CHAPTERS — interactive REAL US map + roster grid
// Map data: window.US_MAP (loaded from assets/us-map.js)
// Projection: Albers USA, lower-48. State outlines + city dots.
// ============================================================

const { useState: useStateC } = React;

// Cities use coordinates pre-projected by Albers USA to match the state paths.
const CHAPTERS = [
  { city: "New York",     state: "NY", status: "active",   x: 67.16, y: 24.99, members: 412, leader: "Lena R.",     next: "Tue Jun 4 · 7pm ET" },
  { city: "Los Angeles",  state: "CA", status: "active",   x: 31.02, y: 31.80, members: 386, leader: "Maritza A.",  next: "Wed Jun 5 · 7pm PT" },
  { city: "Chicago",      state: "IL", status: "active",   x: 56.47, y: 25.47, members: 298, leader: "Kim D.",      next: "Thu Jun 6 · 6:30pm CT" },
  { city: "Houston",      state: "TX", status: "active",   x: 50.57, y: 38.54, members: 264, leader: "Tanya M.",    next: "Fri Jun 7 · 7pm CT" },
  { city: "Atlanta",      state: "GA", status: "active",   x: 60.01, y: 33.74, members: 241, leader: "Janelle T.",  next: "Sat Jun 8 · 6pm ET" },
  { city: "Miami",        state: "FL", status: "active",   x: 64.99, y: 41.46, members: 198, leader: "Sofia E.",    next: "Mon Jun 10 · 7pm ET" },
  { city: "Dallas",       state: "TX", status: "active",   x: 49.30, y: 35.37, members: 192, leader: "Renee B.",    next: "Tue Jun 11 · 7pm CT" },
  { city: "Phoenix",      state: "AZ", status: "active",   x: 36.12, y: 33.49, members: 168, leader: "Carla V.",    next: "Wed Jun 12 · 7pm MT" },
  { city: "Seattle",      state: "WA", status: "active",   x: 31.52, y: 17.18, members: 154, leader: "Anika P.",    next: "Thu Jun 13 · 7pm PT" },
  { city: "Boston",       state: "MA", status: "active",   x: 68.95, y: 22.75, members: 146, leader: "Maureen K.",  next: "Fri Jun 14 · 7pm ET" },
  { city: "Denver",       state: "CO", status: "open",     x: 42.84, y: 27.68, members: 138, leader: "Jess H.",     next: "Mon Jun 17 · 7pm MT" },
  { city: "Washington",   state: "DC", status: "open",     x: 65.20, y: 27.38, members: 124, leader: "Brianna L.",  next: "Inaugural · Jun 22" },
  { city: "Nashville",    state: "TN", status: "open",     x: 57.71, y: 31.43, members: 102, leader: "Holly W.",    next: "Inaugural · Jun 25" },
  { city: "San Diego",    state: "CA", status: "open",     x: 31.62, y: 33.38, members: 96,  leader: "Lupe R.",     next: "Inaugural · Jun 27" },
  { city: "Austin",       state: "TX", status: "forming",  x: 48.43, y: 38.00, members: 81,  leader: "TBA",         next: "Forming · launches Jul" },
  { city: "Charlotte",    state: "NC", status: "forming",  x: 62.80, y: 31.76, members: 64,  leader: "TBA",         next: "Forming · launches Jul" },
  { city: "Minneapolis",  state: "MN", status: "forming",  x: 52.02, y: 22.47, members: 58,  leader: "TBA",         next: "Forming · launches Aug" },
  { city: "Philadelphia", state: "PA", status: "forming",  x: 66.44, y: 25.98, members: 56,  leader: "TBA",         next: "Forming · launches Aug" },
  { city: "Portland",     state: "OR", status: "forming",  x: 30.68, y: 19.20, members: 47,  leader: "TBA",         next: "Forming · launches Aug" },
  { city: "Las Vegas",    state: "NV", status: "forming",  x: 34.08, y: 30.18, members: 39,  leader: "TBA",         next: "Forming · launches Sep" },
  { city: "Detroit",      state: "MI", status: "waitlist", x: 59.93, y: 24.60, members: 34,  leader: "—",           next: "Waitlist · founder needed" },
  { city: "St. Louis",    state: "MO", status: "waitlist", x: 54.70, y: 29.05, members: 31,  leader: "—",           next: "Waitlist · founder needed" },
  { city: "Baltimore",    state: "MD", status: "waitlist", x: 65.46, y: 26.91, members: 28,  leader: "—",           next: "Waitlist · founder needed" },
  { city: "New Orleans",  state: "LA", status: "waitlist", x: 55.37, y: 38.17, members: 26,  leader: "—",           next: "Waitlist · founder needed" },
];

const STATUS_COLOR = {
  active:   "#B84A5C",   // rose — primary brand action
  open:     "#C9A56B",   // gold
  forming:  "#E8B4A8",   // blush
  waitlist: "#6B5B47",   // muted ink
};

function ChaptersMap({ selected, onSelect, filter }) {
  const map = window.US_MAP;
  if (!map) return <div style={{padding: 40, color: 'var(--ivory)'}}>Loading map…</div>;

  const vb = map.viewBox;
  const padding = 1;
  const viewBox = `${(vb.minX - padding).toFixed(2)} ${(vb.minY - padding).toFixed(2)} ${(vb.width + padding*2).toFixed(2)} ${(vb.height + padding*2).toFixed(2)}`;

  const visibleChapters = filter === "all" ? CHAPTERS : CHAPTERS.filter(c => c.status === filter);

  return (
    <div className="map-frame">
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="hatch" patternUnits="userSpaceOnUse" width="1.2" height="1.2" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="1.2" stroke="rgba(245,234,219,0.04)" strokeWidth="0.3"/>
          </pattern>
          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(184,74,92,0.5)"/>
            <stop offset="100%" stopColor="rgba(184,74,92,0)"/>
          </radialGradient>
        </defs>

        <rect x={vb.minX - padding} y={vb.minY - padding}
              width={vb.width + padding*2} height={vb.height + padding*2}
              fill="url(#hatch)"/>

        {/* State outlines */}
        <g>
          {map.states.map((s) => (
            <path
              key={s.id}
              d={s.d}
              fill="rgba(245,234,219,0.04)"
              stroke="rgba(245,234,219,0.22)"
              strokeWidth="0.08"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Faint "supply lines" between active chapters */}
        <g opacity="0.35">
          {CHAPTERS.filter(c => c.status === "active").map((c, i, arr) => {
            const next = arr[(i + 1) % arr.length];
            return (
              <line key={`l-${i}`}
                x1={c.x} y1={c.y} x2={next.x} y2={next.y}
                stroke="rgba(201,165,107,0.5)" strokeWidth="0.08"
                strokeDasharray="0.4,0.6"/>
            );
          })}
        </g>

        {/* Chapter dots */}
        {visibleChapters.map((c) => {
          const isSel = selected?.city === c.city;
          const r = c.status === "active" ? 0.65 : c.status === "open" ? 0.55 : 0.45;
          return (
            <g key={c.city} style={{cursor:'pointer'}} onClick={() => onSelect(c)}>
              {c.status === "active" && (
                <circle cx={c.x} cy={c.y} r={1.5} fill="url(#pulseGlow)">
                  <animate attributeName="r" values={`${r};${r*3.5};${r}`} dur="2.6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.9;0;0.9" dur="2.6s" repeatCount="indefinite"/>
                </circle>
              )}
              <circle
                cx={c.x} cy={c.y}
                r={isSel ? r * 1.7 : r}
                fill={STATUS_COLOR[c.status]}
                stroke={isSel ? "#F5EADB" : "transparent"}
                strokeWidth="0.18"
              />
              {(isSel || c.status === "active") && (
                <text
                  x={c.x + 0.9}
                  y={c.y + 0.3}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize={isSel ? 0.95 : 0.8}
                  fontWeight="500"
                  fill={isSel ? "#F5EADB" : "rgba(245,234,219,0.62)"}
                  style={{letterSpacing: '0.05em'}}
                >
                  {c.city.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="map-legend">
        <div className="swatch"><i style={{background: STATUS_COLOR.active}}></i>Active</div>
        <div className="swatch"><i style={{background: STATUS_COLOR.open}}></i>Just opened</div>
        <div className="swatch"><i style={{background: STATUS_COLOR.forming}}></i>Forming</div>
        <div className="swatch"><i style={{background: STATUS_COLOR.waitlist}}></i>Waitlist</div>
      </div>

      {selected && (
        <div className="map-callout">
          <div className="ttl">{selected.status === "open" ? "Just Opened" : selected.status.toUpperCase()} · Chapter</div>
          <h4 className="city">{selected.city}, {selected.state}</h4>
          <div className="mono" style={{fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8}}>
            {selected.members} members · Lead: {selected.leader}
          </div>
          <div style={{fontSize: 13, lineHeight: 1.4}}>Next meetup: <strong>{selected.next}</strong></div>
        </div>
      )}
    </div>
  );
}

function Chapters() {
  const [selected, setSelected] = useStateC(CHAPTERS[0]);
  const [filter, setFilter] = useStateC("all");

  const filtered = filter === "all" ? CHAPTERS : CHAPTERS.filter(c => c.status === filter);

  return (
    <section className="chapters" id="chapters" data-screen-label="04 Chapters">
      <div className="chapters-inner">
        <div className="chapters-head">
          <div>
            <div className="eyebrow recruit" style={{marginBottom: 20}}>✦ A Movement · Nationwide · In Session</div>
            <h2 className="display h2">
              Your city.<br/>
              <em>Your chapter.</em><br/>
              Your women.
            </h2>
          </div>
          <div>
            <p className="body-lg">
              Twenty-four cities. 2,847 women. One sisterhood. A Baddie Chapter is a
              monthly meetup, a private city chat, and a leader who actually knows your
              name. We are not on a waitlist. <strong>We are in the room.</strong>
            </p>
            <div style={{display:'flex', gap: 10, marginTop: 20, flexWrap:'wrap'}}>
              {[
                {k: "all", l: "All cities"},
                {k: "active", l: "Active"},
                {k: "open", l: "Just opened"},
                {k: "forming", l: "Forming"},
                {k: "waitlist", l: "Waitlist"},
              ].map(f => (
                <button
                  key={f.k}
                  className={`btn ${filter === f.k ? "btn-ink" : "btn-ghost"}`}
                  style={{padding: '10px 16px', fontSize: 11}}
                  onClick={() => setFilter(f.k)}
                >{f.l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="chapters-grid">
          <ChaptersMap selected={selected} onSelect={setSelected} filter={filter} />

          <div className="chapter-roster">
            <div className="roster-head">
              <span>{filtered.length} Cities</span>
              <span>Status · Members</span>
            </div>
            <div className="chapter-list">
              {filtered.map((c) => (
                <div
                  key={c.city}
                  className={`chapter-row ${selected?.city === c.city ? "selected" : ""}`}
                  onClick={() => setSelected(c)}
                >
                  <div>
                    <div className="city">{c.city}</div>
                    <div className="state">{c.state} · {c.members} members</div>
                  </div>
                  <div></div>
                  <div className={`status ${c.status}`}>{c.status === "open" ? "Just opened" : c.status}</div>
                </div>
              ))}
            </div>
            <div className="found-cta">
              <div className="label">Don't see your city?<br/><span style={{color: 'var(--gold)'}}>Found one.</span></div>
              <a className="btn btn-recruit" href={window.MB_LINKS.waitlist}>Become a chapter founder ✦</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Chapters });
