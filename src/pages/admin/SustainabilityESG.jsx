import Topbar from "../../components/Topbar";

const hubs = [
  { region: "EU", name: "Berlin HQ", volume: "12,500 units", pct: 98, bar: "#2ed57e" },
  { region: "NA", name: "San Francisco", volume: "8,200 units", pct: 92, bar: "#2ed57e" },
  { region: "APAC", name: "Singapore Hub", volume: "5,100 units", pct: 87, bar: "#ffa502" },
];

const emissionsData = [20, 35, 48, 38, 55, 62, 58, 72, 68, 80, 75, 85];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function SustainabilityESG() {
  const maxVal = Math.max(...emissionsData);

  return (
    <div>
      <Topbar
        title="Sustainability & ESG Metrics"
        subtitle="Real-time impact analysis of reverse logistics operations."
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Oct 2023 - Present
            </button>
            <button className="btn btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export Report
            </button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "Total Carbon Diverted", value: "12,450 Tons", change: "↑ +14.2% vs last month", up: true, icon: "CO₂" },
            { label: "Energy Saved", value: "450 MWh", change: "↑ +8.5% vs last month", up: true, icon: "⚡" },
            { label: "Trees Equivalent", value: "28,901 Trees", change: "75% of goal", up: true, icon: "🌳" },
            { label: "Material Recovery", value: "85.4% Rate", change: "↑ +2.1% vs industry avg", up: true, icon: "♻" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span className="stat-label">{s.label}</span>
                <span style={{ fontSize: "1rem" }}>{s.icon}</span>
              </div>
              <div className="stat-value" style={{ color: "#2ed57e", fontSize: "1.4rem" }}>{s.value}</div>
              <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, marginBottom: 24 }}>
          {/* Global Impact Map */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>
                  Global Impact <span style={{ color: "var(--text2)", fontWeight: 400 }}>| Live Recycling Hubs</span>
                </h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div className="live-dot"></div>
                <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 600 }}>LIVE DATA</span>
              </div>
            </div>
            {/* SVG World Map */}
            <div style={{ background: "var(--bg3)", borderRadius: 10, height: 240, position: "relative", overflow: "hidden", border: "1px solid var(--border)" }}>
              <svg viewBox="0 0 800 380" width="100%" height="100%" style={{ opacity: 0.7 }}>
                {/* Simplified world map outlines */}
                <ellipse cx="200" cy="180" rx="120" ry="80" fill="none" stroke="rgba(46,213,126,0.2)" strokeWidth="1"/>
                <ellipse cx="420" cy="160" rx="160" ry="90" fill="none" stroke="rgba(46,213,126,0.2)" strokeWidth="1"/>
                <ellipse cx="600" cy="170" rx="100" ry="70" fill="none" stroke="rgba(46,213,126,0.2)" strokeWidth="1"/>
                {/* Continents simplified */}
                <path d="M100 140 Q160 110 220 130 Q260 150 240 200 Q200 230 160 210 Q100 190 100 140Z" fill="rgba(46,213,126,0.08)" stroke="rgba(46,213,126,0.15)" strokeWidth="1"/>
                <path d="M300 120 Q380 100 460 120 Q520 140 530 190 Q510 240 440 250 Q360 260 320 230 Q280 200 300 120Z" fill="rgba(46,213,126,0.08)" stroke="rgba(46,213,126,0.15)" strokeWidth="1"/>
                <path d="M540 120 Q600 100 660 130 Q700 160 690 200 Q660 230 600 220 Q540 200 530 160 Q528 140 540 120Z" fill="rgba(46,213,126,0.08)" stroke="rgba(46,213,126,0.15)" strokeWidth="1"/>
                {/* Hub markers */}
                <circle cx="390" cy="140" r="8" fill="rgba(46,213,126,0.3)" stroke="#2ed57e" strokeWidth="2">
                  <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="390" cy="140" r="4" fill="#2ed57e"/>
                <circle cx="180" cy="155" r="6" fill="rgba(46,213,126,0.3)" stroke="#2ed57e" strokeWidth="1.5">
                  <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="180" cy="155" r="3" fill="#2ed57e"/>
                <circle cx="610" cy="200" r="6" fill="rgba(19,218,236,0.3)" stroke="#13daec" strokeWidth="1.5">
                  <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="610" cy="200" r="3" fill="#13daec"/>
                {/* Connection lines */}
                <line x1="180" y1="155" x2="390" y2="140" stroke="rgba(46,213,126,0.3)" strokeWidth="1" strokeDasharray="4 4"/>
                <line x1="390" y1="140" x2="610" y2="200" stroke="rgba(19,218,236,0.3)" strokeWidth="1" strokeDasharray="4 4"/>
              </svg>
            </div>
          </div>

          {/* Material Breakdown */}
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>Material Breakdown</h3>
            {/* Donut chart */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div style={{ position: "relative", width: 140, height: 140 }}>
                <svg viewBox="0 0 140 140" width="140" height="140">
                  <circle cx="70" cy="70" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20"/>
                  <circle cx="70" cy="70" r="50" fill="none" stroke="#2ed57e" strokeWidth="20"
                    strokeDasharray={`${0.4 * 314} ${314}`} strokeDashoffset="-0" strokeLinecap="round"/>
                  <circle cx="70" cy="70" r="50" fill="none" stroke="#13daec" strokeWidth="20"
                    strokeDasharray={`${0.3 * 314} ${314}`} strokeDashoffset={`${-(0.4 * 314)}`} strokeLinecap="round"/>
                  <circle cx="70" cy="70" r="50" fill="none" stroke="#a78bfa" strokeWidth="20"
                    strokeDasharray={`${0.3 * 314} ${314}`} strokeDashoffset={`${-(0.7 * 314)}`} strokeLinecap="round"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem" }}>12.4k</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text2)" }}>TOTAL UNITS</div>
                </div>
              </div>
            </div>
            {[
              { color: "#2ed57e", label: "Aluminum & Metals", pct: "40%" },
              { color: "#13daec", label: "Plastics (PET/ABS)", pct: "30%" },
              { color: "#a78bfa", label: "Rare Earth Elements", pct: "30%" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }}></div>
                  <span style={{ fontSize: "0.82rem" }}>{item.label}</span>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text2)" }}>{item.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Emissions Reduction */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Emissions Reduction</h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text2)" }}>CO2e tons over last 6 months</p>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "#2ed57e", fontWeight: 700 }}>-32%</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
              {emissionsData.slice(6).map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", background: "#2ed57e", borderRadius: "3px 3px 0 0", height: `${(v / maxVal) * 80}px`, opacity: 0.6 + (i * 0.05) }}></div>
                  <span style={{ fontSize: "0.62rem", color: "var(--text3)" }}>{months[i + 6]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sustainable Hubs */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Top Sustainable Hubs</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem" }}>View All</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 80px 80px", gap: 8, marginBottom: 8 }}>
              {["REGION", "HUB", "VOLUME", "DIVERSION %"].map(h => (
                <span key={h} style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
              ))}
            </div>
            {hubs.map((hub, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 80px 80px", gap: 8, alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--border2)" }}>
                <span className="badge badge-success" style={{ width: "fit-content" }}>{hub.region}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{hub.name}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>{hub.volume}</span>
                <div>
                  <div style={{ fontSize: "0.82rem", color: hub.bar, fontWeight: 600, marginBottom: 4 }}>{hub.pct}%</div>
                  <div className="progress-bar" style={{ height: 3 }}>
                    <div className="progress-fill" style={{ width: `${hub.pct}%`, background: hub.bar }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
