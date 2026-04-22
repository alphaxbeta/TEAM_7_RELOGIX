import Topbar from "../../components/Topbar";

const segments = ["Request", "Inspected", "Approved", "Complete"];
const activeSegments = 3;

export default function RefundStatus() {
  return (
    <div>
      <Topbar title="Return #8392-AC" subtitle="Initiated on Oct 24, 2023"
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">Help</button>
            <button className="btn btn-primary btn-sm">Details</button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Hero */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 12px var(--primary)" }}></div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800 }}>Refund Approved</h1>
          </div>
          {/* Segmented progress */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 8 }}>
            {segments.map((s, i) => (
              <div key={i} style={{ height: 4, borderRadius: 2, background: i < activeSegments ? "var(--primary)" : "rgba(255,255,255,0.08)", boxShadow: i < activeSegments ? "0 0 8px rgba(19,218,236,0.4)" : "none" }}></div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {segments.map((s, i) => (
              <span key={i} style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, color: i === activeSegments - 1 ? "var(--primary)" : "var(--text3)" }}>{s}</span>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: "0.95rem", color: "var(--text2)", maxWidth: 640, lineHeight: 1.7 }}>
            We've processed your return. Your replacement has been shipped and the refund balance of{" "}
            <strong style={{ color: "var(--text)" }}>$142.00</strong> has been credited to your original payment method.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          {/* Left: Replacement tracking */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, background: "var(--bg3)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>📱</div>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: 8 }}>
                  <div className="live-dot" style={{ width: 6, height: 6 }}></div> In Transit
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 4 }}>Replacement iPhone 15 Pro</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text2)" }}>Titanium Black • 256GB</p>
              </div>
            </div>

            {/* Map */}
            <div style={{ background: "var(--bg3)", borderRadius: 12, height: 180, position: "relative", overflow: "hidden", border: "1px solid var(--border)", marginBottom: 16 }}>
              <svg width="100%" height="100%" viewBox="0 0 500 180">
                {[...Array(5)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*45} x2="500" y2={i*45} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                {[...Array(8)].map((_, i) => <line key={`v${i}`} x1={i*72} y1="0" x2={i*72} y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
                <path d="M50 150 Q200 80 340 110 Q420 130 460 60" stroke="rgba(19,218,236,0.4)" strokeWidth="2" fill="none"/>
                <circle cx="340" cy="110" r="8" fill="rgba(19,218,236,0.3)" stroke="#13daec" strokeWidth="2">
                  <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="340" cy="110" r="4" fill="#13daec"/>
                {/* Progress on map */}
                <rect x="50" y="155" width="290" height="3" rx="2" fill="rgba(255,255,255,0.08)"/>
                <rect x="50" y="155" width="193" height="3" rx="2" fill="#13daec" style={{ filter: "drop-shadow(0 0 4px #13daec)" }}/>
              </svg>
              <div style={{ position: "absolute", bottom: 10, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.65rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Current Location</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Memphis, TN</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text2)" }}>Departed Facility • 8:42 AM</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Estimated Arrival</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Tomorrow</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text2)" }}>by 8:00 PM</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--border2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--text2)" }}>
                <span>🚚</span> FedEx: 7822-0192-9921
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 4 }}>
                Track shipment →
              </button>
            </div>
          </div>

          {/* Right: Summary + Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Refund summary */}
            <div className="card" style={{ borderTop: "2px solid var(--primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>Refund Summary</h3>
                  <div style={{ fontSize: "0.78rem", color: "var(--primary)", marginTop: 2 }}>Processing complete</div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary-dim)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>$</div>
              </div>
              {[
                { label: "Item Value", value: "$1,199.00" },
                { label: "Tax (8.5%)", value: "$101.92" },
                { label: "Restocking Fee", value: "-$0.00", color: "#ff4757" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--text2)" }}>{r.label}</span>
                  <span style={{ color: r.color || "var(--text)" }}>{r.value}</span>
                </div>
              ))}
              <div className="divider"></div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600 }}>Total Refund</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800 }}>$1,300.92</span>
              </div>
              <div style={{ background: "var(--bg3)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <div style={{ width: 36, height: 24, background: "rgba(255,255,255,0.1)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>💳</div>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>Apple Pay</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text2)" }}>Chase Sapphire •••• 4242</div>
                </div>
                <div style={{ marginLeft: "auto", color: "var(--primary)" }}>✓</div>
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Support Actions</div>
              <button className="btn btn-ghost" style={{ width: "100%", marginBottom: 8 }}>📋 Download Receipt</button>
              <button className="btn btn-ghost" style={{ width: "100%" }}>💬 Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
