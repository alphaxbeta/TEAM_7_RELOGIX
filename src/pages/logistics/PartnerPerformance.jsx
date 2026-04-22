import { useState } from "react";
import Topbar from "../../components/Topbar";

const providers = [
  { name: "Global Express Logistics", region: "EMEA Region", score: 98, status: "Excellent", statusClass: "badge-success", color: "#2ed57e", onTime: 98, dmgFree: 99.5, scanning: 96 },
  { name: "FastShip Int.", region: "North America", score: 84, status: "Needs Attention", statusClass: "badge-warning", color: "#ffa502", onTime: 82, dmgFree: 96, scanning: 88 },
  { name: "Pacific Cargo", region: "APAC Region", score: 92, status: "Good", statusClass: "badge-success", color: "#13daec", onTime: 94, dmgFree: 92, scanning: 98 },
];

const livePerf = [
  { hub: "New York Hub", carrier: "Express", vol: "2.4k", status: "#13daec" },
  { hub: "London Hub", carrier: "Freight", vol: "1.8k", status: "#13daec" },
  { hub: "Berlin Center", carrier: "Standard", vol: "3.1k", status: "#ffa502" },
  { hub: "Tokyo Main", carrier: "Express", vol: "4.2k", status: "#13daec" },
  { hub: "Singapore", carrier: "Freight", vol: "950", status: "#13daec" },
  { hub: "Sydney Port", carrier: "Standard", vol: "620", status: "var(--text3)" },
];

export default function PartnerPerformance() {
  const [view, setView] = useState("Overview");

  return (
    <div>
      <Topbar
        title="Partner Performance"
        subtitle="Real-time monitoring of 3PL providers and SLA adherence."
        actions={
          <div className="tabs">
            {["Overview", "North America", "EMEA", "APAC"].map(t => (
              <button key={t} className={`tab ${view === t ? "active" : ""}`} onClick={() => setView(t)}>{t}</button>
            ))}
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Global stats */}
        <div className="stats-grid">
          {[
            { label: "Total Volume", value: "12,450 units", change: "+12%", up: true },
            { label: "Global SLA Adherence", value: "98.2%", change: "Target Met", up: true },
            { label: "Avg. Transit Time", value: "3.2 days", change: "-0.4 days", up: true },
            { label: "Return Rate", value: "4.8%", change: "Stable", up: true },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: "1.3rem" }}>{s.value}</div>
              <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
          {/* Providers */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Top Providers</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem" }}>View All →</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {providers.map((p, i) => (
                <div key={i} className="card" style={{ borderLeft: `3px solid ${p.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 10, background: `${p.color}18`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                        {i === 0 ? "🌐" : i === 1 ? "🚀" : "🌊"}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{p.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>📍 {p.region}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className={`badge ${p.statusClass}`}>{p.status}</span>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: p.color }}>{p.score}</div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text3)" }}>Score</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                    {[["On-Time", p.onTime], ["Dmg Free", p.dmgFree], ["Scanning", p.scanning]].map(([label, val]) => (
                      <div key={label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{label}</span>
                          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: val >= 95 ? "#2ed57e" : val >= 85 ? "#ffa502" : "#ff4757" }}>{val}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${val}%`, background: val >= 95 ? "#2ed57e" : val >= 85 ? "#ffa502" : "#ff4757" }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Performance */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>Live Performance</h3>
              <button className="icon-btn" style={{ width: 28, height: 28 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/></svg>
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 20px", gap: 6, marginBottom: 8 }}>
              {["REGION", "VOL", ""].map(h => <span key={h} style={{ fontSize: "0.65rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>)}
            </div>
            {livePerf.map((l, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 50px 20px", gap: 6, alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--border2)" }}>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>{l.hub}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{l.carrier}</div>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{l.vol}</span>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.status, flexShrink: 0 }}></div>
              </div>
            ))}
            {/* Mini map */}
            <div style={{ marginTop: 12, background: "var(--bg3)", borderRadius: 8, height: 80, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)" }}>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.72rem" }}>🗺 LIVE MAP VIEW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
