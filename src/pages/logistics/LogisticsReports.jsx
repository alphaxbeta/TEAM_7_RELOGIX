import Topbar from "../../components/Topbar";

const anomalies = [
  { id: "TRK-9821-X", origin: "Berlin, DE", carrier: "DHL Express", status: "Customs Hold", statusClass: "badge-danger", delay: "+4 Days", cost: "$142.50" },
  { id: "TRK-3310-A", origin: "Tokyo, JP", carrier: "FedEx Intl", status: "Address Issue", statusClass: "badge-warning", delay: "+2 Days", cost: "$89.00" },
  { id: "TRK-4421-B", origin: "Mumbai, IN", carrier: "UPS Express", status: "Damaged", statusClass: "badge-danger", delay: "+1 Day", cost: "$210.00" },
];

const transitData = [3.8, 3.6, 3.9, 4.2, 3.7, 3.4, 3.6, 3.8, 4.1, 3.5, 3.3, 3.2];
const months = ["Aug 01","Aug 05","Aug 10","Aug 15","Aug 20","Aug 25","Aug 30"];

export default function LogisticsReports() {
  const maxTransit = Math.max(...transitData);
  const minTransit = Math.min(...transitData);

  return (
    <div>
      <Topbar
        title="Logistics Analytics & Reports"
        subtitle="Real-time performance analytics • Last updated: 14:02 PM"
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">📅 Last 30 Days</button>
            <button className="btn btn-ghost btn-sm">🌎 All Regions ▾</button>
            <button className="btn btn-ghost btn-sm">🚚 All Carriers ▾</button>
            <button className="btn btn-primary btn-sm">↓</button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "Total Freight Cost", value: "$482,920", change: "↑ +2.4%", up: false, icon: "💰" },
            { label: "Avg. Transit Time", value: "3.2 Days", change: "↓ -0.8 days", up: true, icon: "⏱" },
            { label: "Active Shipments", value: "1,248", change: "— 0.0%", up: true, icon: "📦" },
            { label: "Exceptions", value: "14", change: "↑ +2 · Requires attention", up: false, icon: "⚠️" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="stat-label">{s.label}</span>
                <span>{s.icon}</span>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, marginBottom: 24 }}>
          {/* Transit Time Trends */}
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 4 }}>Transit Time Trends</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text2)" }}>Comparing Inbound vs Outbound speed (30 Days)</p>
            </div>
            <div style={{ position: "relative", height: 180 }}>
              <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
                {/* Y-axis labels */}
                {[5, 4, 3, 2, 1].map((v, i) => (
                  <text key={i} x="0" y={i * 36 + 10} fill="var(--text3)" fontSize="10">{v}d</text>
                ))}
                {/* Grid */}
                {[0, 36, 72, 108, 144, 180].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                ))}
                {/* Line (smooth) */}
                <polyline
                  points={transitData.map((v, i) => `${25 + (i / (transitData.length - 1)) * 560},${180 - ((v - minTransit) / (maxTransit - minTransit)) * 140 - 10}`).join(" ")}
                  fill="none" stroke="#13daec" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                />
                {/* Fill */}
                <polygon
                  points={[
                    ...transitData.map((v, i) => `${25 + (i / (transitData.length - 1)) * 560},${180 - ((v - minTransit) / (maxTransit - minTransit)) * 140 - 10}`),
                    `${25 + 560},180`, `25,180`
                  ].join(" ")}
                  fill="url(#transitGrad)" opacity="0.3"
                />
                <defs>
                  <linearGradient id="transitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#13daec" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#13daec" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Dashed reference line */}
                <line x1="25" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                {months.map(m => <span key={m} style={{ fontSize: "0.68rem", color: "var(--text3)" }}>{m}</span>)}
              </div>
            </div>
          </div>

          {/* Cost by Carrier */}
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>Cost by Carrier</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, marginBottom: 16 }}>
              {[
                { carrier: "UPS", val: 90, color: "#13daec" },
                { carrier: "FedEx", val: 75, color: "#a78bfa" },
                { carrier: "DHL", val: 55, color: "#6366f1" },
                { carrier: "Other", val: 30, color: "var(--bg4)" },
              ].map((c, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: "100%", borderRadius: "6px 6px 0 0", height: `${c.val}%`, background: c.color, transition: "height 0.5s" }}></div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text2)" }}>{c.carrier}</span>
                </div>
              ))}
            </div>
            <div className="divider"></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>Projected Savings</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--success)" }}>+$12,450</span>
            </div>
          </div>
        </div>

        {/* Anomalies & Delays */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--danger-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1rem" }}>❗</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Anomalies & Delays</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text2)" }}>Shipments exceeding standard deviation (&gt;2σ)</p>
              </div>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem", fontWeight: 600 }}>VIEW ALL</button>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Tracking ID</th><th>Origin</th><th>Carrier</th><th>Status</th><th>Delay Time</th><th>Cost Impact</th>
                </tr>
              </thead>
              <tbody>
                {anomalies.map((a, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: "monospace", color: "var(--primary)", fontSize: "0.8rem" }}>🏷 {a.id}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 4, background: "var(--bg4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>🌐</div>
                        {a.origin}
                      </div>
                    </td>
                    <td>{a.carrier}</td>
                    <td><span className={`badge ${a.statusClass}`}>{a.status}</span></td>
                    <td style={{ color: "var(--danger)", fontWeight: 600 }}>{a.delay}</td>
                    <td>{a.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
