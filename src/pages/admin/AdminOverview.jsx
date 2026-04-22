import Topbar from "../../components/Topbar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Pickups", value: "1,248", change: "+12% vs yesterday", up: true, badge: "Today" },
  { label: "In-Transit Returns", value: "342", change: "98% efficiency", up: true, badge: "Live" },
  { label: "Delayed Shipments", value: "14", change: "Requires Attention", up: false, badge: "Alert" },
  { label: "Recovery Value", value: "$1.24M", change: "+12.5% vs last month", up: true, badge: "MTD" },
];

const activity = [
  { icon: "📦", text: "Order #RX-9921 picked up from Warehouse B", time: "2m ago", color: "#13daec" },
  { icon: "⚠️", text: "Route Delay Alert — Heavy traffic on I-95 South", time: "15m ago", color: "#ffa502" },
  { icon: "✅", text: "Delivery Completed — Successfully delivered to Dock 4", time: "42m ago", color: "#2ed57e" },
  { icon: "🚚", text: "New Driver Assigned — J. Doe assigned to Route 55", time: "1h ago", color: "#13daec" },
  { icon: "📦", text: "Order #RX-9910 picked up from Warehouse A", time: "1h ago", color: "#13daec" },
  { icon: "✅", text: "Return Processed — Item #4401 restocked", time: "2h ago", color: "#2ed57e" },
];

const efficiencyData = [420, 680, 540, 820, 960, 720, 880];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AdminOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const maxVal = Math.max(...efficiencyData);

  return (
    <div>
      <Topbar
        title="Overview"
        subtitle={`Welcome back, ${user?.name}. Here's what's happening in your network today.`}
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export Report
            </button>
            <button className="btn btn-primary btn-sm">+ New Shipment</button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Stats */}
        <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span className="stat-label">{s.label}</span>
                <span className={`badge ${s.up ? "badge-success" : "badge-danger"}`}>{s.badge}</span>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.up ? "↑" : "↓"} {s.change}</div>
            </div>
          ))}
        </div>

        {/* Fleet Map + Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 24 }}>
          {/* Map Card */}
          <div className="card" style={{ minHeight: 360 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Live Fleet Tracking</h3>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="icon-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
                </button>
                <button className="icon-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                </button>
              </div>
            </div>
            {/* SVG Map visualization */}
            <div style={{
              background: "var(--bg3)", borderRadius: 10, height: 280,
              position: "relative", overflow: "hidden",
              border: "1px solid var(--border)",
            }}>
              <svg width="100%" height="100%" viewBox="0 0 600 280" style={{ position: "absolute", inset: 0 }}>
                {/* Grid lines */}
                {[...Array(8)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                ))}
                {[...Array(12)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                ))}
                {/* Route lines */}
                <path d="M80 200 Q180 80 300 140 Q400 180 520 60" stroke="rgba(19,218,236,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
                <path d="M120 240 Q250 160 380 200 Q460 220 540 160" stroke="rgba(19,218,236,0.2)" strokeWidth="1" fill="none" strokeDasharray="3 3"/>
                <path d="M60 120 Q160 200 280 180 Q360 160 460 220" stroke="rgba(46,213,126,0.2)" strokeWidth="1" fill="none" strokeDasharray="3 3"/>
                {/* Active vehicle */}
                <circle cx="300" cy="140" r="10" fill="rgba(19,218,236,0.2)" stroke="#13daec" strokeWidth="2">
                  <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="300" cy="140" r="5" fill="#13daec"/>
                {/* Other vehicles */}
                <circle cx="180" cy="80" r="5" fill="#2ed57e" opacity="0.8"/>
                <circle cx="180" cy="80" r="10" fill="rgba(46,213,126,0.2)" stroke="#2ed57e" strokeWidth="1">
                  <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="460" cy="190" r="5" fill="#ffa502" opacity="0.8"/>
              </svg>
              <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 16 }}>
                {[["#13daec", "Active"], ["#2ed57e", "On Schedule"], ["#ffa502", "Delayed"]].map(([c, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }}></div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text2)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Recent Activity</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem" }}>View All</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activity.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}18`, border: `1px solid ${a.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.85rem" }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.8rem", color: "var(--text)", lineHeight: 1.4 }}>{a.text}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 2 }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Efficiency Trends */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Efficiency Trends</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 2 }}>Comparing returns vs. pickups over time</p>
            </div>
            <div className="tabs">
              {["Week", "Month", "Quarter"].map((t, i) => (
                <button key={t} className={`tab ${i === 0 ? "active" : ""}`}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120 }}>
            {efficiencyData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%", background: i === 4 ? "var(--primary)" : "var(--primary-dim)",
                  borderRadius: "6px 6px 0 0", height: `${(v / maxVal) * 100}px`,
                  transition: "all 0.5s ease",
                  boxShadow: i === 4 ? "var(--primary-glow)" : "none",
                }}></div>
                <span style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{days[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>0 Pickups</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text2)" }}>Average: 840/day</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Max: 1500 Pickups</span>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 24 }}>
          {[
            { label: "Return Requests", value: "24 pending", path: "/admin/returns", color: "#13daec" },
            { label: "Hub Status", value: "2 alerts", path: "/business/hubs", color: "#ffa502" },
            { label: "Financial Recovery", value: "$1.24M", path: "/admin/finance", color: "#2ed57e" },
            { label: "Sustainability", value: "Score: 87", path: "/admin/sustainability", color: "#a78bfa" },
          ].map((q) => (
            <div
              key={q.label}
              className="card"
              style={{ cursor: "pointer", borderTop: `2px solid ${q.color}` }}
              onClick={() => navigate(q.path)}
            >
              <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginBottom: 4 }}>{q.label}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: q.color }}>{q.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
