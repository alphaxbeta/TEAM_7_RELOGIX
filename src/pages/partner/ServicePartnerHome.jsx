import Topbar from "../../components/Topbar";
import { useAuth } from "../../context/AuthContext";

const jobs = [
  { device: "iPhone 13 Pro", img: "📱", issue: "Screen Replacement", id: "#RP-9281", customer: "Sarah Jenks", status: "Pending", statusClass: "badge-warning", action: "Start", color: "#ff4757" },
  { device: "MacBook Air M2", img: "💻", issue: "Battery Diagnostics", id: "#RP-8821", customer: "Enterprise Corp", status: "In Progress", statusClass: "badge-primary", action: "Details", color: "#13daec" },
  { device: "Sony WH-1000XM5", img: "🎧", issue: "Audio Jack Repair", id: "#RP-7743", customer: "David Kim", status: "In Transit", statusClass: "badge-purple", action: "Track", color: "#a78bfa" },
  { device: "iPad Pro 12.9\"", img: "📱", issue: "Logic Board", id: "#RP-6512", customer: "Studio 54", status: "Ready", statusClass: "badge-success", action: "Ship", color: "#2ed57e" },
];

const schedule = [
  { time: "09:00 AM", title: "Pick up at Warehouse A", sub: "Batch #8821 • 15 Units", current: false },
  { time: "11:30 AM", title: "Drop off at Repair Center", sub: "Central Hub, Dock 4", current: true, tags: ["Navigation", "Call Contact"] },
  { time: "02:00 PM", title: "Client Meeting: TechCorp", sub: "Review Q3 Returns Volume", current: false },
  { time: "04:30 PM", title: "Inventory Audit", sub: "Monthly parts check", current: false },
];

export default function ServicePartnerHome() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div>
      <Topbar
        title={`${greeting}, ${user?.name || "Alex"}`}
        subtitle="You have 5 active jobs and 3 appointments scheduled for today."
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">⏱ History</button>
            <button className="btn btn-primary btn-sm">+ New Request</button>
          </div>
        }
      />

      <div className="page-content fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          {/* Left: Jobs table */}
          <div>
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Assigned Jobs</h3>
                  <span className="badge badge-primary">5</span>
                </div>
                <button className="btn btn-ghost btn-sm">All Priority ▾</button>
              </div>
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr><th>Device / Issue</th><th>ID</th><th>Customer</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {jobs.map((j, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${j.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", borderLeft: `3px solid ${j.color}` }}>{j.img}</div>
                            <div>
                              <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{j.device}</div>
                              <div style={{ fontSize: "0.75rem", color: j.color }}>{j.issue}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text2)" }}>{j.id}</td>
                        <td style={{ fontSize: "0.875rem" }}>{j.customer}</td>
                        <td><span className={`badge ${j.statusClass}`}>{j.status}</span></td>
                        <td>
                          <button className="btn btn-ghost btn-sm" style={{ borderColor: `${j.color}40`, color: j.color }}>
                            {j.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 0", borderTop: "1px solid var(--border2)", marginTop: 12 }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text2)" }}>Showing 1-4 of 5 jobs</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}>‹</button>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}>›</button>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { val: "98%", label: "SLA Success", color: "#13daec" },
                { val: "12", label: "Parts Ordered", color: "var(--text)" },
                { val: "4.9", label: "Partner Rating", color: "#ffa502" },
                { val: "$1.2k", label: "Est. Earnings", color: "var(--text)" },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text2)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Schedule */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Today's Schedule</h3>
                <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginTop: 2 }}>October 24, 2023</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>09:42</div>
            </div>

            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 9, top: 20, bottom: 20, width: 2, background: "var(--border)" }}></div>
              {schedule.map((s, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                  <div style={{ position: "absolute", left: -24, top: 14, width: 14, height: 14, borderRadius: "50%", background: s.current ? "var(--primary)" : "var(--bg3)", border: `2px solid ${s.current ? "var(--primary)" : "var(--border)"}`, zIndex: 1 }}></div>
                  <div style={{ fontSize: "0.75rem", color: s.current ? "var(--primary)" : "var(--text3)", marginBottom: 4, fontWeight: s.current ? 600 : 400 }}>
                    {s.time} {s.current && <span style={{ marginLeft: 6 }}>(In 1h)</span>}
                  </div>
                  <div className={s.current ? "card" : ""} style={s.current ? { padding: "12px 14px", borderLeft: "2px solid var(--primary)" } : {}}>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>
                      {s.sub.startsWith("Central") && "📍 "}{s.sub}
                    </div>
                    {s.tags && (
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        {s.tags.map(t => <button key={t} className="btn btn-ghost btn-sm" style={{ fontSize: "0.72rem", padding: "4px 10px" }}>{t}</button>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8, fontSize: "0.8rem" }}>
              📅 Sync Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
