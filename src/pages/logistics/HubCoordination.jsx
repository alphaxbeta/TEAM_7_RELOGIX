import { useState } from "react";
import Topbar from "../../components/Topbar";

const hubs = [
  { id: "MW-01", name: "Chicago Hub", region: "Midwest", status: "Critical", statusClass: "badge-danger", capacity: 85, processing: "1,240/hr", backlog: "4.2k", color: "#ff4757" },
  { id: "WC-04", name: "Nevada Hub", region: "West", status: "Optimal", statusClass: "badge-success", capacity: 42, processing: "3,100/hr", backlog: "None", color: "#2ed57e" },
  { id: "SC-02", name: "Austin Hub", region: "South", status: "Available", statusClass: "badge-primary", capacity: 12, processing: "890/hr", backlog: "Low", color: "#13daec" },
  { id: "EC-09", name: "New York Hub", region: "East", status: "Heavy", statusClass: "badge-warning", capacity: 68, processing: "2,450/hr", backlog: "Medium", color: "#ffa502" },
  { id: "WC-02", name: "Seattle Hub", region: "West", status: "Optimal", statusClass: "badge-success", capacity: 35, processing: "1,800/hr", backlog: "None", color: "#2ed57e" },
];

const queue = [
  { id: "#R-9920", time: "2m ago", type: "Electronics - Mixed", items: 450, weight: "120kg" },
  { id: "#R-9921", time: "15m ago", type: "Apparel - Seasonal", items: 1200, weight: "800kg" },
  { id: "#R-9924", time: "42m ago", type: "Home Goods - Fragile", items: 30, weight: "500kg" },
  { id: "#R-9928", time: "1h ago", type: "Accessories - Bulk", items: 5000, weight: "200kg" },
  { id: "#R-9930", time: "2h ago", type: "Mixed Media", items: 150, weight: "40kg" },
];

const weekDays = ["Mon", "Tue", "Today", "Thu", "Fri", "Sat", "Sun"];

export default function HubCoordination() {
  const [regionFilter, setRegionFilter] = useState("All Regions");

  const filteredHubs = regionFilter === "All Regions" ? hubs : hubs.filter(h => h.region === regionFilter);

  return (
    <div>
      <Topbar
        title="Hub Coordination Center"
        subtitle="Manage return flow, monitor capacity, and allocate batches in real-time."
        actions={
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "78%", sub: "SYSTEM CAP.", sub2: "Healthy", color: "#2ed57e" },
                { label: "14", sub: "UNASSIGNED", sub2: "Batches", color: "#ffa502" },
                { label: "2", sub: "CRITICAL HUBS", sub2: "Alerts", color: "#ff4757" },
              ].map((s, i) => (
                <div key={i} style={{ background: "var(--bg3)", border: `1px solid ${s.color}30`, borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: s.color }}>{s.label}</div>
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.sub}</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{s.sub2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <div className="page-content fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
          {/* Queue */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="live-dot"></div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>Incoming Queue</h3>
              </div>
              <span className="badge badge-gray">14 items</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {queue.map((q, i) => (
                <div key={i} className="card" style={{ padding: "12px 14px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>{q.id}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{q.time}</span>
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: 6 }}>{q.type}</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text2)" }}>📦 {q.items} items</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text2)" }}>⚖ {q.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hubs */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div className="tabs">
                {["All Regions", "West Coast", "East Coast", "Midwest"].map(r => (
                  <button key={r} className={`tab ${regionFilter === r ? "active" : ""}`} onClick={() => setRegionFilter(r)}>{r}</button>
                ))}
              </div>
              <button className="btn btn-ghost btn-sm">Sort by: Capacity</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {filteredHubs.map((hub, i) => (
                <div key={i} className="card" style={{ borderTop: `2px solid ${hub.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${hub.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hub.color} strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{hub.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text2)" }}>{hub.region} • ID: {hub.id}</div>
                      </div>
                    </div>
                    <span className={`badge ${hub.statusClass}`}>{hub.status}</span>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: "0.78rem", color: "var(--text2)" }}>Capacity Usage</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: hub.color }}>{hub.capacity}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${hub.capacity}%`, background: hub.color }}></div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ background: "var(--bg3)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: "0.65rem", color: "var(--text3)", textTransform: "uppercase", marginBottom: 2 }}>Processing</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{hub.processing}</div>
                    </div>
                    <div style={{ background: "var(--bg3)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: "0.65rem", color: "var(--text3)", textTransform: "uppercase", marginBottom: 2 }}>Backlog</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{hub.backlog}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Forecast */}
            <div className="card" style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>Weekly Capacity Forecast</h3>
                <div style={{ display: "flex", gap: 12 }}>
                  {[["#13daec", "Actual"], ["rgba(255,255,255,0.3)", "Projected"]].map(([c, l]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }}></div>
                      <span style={{ fontSize: "0.72rem", color: "var(--text2)" }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                {[60, 75, 82, 70, 88, 65, 72].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: "100%", background: i === 2 ? "var(--primary)" : i > 2 ? "rgba(255,255,255,0.1)" : "var(--primary-dim)", borderRadius: "4px 4px 0 0", height: `${v * 0.7}px`, boxShadow: i === 2 ? "var(--primary-glow)" : "none" }}></div>
                    <span style={{ fontSize: "0.68rem", color: i === 2 ? "var(--primary)" : "var(--text3)", fontWeight: i === 2 ? 600 : 400 }}>{weekDays[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
