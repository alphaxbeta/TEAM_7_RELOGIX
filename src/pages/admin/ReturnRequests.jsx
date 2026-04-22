import { useState } from "react";
import Topbar from "../../components/Topbar";

const requests = [
  {
    id: "RMA-9402", order: "#24901", name: "Audio Technica M50x",
    img: "🎧", status: "PENDING REVIEW", time: "Today, 10:23 AM",
    customer: "Sarah Jenkins", tier: "Gold", tierColor: "#ffa502",
    reason: "Defective / Audio crackling", desc: '"Left ear cup has intermittent...',
    borderColor: "#13daec",
  },
  {
    id: "RMA-9388", order: "#24882", name: "Garmin Venu 2",
    img: "⌚", status: "RECEIVED", time: "Yesterday, 4:45 PM",
    customer: "Michael Ross", tier: "Silver", tierColor: "#94a3b8",
    reason: "Changed Mind", desc: '"Item unopened, box in perfect...',
    borderColor: "transparent",
  },
  {
    id: "RMA-9355", order: "#24110", name: "Apple Watch Series 8",
    img: "⌚", status: "DAMAGED", time: "Yesterday, 2:15 PM",
    customer: "David Kim", tier: "Platinum", tierColor: "#a78bfa",
    reason: "Arrived Broken", desc: '"Screen cracked upon opening...',
    borderColor: "#ff4757",
  },
  {
    id: "RMA-9340", order: "#24500", name: "Polaroid Now+",
    img: "📷", status: "PENDING REVIEW", time: "2 days ago",
    customer: "Emma Lewis", tier: "Bronze", tierColor: "#fb923c",
    reason: "Incompatible", desc: '"Thought it worked with older fil...',
    borderColor: "transparent",
  },
];

const statusColors = {
  "PENDING REVIEW": "badge-warning",
  "RECEIVED": "badge-primary",
  "DAMAGED": "badge-danger",
};

export default function ReturnRequests() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(requests);

  const filtered = items.filter(r =>
    (filter === "All" || r.status === filter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase()))
  );

  const handleApprove = (id) => {
    setItems(prev => prev.map(r => r.id === id ? { ...r, status: "APPROVED" } : r));
  };
  const handleReject = (id) => {
    setItems(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div>
      <Topbar
        title="Return Requests"
        subtitle="Manage and process incoming RMAs"
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter
            </button>
            <button className="btn btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export CSV
            </button>
          </div>
        }
      />

      <div className="page-content fade-in">
        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "Pending Review", value: "24", change: "↑ +12% from yesterday", up: true },
            { label: "Approved Today", value: "15", change: "✓ 85% approval rate", up: true },
            { label: "Rejected", value: "3", change: "Main reason: No defect", up: false },
            { label: "Total Value", value: "$4,250", change: "Processing queue", up: true },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>
            Pending Requests
            <span style={{ fontSize: "0.8rem", color: "var(--text2)", fontWeight: 400, marginLeft: 8 }}>Prioritized by date received</span>
          </h3>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="input" placeholder="Search by Order ID, Customer..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 34, width: 240, padding: "8px 12px 8px 34px" }}
              />
            </div>
            <div className="tabs">
              {["All", "Electronics", "Apparel", "Home"].map(t => (
                <button key={t} className={`tab ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((r) => (
            <div key={r.id} className="card" style={{ borderLeft: `3px solid ${r.borderColor || "var(--border)"}`, display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
              {/* Product */}
              <div style={{ width: 56, height: 56, borderRadius: 10, background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                {r.img}
              </div>
              <div style={{ flex: "0 0 200px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className={`badge ${statusColors[r.status] || "badge-gray"}`}>{r.status}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{r.time}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text)" }}>{r.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>{r.id} • Order {r.order}</div>
              </div>
              {/* Customer */}
              <div style={{ flex: "0 0 160px" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Customer</div>
                <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{r.customer}</div>
                <div style={{ fontSize: "0.75rem" }}>Loyalty Tier: <span style={{ color: r.tierColor, fontWeight: 600 }}>{r.tier}</span></div>
              </div>
              {/* Reason */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Return Reason</div>
                <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{r.reason}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>{r.desc}</div>
              </div>
              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {r.status === "DAMAGED" ? (
                  <>
                    <button className="btn btn-danger btn-sm" onClick={() => handleReject(r.id)}>Flag Fraud</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleApprove(r.id)}>Process →</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)", borderColor: "rgba(255,71,87,0.3)" }} onClick={() => handleReject(r.id)}>Reject</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleApprove(r.id)}>Approve ✓</button>
                  </>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "var(--text2)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>📭</div>
              No requests found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
