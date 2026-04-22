import { useState } from "react";
import Topbar from "../../components/Topbar";

const chartData = [
  { month: "Jul", gain: 55, loss: 18 },
  { month: "Aug", gain: 72, loss: 22 },
  { month: "Sep", gain: 68, loss: 20 },
  { month: "Oct", gain: 95, loss: 12 },
  { month: "Nov", gain: 30, loss: 8 },
];

const recentActivity = [
  { name: "iPhone 14 Pro ...", type: "Refurbished Sale", value: "+$850", time: "2m ago", up: true },
  { name: "MacBook Air M2", type: "Parts Harvesting", value: "+$320", time: "14m ago", up: true },
  { name: 'Dell Monitor 27"', type: "Recycled (Loss)", value: "-$45", time: "1h ago", up: false },
  { name: "iPad Air 5", type: "Restocked B-Stock", value: "+$410", time: "2h ago", up: true },
];

export default function FinanceDashboard() {
  const [period, setPeriod] = useState("Monthly");
  const maxGain = Math.max(...chartData.map(d => d.gain));

  return (
    <div>
      <Topbar
        title="Financial Recovery"
        subtitle="Overview of Q3 Reverse Logistics Performance"
        actions={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div className="tabs">
              {["Monthly", "Quarterly", "Yearly"].map(t => (
                <button key={t} className={`tab ${period === t ? "active" : ""}`} onClick={() => setPeriod(t)}>{t}</button>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Oct 2023
            </button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "Total Recovered Value", value: "$1,245,000", change: "↑ 12.5% vs last month", up: true },
            { label: "Outstanding Loss", value: "$84,320", change: "↑ 2.1% Write-off increase", up: false },
            { label: "Recovery Efficiency", value: "94.2%", change: "+1.4% efficiency gain", up: true },
            { label: "Volume Processed", value: "12,405 units", change: "IP DL HP", up: true },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Chart + Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginBottom: 24 }}>
          {/* Loss vs Gain Chart */}
          <div className="card">
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 4 }}>Loss vs Gain Analysis</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text2)" }}>Net recovered value against operational write-offs</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              {[["#13daec", "Gain (Recovered)"], ["#ff4757", "Loss (Written Off)"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }}></div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text2)" }}>{l}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 20, height: 180, padding: "0 10px" }}>
              {chartData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: "100%", display: "flex", gap: 4, alignItems: "flex-end", justifyContent: "center" }}>
                    <div style={{
                      width: "42%", height: `${(d.gain / maxGain) * 160}px`,
                      background: d.month === "Oct" ? "#13daec" : "rgba(19,218,236,0.3)",
                      borderRadius: "4px 4px 0 0",
                      boxShadow: d.month === "Oct" ? "0 0 16px rgba(19,218,236,0.4)" : "none",
                    }}></div>
                    <div style={{
                      width: "42%", height: `${(d.loss / maxGain) * 160}px`,
                      background: "rgba(255,71,87,0.6)", borderRadius: "50% 50% 0 0",
                    }}></div>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: d.month === "Oct" ? "var(--primary)" : "var(--text3)", fontWeight: d.month === "Oct" ? 600 : 400 }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Recent Activity</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem" }}>View All</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recentActivity.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "var(--bg3)", borderRadius: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${a.up ? "#13daec" : "#ff4757"}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={a.up ? "#13daec" : "#ff4757"} strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>{a.name}</div>
                    <div style={{ fontSize: "0.75rem", color: a.up ? "var(--primary)" : "var(--danger)" }}>{a.type}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: a.up ? "var(--success)" : "var(--danger)" }}>{a.value}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "ASSET TURNOVER", value: "14.2 Days", icon: "⟳" },
            { label: "CO2 SAVED", value: "4.5 Tons", icon: "🌱" },
            { label: "ACTIVE BATCHES", value: "24", icon: "◈" },
          ].map((m, i) => (
            <div key={i} className="stat-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div className="stat-label">{m.label}</div>
                <div className="stat-value" style={{ fontSize: "1.4rem" }}>{m.value}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--primary-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{m.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
