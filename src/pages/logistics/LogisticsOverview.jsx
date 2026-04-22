import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";

const activity = [
  { icon: "📦", text: "Order #RX-9921 picked up from Warehouse B", time: "2m ago", color: "#13daec" },
  { icon: "⚠️", text: "Route Delay Alert — Heavy traffic on I-95 South", time: "15m ago", color: "#ffa502" },
  { icon: "✅", text: "Delivery Completed — Dock 4", time: "42m ago", color: "#2ed57e" },
  { icon: "🚚", text: "New Driver Assigned — J. Doe to Route 55", time: "1h ago", color: "#13daec" },
  { icon: "📦", text: "Order #RX-9910 picked up from Warehouse A", time: "1h ago", color: "#13daec" },
  { icon: "✅", text: "Return Processed — Item #4401 restocked", time: "2h ago", color: "#2ed57e" },
];

const weekData = [420, 680, 540, 820, 960, 720, 880];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function LogisticsOverview() {
  const navigate = useNavigate();
  const maxVal = Math.max(...weekData);

  return (
    <div>
      <Topbar
        title="Overview"
        subtitle="Welcome back, Alex. Here's what's happening in your network today."
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">↓ Export Report</button>
            <button className="btn btn-primary btn-sm">+ New Shipment</button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Stats */}
        <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { label: "Total Pickups", value: "1,248", change: "↑ +12% vs. yesterday", up: true, badge: "Today", badgeClass: "badge-success" },
            { label: "In-Transit Returns", value: "342", change: "On Schedule — 98% efficiency", up: true, badge: "Live", badgeClass: "badge-primary" },
            { label: "Delayed Shipments", value: "14", change: "⚠ Requires Attention", up: false, badge: "Alert", badgeClass: "badge-danger" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="stat-label">{s.label}</span>
                <span className={`badge ${s.badgeClass}`}>{s.badge}</span>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Fleet Map + Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 24 }}>
          <div className="card" style={{ minHeight: 340 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Live Fleet Tracking</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="icon-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg></button>
                <button className="icon-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg></button>
              </div>
            </div>
            <div style={{ background: "var(--bg3)", borderRadius: 10, height: 260, position: "relative", overflow: "hidden", border: "1px solid var(--border)" }}>
              <svg width="100%" height="100%" viewBox="0 0 600 260">
                {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*40} x2="600" y2={i*40} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                {[...Array(11)].map((_, i) => <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                <path d="M80 200 Q180 80 300 130 Q400 170 520 60" stroke="rgba(19,218,236,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
                <path d="M120 230 Q250 150 380 190 Q460 210 540 150" stroke="rgba(19,218,236,0.2)" strokeWidth="1" fill="none" strokeDasharray="3 3"/>
                <circle cx="300" cy="130" r="10" fill="rgba(19,218,236,0.2)" stroke="#13daec" strokeWidth="2"><animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="300" cy="130" r="5" fill="#13daec"/>
                <circle cx="180" cy="80" r="5" fill="#2ed57e" opacity="0.9"/>
                <circle cx="180" cy="80" r="10" fill="rgba(46,213,126,0.15)" stroke="#2ed57e" strokeWidth="1"><animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite"/></circle>
                <circle cx="460" cy="190" r="5" fill="#ffa502" opacity="0.9"/>
              </svg>
              <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", gap: 14 }}>
                {[["#13daec","Active"],["#2ed57e","On Schedule"],["#ffa502","Delayed"]].map(([c,l]) => (
                  <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:8,height:8,borderRadius:"50%",background:c }}></div>
                    <span style={{ fontSize:"0.7rem",color:"var(--text2)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1rem" }}>Recent Activity</h3>
              <button style={{ background:"none", border:"none", cursor:"pointer", color:"var(--primary)", fontSize:"0.8rem" }}>View All</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {activity.map((a, i) => (
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ width:30,height:30,borderRadius:8,background:`${a.color}18`,border:`1px solid ${a.color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"0.8rem" }}>{a.icon}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:"0.78rem", color:"var(--text)", lineHeight:1.4 }}>{a.text}</p>
                    <p style={{ fontSize:"0.7rem", color:"var(--text3)", marginTop:2 }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Efficiency Trends */}
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1rem" }}>Efficiency Trends</h3>
              <p style={{ fontSize:"0.8rem", color:"var(--text2)", marginTop:2 }}>Comparing returns vs. pickups over time</p>
            </div>
            <div className="tabs">
              {["Week","Month","Quarter"].map((t,i)=>(
                <button key={t} className={`tab ${i===0?"active":""}`}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:100 }}>
            {weekData.map((v,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ width:"100%", background:i===4?"var(--primary)":"var(--primary-dim)", borderRadius:"5px 5px 0 0", height:`${(v/maxVal)*90}px`, boxShadow:i===4?"var(--primary-glow)":"none" }}></div>
                <span style={{ fontSize:"0.7rem", color:"var(--text3)" }}>{days[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
            <span style={{ fontSize:"0.72rem", color:"var(--text3)" }}>0 Pickups</span>
            <span style={{ fontSize:"0.72rem", color:"var(--text2)" }}>Average: 840/day</span>
            <span style={{ fontSize:"0.72rem", color:"var(--text3)" }}>Max: 1500 Pickups</span>
          </div>
        </div>
      </div>
    </div>
  );
}
