import Topbar from "../../components/Topbar";

const steps = [
  { icon: "📦", label: "Request", time: "10:42 AM", done: true },
  { icon: "🚗", label: "En Route", time: "Now", active: true },
  { icon: "🏠", label: "Pickup", time: "Est. 2:30 PM", done: false },
  { icon: "🏭", label: "Warehouse", time: "Pending", done: false },
];

export default function PickupTracking() {
  return (
    <div>
      <Topbar title="Pickup Tracking" subtitle="Order #89302-RL" />

      <div className="page-content fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
          {/* Left: Map + Status */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Live status card */}
            <div className="card">
              <div style={{ display: "flex", justify: "space-between", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div className="live-dot"></div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live Status</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300, marginBottom: 4 }}>Driver En Route</h2>
                  <p style={{ color: "var(--text2)" }}>Arriving in approximately <strong style={{ color: "var(--text)" }}>15 minutes</strong></p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text2)", textTransform: "uppercase", marginBottom: 4 }}>Order ID</div>
                  <div style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: 600, color: "var(--primary)" }}>#89302-RL</div>
                </div>
              </div>

              {/* Map */}
              <div style={{ background: "var(--bg3)", borderRadius: 14, height: 260, position: "relative", overflow: "hidden", border: "1px solid var(--border)", marginBottom: 24 }}>
                <svg width="100%" height="100%" viewBox="0 0 600 260">
                  {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*40} x2="600" y2={i*40} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                  {[...Array(10)].map((_, i) => <line key={`v${i}`} x1={i*67} y1="0" x2={i*67} y2="260" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                  <circle cx="300" cy="130" r="20" fill="rgba(19,218,236,0.08)">
                    <animate attributeName="r" values="20;40;20" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="300" cy="130" r="14" fill="var(--primary)" opacity="0.9"/>
                  <text x="300" y="135" textAnchor="middle" fill="#0a1a1f" fontSize="12" fontWeight="bold">🚗</text>
                  <path d="M100 200 Q200 100 300 130 Q400 160 500 80" stroke="rgba(19,218,236,0.4)" strokeWidth="2" fill="none" strokeDasharray="8 4"/>
                </svg>
                <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.8rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                  Main St & 4th Ave
                </div>
              </div>

              {/* Progress steps */}
              <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ position: "absolute", top: "50%", left: 20, right: 20, height: 2, background: "var(--bg3)", transform: "translateY(-50%)" }}></div>
                <div style={{ position: "absolute", top: "50%", left: 20, height: 2, background: "var(--primary)", transform: "translateY(-50%)", width: "35%", boxShadow: "0 0 8px rgba(19,218,236,0.5)" }}></div>
                {steps.map((s, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 1, position: "relative" }}>
                    <div style={{
                      width: s.active ? 44 : 36, height: s.active ? 44 : 36,
                      borderRadius: "50%",
                      background: s.active ? "var(--primary)" : s.done ? "var(--bg2)" : "var(--bg3)",
                      border: `2px solid ${s.active ? "var(--primary)" : s.done ? "var(--primary)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: s.active ? "1.1rem" : "0.9rem",
                      boxShadow: s.active ? "0 0 20px rgba(19,218,236,0.4)" : "none",
                      transition: "all 0.2s",
                    }}>{s.icon}</div>
                    <div style={{ marginTop: 4, textAlign: "center" }}>
                      <div style={{ fontSize: "0.78rem", fontWeight: s.active ? 600 : 400, color: s.active ? "var(--primary)" : s.done ? "var(--text)" : "var(--text3)" }}>{s.label}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text3)" }}>{s.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Driver + Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Driver card */}
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), #0fa8b8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", border: "2px solid var(--border)" }}>👨</div>
                  <div style={{ position: "absolute", bottom: 2, right: 2, width: 12, height: 12, background: "#2ed57e", borderRadius: "50%", border: "2px solid var(--bg2)" }}></div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Michael S.</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--text2)" }}>
                    <span style={{ color: "#ffa502" }}>★</span> 4.9 • Swift Logistics
                  </div>
                </div>
              </div>
              <div style={{ background: "var(--bg3)", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🚚</span>
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase" }}>Vehicle</div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>Blue Ford Transit</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase" }}>Plate</div>
                  <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600 }}>8X-293L</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button className="btn btn-ghost">💬 Message</button>
                <button className="btn btn-ghost">📞 Call</button>
              </div>
            </div>

            {/* Pickup details */}
            <div className="card" style={{ flex: 1 }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>Pickup Details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "🕐", label: "Time Slot", value: "2:00 PM - 4:00 PM", sub: "Today, Oct 24" },
                  { icon: "📍", label: "Location", value: "Home", sub: "123 Marina Blvd, Apt 4B\nSan Francisco, CA 94123" },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{d.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginBottom: 2 }}>{d.label}</div>
                      <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{d.value}</div>
                      {d.sub && <div style={{ fontSize: "0.78rem", color: "var(--text3)", whiteSpace: "pre-line" }}>{d.sub}</div>}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>💻</div>
                  <div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginBottom: 6 }}>Items</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {['MacBook Pro 16"', "Magic Mouse"].map(item => (
                        <span key={item} style={{ padding: "4px 10px", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 20, fontSize: "0.75rem" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--border)", marginTop: 20 }}>
                <button className="btn btn-ghost" style={{ width: "100%", marginBottom: 8, fontSize: "0.8rem" }}>Need help? Visit Support Center</button>
                <button style={{ width: "100%", padding: "10px", background: "none", border: "none", cursor: "pointer", color: "var(--danger)", fontSize: "0.82rem" }}>Cancel Pickup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
