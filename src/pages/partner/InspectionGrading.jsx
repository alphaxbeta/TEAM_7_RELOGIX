import { useState } from "react";
import Topbar from "../../components/Topbar";

export default function InspectionGrading() {
  const [screenScore, setScreenScore] = useState(8);
  const [housingScore, setHousingScore] = useState(9);
  const [connectivity, setConnectivity] = useState(false);
  const [cameras, setCameras] = useState(true);
  const [faceId, setFaceId] = useState(true);
  const [audio, setAudio] = useState(true);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Math.round(((screenScore + housingScore) / 20 * 60) + (connectivity ? 10 : 0) + (cameras ? 10 : 0) + (faceId ? 10 : 0) + (audio ? 10 : 0));
  const grade = totalScore >= 90 ? "A+" : totalScore >= 80 ? "A-" : totalScore >= 70 ? "B+" : totalScore >= 60 ? "B" : "C";
  const gradeLabel = totalScore >= 80 ? "Excellent Condition" : totalScore >= 65 ? "Good Condition" : "Fair Condition";
  const gradeColor = totalScore >= 80 ? "#2ed57e" : totalScore >= 65 ? "#13daec" : "#ffa502";

  const baseValue = 720;
  const deductions = (!connectivity ? 70 : 0) + (screenScore < 7 ? 50 : 0) + (housingScore < 7 ? 30 : 0);
  const estimatedValue = baseValue - deductions;

  return (
    <div>
      <Topbar
        title="Product Inspection & Grading"
        subtitle="Inspection Station #04 — Service Partner Portal"
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">Queue (12)</button>
            <button className="btn btn-ghost btn-sm">History</button>
            <button className="btn btn-ghost btn-sm">Settings</button>
          </div>
        }
      />

      <div className="page-content fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 220px", gap: 20 }}>
          {/* Left: Product */}
          <div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <div style={{ background: "linear-gradient(135deg, var(--bg3), var(--bg4))", height: 200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>📱</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px", background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>iPhone 14 Pro Max</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>Space Black • 256GB</div>
                </div>
                <div style={{ position: "absolute", top: 10, right: 10 }}>
                  <span className="badge badge-warning">Awaiting Inspection</span>
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                {[
                  { label: "SKU", value: "APL-14PM-BLK" },
                  { label: "Serial No.", value: "H892KJS922", valueColor: "var(--primary)" },
                  { label: "Received", value: "Oct 24, 09:41 AM" },
                  { label: "Origin", value: "RMA #88219" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid var(--border2)" : "none" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{f.label}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 500, color: f.valueColor || "var(--text)", fontFamily: f.label === "Serial No." ? "monospace" : "inherit" }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Assessment */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Condition Assessment</h3>
            </div>

            {/* Sliders */}
            {[
              { label: "Screen Condition", score: screenScore, setScore: setScreenScore, min: "CRACKED", mid1: "HEAVY SCRATCH", mid2: "MICRO SCRATCH", max: "MINT" },
              { label: "Housing / Bezel", score: housingScore, setScore: setHousingScore, min: "DENTED", mid1: "SCUFFED", mid2: "MINOR WEAR", max: "FLAWLESS" },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--primary)" }}>{s.score}/10</span>
                </div>
                <input
                  type="range" min="1" max="10" value={s.score}
                  onChange={e => s.setScore(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--primary)", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  {[s.min, s.mid1, s.mid2, s.max].map(l => (
                    <span key={l} style={{ fontSize: "0.6rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{l}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Toggle checks */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Connectivity", val: connectivity, set: setConnectivity, icon: "📶" },
                { label: "Cameras", val: cameras, set: setCameras, icon: "📷" },
                { label: "Face ID", val: faceId, set: setFaceId, icon: "🔐" },
                { label: "Audio", val: audio, set: setAudio, icon: "🔊" },
              ].map((t, i) => (
                <div key={i} style={{ background: "var(--bg3)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", border: `1px solid ${t.val ? "rgba(19,218,236,0.2)" : "var(--border)"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{t.icon}</span>
                    <span style={{ fontSize: "0.875rem" }}>{t.label}</span>
                  </div>
                  <button
                    onClick={() => t.set(!t.val)}
                    style={{ width: 40, height: 22, borderRadius: 11, background: t.val ? "var(--primary)" : "var(--bg4)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
                  >
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: t.val ? 21 : 3, transition: "left 0.2s" }}></div>
                  </button>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="label">Inspector Notes</label>
              <textarea
                className="input" rows={4}
                placeholder="Describe any specific damage or observations..."
                value={notes} onChange={e => setNotes(e.target.value)}
                style={{ resize: "vertical" }}
              />
            </div>
          </div>

          {/* Right: Grade */}
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Final Calculation</div>
              {/* Grade circle */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <div style={{ position: "relative", width: 100, height: 100 }}>
                  <svg viewBox="0 0 100 100" width="100" height="100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="var(--bg3)" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="44" fill="none" stroke={gradeColor} strokeWidth="8"
                      strokeDasharray={`${(totalScore / 100) * 276.5} 276.5`}
                      strokeLinecap="round" transform="rotate(-90 50 50)"/>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, color: gradeColor }}>{grade}</div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span className="badge" style={{ background: `${gradeColor}18`, color: gradeColor, fontSize: "0.75rem" }}>{gradeLabel}</span>
              </div>
              <div className="divider"></div>
              {[
                { label: "Base Value", value: `$${baseValue.toFixed(2)}` },
                { label: "Deductions", value: `-$${deductions.toFixed(2)}`, color: "#ff4757" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--text2)" }}>{r.label}</span>
                  <span style={{ color: r.color || "var(--text)", fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
              <div className="divider"></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600 }}>Estimated Value</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>${estimatedValue.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", fontSize: "0.95rem", fontWeight: 700, marginBottom: 8 }}
              onClick={() => setSubmitted(true)}
            >
              {submitted ? "✓ Submitted!" : "Submit Logs →"}
            </button>
            <button style={{ width: "100%", padding: "10px", background: "none", border: "none", cursor: "pointer", color: "var(--text2)", fontSize: "0.82rem" }}>
              Flag for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
