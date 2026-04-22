import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";

const returns = [
  {
    id: "RT-9928-AX", name: "iPhone 13 Pro Max", img: "📱",
    date: "Initiated Oct 24, 2023", status: "IN INSPECTION",
    statusClass: "badge-warning", statusColor: "#ffa502",
    steps: ["Initiated", "Received", "In Inspection", "Refund"],
    currentStep: 2, est: "Est. completion: 2 days",
  },
  {
    id: "RT-8821-BQ", name: "MacBook Air M2", img: "💻",
    date: "Initiated Sep 15, 2023", status: "REFUNDED",
    statusClass: "badge-success", statusColor: "#2ed57e",
    steps: ["Initiated", "Received", "Inspected", "Refunded"],
    currentStep: 3, est: "Completed Sep 22",
  },
  {
    id: "RT-1102-CZ", name: "AirPods Pro (2nd Gen)", img: "🎧",
    date: "Initiated Oct 26, 2023", status: "PENDING APPROVAL",
    statusClass: "badge-orange", statusColor: "#fb923c",
    steps: ["Initiated", "Pending Approval", "Shipment", "Processing"],
    currentStep: 0, est: "Reviewing Request",
  },
  {
    id: "RT-5501-XY", name: "Sport Loop Band", img: "⌚",
    date: "Initiated Aug 10, 2023", status: "REJECTED",
    statusClass: "badge-danger", statusColor: "#ff4757",
    steps: ["Initiated", "Review", "Decision", "Refund"],
    currentStep: 2, rejected: true, est: "Outside policy window",
  },
];

export default function MyReturns() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = returns.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Topbar
        title="My Returns"
        subtitle="Track and manage your active return requests."
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">☰ Filter</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/customer/new-return")}>
              + Start New Return
            </button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="input" placeholder="Search by Order ID or Product Name..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 42, background: "var(--bg2)" }}
          />
        </div>

        {/* Returns list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((r, i) => (
            <div
              key={i} className="card"
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}
              onClick={() => navigate(r.id.startsWith("RT-9928") ? "/customer/pickup" : r.id.startsWith("RT-8821") ? "/customer/refund" : "/customer")}
            >
              {/* Icon */}
              <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                {r.img}
              </div>

              {/* Info */}
              <div style={{ flex: "0 0 180px" }}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>{r.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>#{r.id}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 2 }}>{r.date}</div>
              </div>

              {/* Progress */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", position: "relative", marginBottom: 12 }}>
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "var(--bg3)", transform: "translateY(-50%)" }}></div>
                  <div style={{ position: "absolute", top: "50%", left: 0, height: 2, transform: "translateY(-50%)", background: r.rejected ? "var(--border)" : r.statusColor, width: `${(r.currentStep / (r.steps.length - 1)) * 100}%`, transition: "width 0.5s" }}></div>
                  {r.steps.map((step, si) => (
                    <div key={si} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: si <= r.currentStep && !r.rejected ? r.statusColor : si === r.currentStep && r.rejected ? r.statusColor : "var(--bg3)",
                        border: `2px solid ${si <= r.currentStep && !r.rejected ? r.statusColor : si === r.currentStep && r.rejected ? r.statusColor : "var(--border)"}`,
                      }}></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {r.steps.map((step, si) => (
                    <div key={si} style={{ flex: 1, textAlign: "center" }}>
                      <span style={{ fontSize: "0.62rem", color: si === r.currentStep ? r.statusColor : "var(--text3)" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span className={`badge ${r.statusClass}`} style={{ marginBottom: 6, display: "block" }}>{r.status}</span>
                <div style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{r.est}</div>
              </div>

              {/* Arrow */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" style={{ flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button className="btn btn-ghost">Load More Returns ▾</button>
        </div>
      </div>
    </div>
  );
}
