import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";

const items = [
  { name: "Apex Series 5 Smartwatch", variant: "Midnight Blue / 44mm", price: "$299.00", returnable: "Returnable until Nov 12" },
  { name: "Silicone Sport Band", variant: "Black / Standard", price: "$49.00", returnable: null },
];

const reasons = ["Changed my mind", "Defective / Not working", "Wrong item received", "Arrived damaged", "No longer needed", "Better price elsewhere"];

export default function InitiateReturn() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(0);
  const [reason, setReason] = useState("");
  const [condition, setCondition] = useState("Unopened");
  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (step < 3) { setStep(step + 1); return; }
    setSubmitted(true);
    setTimeout(() => navigate("/customer"), 2000);
  };

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh", gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--success-dim)", border: "2px solid var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>✓</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Return Submitted!</h2>
        <p style={{ color: "var(--text2)" }}>Your return request has been received. Redirecting...</p>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Initiate Return" subtitle="Order #ORD-8921 • Purchased on Oct 12, 2023" />

      <div className="page-content fade-in">
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
            {[{ label: "Select", n: 1 }, { label: "Details", n: 2 }, { label: "Review", n: 3 }].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: step >= s.n ? "var(--primary)" : "var(--bg3)",
                    border: `2px solid ${step >= s.n ? "var(--primary)" : "var(--border)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem",
                    color: step >= s.n ? "#0a1a1f" : "var(--text2)",
                  }}>{s.n}</div>
                  <span style={{ fontSize: "0.72rem", color: step === s.n ? "var(--primary)" : "var(--text3)", fontWeight: step === s.n ? 600 : 400 }}>{s.label}</span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: step > s.n ? "var(--primary)" : "var(--border)", margin: "0 8px", marginBottom: 22 }}></div>}
              </div>
            ))}
          </div>

          {/* Step 1: Select item */}
          {step === 1 && (
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Select Item to Return</h3>
              </div>
              {items.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedItem(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                    borderRadius: 10, border: `2px solid ${selectedItem === i ? "var(--primary)" : "var(--border)"}`,
                    marginBottom: 10, cursor: "pointer", background: selectedItem === i ? "var(--primary-dim)" : "var(--bg3)",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 8, background: "var(--bg4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>⌚</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>{item.variant}</div>
                    {item.returnable && <span className="badge badge-success" style={{ marginTop: 4, fontSize: "0.65rem" }}>{item.returnable}</span>}
                  </div>
                  <div style={{ fontWeight: 600, marginRight: 12 }}>{item.price}</div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selectedItem === i ? "var(--primary)" : "var(--border)"}`, background: selectedItem === i ? "var(--primary)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {selectedItem === i && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0a1a1f" }}></div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="card">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="label">Why are you returning this?</label>
                  <select className="input" value={reason} onChange={e => setReason(e.target.value)}>
                    <option value="">Select a reason...</option>
                    {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="label">Item Condition</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["Unopened", "Opened", "Damaged"].map(c => (
                      <button
                        key={c}
                        onClick={() => setCondition(c)}
                        style={{
                          flex: 1, padding: "10px 8px", borderRadius: 8, border: `1px solid ${condition === c ? "var(--primary)" : "var(--border)"}`,
                          background: condition === c ? "var(--primary-dim)" : "var(--bg3)",
                          color: condition === c ? "var(--primary)" : "var(--text2)",
                          cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, fontFamily: "var(--font-body)",
                        }}
                      >{c}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="label">Upload Photos (Optional)</label>
                <div style={{ border: "2px dashed var(--border)", borderRadius: 10, padding: "32px", textAlign: "center", background: "var(--bg3)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>☁</div>
                  <div style={{ color: "var(--primary)", fontWeight: 500 }}>Upload a file</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 4 }}>or drag and drop</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 4 }}>PNG, JPG, GIF up to 10MB</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {step === 3 && (
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🚚</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Pickup Address</h3>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem" }}>Edit Address</button>
              </div>
              <div className="form-group">
                <label className="label">Street Address</label>
                <input className="input" placeholder="123 Main St" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label className="label">City</label>
                  <input className="input" placeholder="San Francisco" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="label">State / Province</label>
                  <input className="input" placeholder="CA" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="label">ZIP / Postal Code</label>
                  <input className="input" placeholder="94102" value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} />
                </div>
              </div>
              {/* Summary */}
              <div className="divider"></div>
              <div style={{ background: "var(--bg3)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginBottom: 8 }}>Return Summary</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span>{items[selectedItem].name}</span>
                  <span style={{ fontWeight: 600 }}>{items[selectedItem].price}</span>
                </div>
                {reason && <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 4 }}>Reason: {reason}</div>}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            <button className="btn btn-ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate("/customer")}>
              {step > 1 ? "← Back" : "Cancel"}
            </button>
            <button className="btn btn-primary" style={{ padding: "11px 28px" }} onClick={handleSubmit}>
              {step < 3 ? "Continue →" : "Submit Return"}
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: "0.78rem", color: "var(--text3)" }}>
            Read our <a href="#">Return Policy</a>. Need help? <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
