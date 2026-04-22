import { useState } from "react";
import Topbar from "../../components/Topbar";

const shipmentEvents = [
  { status: "Out for Delivery", location: "Austin, TX", driver: "Michael B.", note: "Package on vehicle. Estimated arrival by 4:00 PM.", tag: "CURRENT", time: "Updated 24 mins ago", color: "#13daec" },
  { status: "Hub Arrival - Austin Distribution Center", location: "Austin, TX", tags: ["Scanned", "Zone B-4"], time: "08:45 AM", color: "#2ed57e" },
  { status: "Departed Regional Facility", location: "Dallas Fort Worth, TX", tags: [], time: "Yesterday, 11:30 PM", color: "var(--text3)" },
  { status: "Picked Up by Carrier", location: "San Francisco, CA", tags: [], time: "Oct 24, 14:28 PM", color: "var(--text3)" },
];

export default function ShipmentTracking() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Topbar
        title="Shipment Tracking & Hub Transfers"
        subtitle="Real-time shipment visibility across all hubs"
        actions={
          <div style={{ position: "relative" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="input" placeholder="Search Tracking ID, Hub, or Driver..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 34, width: 280, padding: "8px 12px 8px 34px" }}
            />
          </div>
        }
      />

      <div className="page-content fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
          {/* Main shipment detail */}
          <div>
            {/* Shipment header */}
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>#TRK-99283</h2>
                    <span className="badge badge-primary">Priority Return</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: "0.875rem", color: "var(--text2)" }}>
                    <span>📦 Apple MacBook Pro 16" (M3 Max)</span>
                    <span>• 4.5kg</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase", marginBottom: 4 }}>Estimated Delivery</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700 }}>Today, 14:00 – 16:00</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
                    <svg viewBox="0 0 36 36" width="36" height="36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--bg3)" strokeWidth="4"/>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#13daec" strokeWidth="4"
                        strokeDasharray={`${0.8 * 100} 100`} strokeLinecap="round"
                        transform="rotate(-90 18 18)"/>
                    </svg>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>80%</span>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div style={{ display: "flex", gap: 32, fontSize: "0.875rem" }}>
                <div>
                  <div style={{ color: "var(--text3)", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: 4 }}>Origin</div>
                  <div style={{ fontWeight: 500 }}>San Francisco, CA</div>
                </div>
                <div>
                  <div style={{ color: "var(--text3)", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: 4 }}>Destination</div>
                  <div style={{ fontWeight: 500 }}>Austin, TX</div>
                </div>
                <div>
                  <div style={{ color: "var(--text3)", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: 4 }}>Carrier</div>
                  <div style={{ fontWeight: 500, color: "var(--primary)" }}>FedEx Express</div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}>View Full Details →</button>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative", paddingLeft: 40 }}>
              {/* Vertical line */}
              <div style={{ position: "absolute", left: 15, top: 20, bottom: 20, width: 2, background: "var(--border)" }}></div>
              {shipmentEvents.map((ev, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 16 }}>
                  <div style={{ position: "absolute", left: -32, top: 14, width: 16, height: 16, borderRadius: "50%", background: i === 0 ? "#13daec" : i === 1 ? "#2ed57e" : "var(--bg3)", border: `2px solid ${i < 2 ? ev.color : "var(--border)"}`, zIndex: 1 }}>
                    {i === 0 && <div style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "2px solid rgba(19,218,236,0.3)", animation: "none" }}></div>}
                  </div>
                  <div className="card" style={{ borderLeft: i === 0 ? `3px solid ${ev.color}` : "none", padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{ev.status}</div>
                        {ev.tag && <span className="badge badge-primary" style={{ fontSize: "0.65rem" }}>{ev.tag}</span>}
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{ev.time}</span>
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text2)", marginBottom: 6 }}>{ev.location}</div>
                    {ev.driver && <div style={{ fontSize: "0.82rem", color: "var(--text2)" }}>Driver: {ev.driver}</div>}
                    {ev.note && <div style={{ fontSize: "0.82rem", color: "var(--text2)", marginTop: 6 }}>{ev.note}</div>}
                    {ev.driver && (
                      <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>Contact Driver</button>
                    )}
                    {ev.tags && ev.tags.length > 0 && (
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        {ev.tags.map(t => <span key={t} className="badge badge-success" style={{ fontSize: "0.65rem" }}>{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Map */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ background: "var(--bg3)", height: 220, position: "relative" }}>
                <svg width="100%" height="100%" viewBox="0 0 300 220">
                  {[...Array(6)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*44} x2="300" y2={i*44} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                  {[...Array(6)].map((_, i) => <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="220" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                  <path d="M50 180 Q120 100 180 130 Q230 150 260 80" stroke="rgba(19,218,236,0.4)" strokeWidth="2" fill="none"/>
                  <circle cx="180" cy="130" r="8" fill="rgba(19,218,236,0.2)" stroke="#13daec" strokeWidth="2">
                    <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="180" cy="130" r="4" fill="#13daec"/>
                </svg>
                <div style={{ position: "absolute", bottom: 10, left: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div className="live-dot" style={{ width: 6, height: 6 }}></div>
                    <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 600 }}>LIVE LOCATION</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>East 6th St, Austin</div>
                </div>
              </div>
            </div>

            {/* Management Actions */}
            <div className="card">
              <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Management Actions</div>
              {[
                { icon: "⚠️", label: "Flag Issue", color: "#ff4757" },
                { icon: "📍", label: "Reroute Package", color: "#13daec" },
                { icon: "📋", label: "Proof of Delivery", sub: "Pending", color: "#2ed57e" },
              ].map((a, i) => (
                <button key={i} className="card" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", marginBottom: 8, cursor: "pointer", border: `1px solid ${a.color}20`, textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span>{a.icon}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{a.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {a.sub && <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{a.sub}</span>}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>
              ))}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 0", borderTop: "1px solid var(--border)" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text2)" }}>System Status</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div className="live-dot"></div>
                  <span style={{ fontSize: "0.78rem", color: "var(--success)" }}>Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
