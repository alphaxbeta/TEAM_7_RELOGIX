import { useState } from "react";
import Topbar from "../../components/Topbar";

const initialColumns = {
  incoming: {
    label: "Incoming", dot: "#ff4757",
    cards: [
      { id: "#REQ-8921", device: "iPhone 13 Pro Max", issue: "Screen flicker & battery degradation.", priority: "URGENT", priorityClass: "badge-danger", due: "Today, 2:00 PM", icon: "📱" },
      { id: "#REQ-8944", device: "MacBook Air M2", issue: "Keyboard replacement needed.", priority: "HIGH", priorityClass: "badge-warning", due: "Tomorrow", icon: "💻" },
      { id: "#REQ-9001", device: "Apple Watch Ultra", issue: "Sensors not responding.", priority: "NORMAL", priorityClass: "badge-gray", due: "Wed, 9:00 AM", icon: "⌚" },
    ]
  },
  diagnostics: {
    label: "Diagnostics", dot: "#13daec",
    cards: [
      { id: "#REQ-8810", device: 'iPad Pro 12.9"', issue: "Logic board diagnostic test in progress.", tag: "RUNNING", tagClass: "badge-primary", progress: 55, tech: "Alex", icon: "📱" },
      { id: "#REQ-8772", device: "HomePod Mini", issue: "Speaker driver replacement. Part ordered.", tag: "WAITING PARTS", tagClass: "badge-warning", eta: "ETA: 2 Days", icon: "🔊" },
      { id: "#REQ-8890", device: "AirPods Pro Gen 2", issue: "Noise cancellation failure diagnosis.", tag: null, started: "Started 1h ago", icon: "🎧" },
    ]
  },
  qa_ready: {
    label: "QA / Ready", dot: "#2ed57e",
    cards: [
      { id: "#REQ-8650", device: 'MacBook Pro 16"', issue: "Display replacement successful.", tag: "READY", tagClass: "badge-success", result: "Passed QA", when: "Yesterday", icon: "💻" },
      { id: "#REQ-8612", device: "iPhone 12 Mini", issue: "Battery replacement.", tag: "SHIPPED", tagClass: "badge-primary", tracking: "Tracking: #UPS...", when: "2 days ago", icon: "📱" },
    ]
  }
};

export default function RepairTasks() {
  const [columns] = useState(initialColumns);

  return (
    <div>
      <Topbar
        title={<span>Repair Tasks <span className="badge badge-success" style={{ fontSize: "0.65rem", marginLeft: 8 }}>Live Updates</span></span>}
        subtitle="Manage device diagnostics and repair workflows."
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex" }}>
              {["👤","👤","👤"].map((a, i) => (
                <div key={i} className="avatar" style={{ width: 28, height: 28, fontSize: "0.7rem", marginLeft: i === 0 ? 0 : -8, border: "2px solid var(--bg2)", zIndex: 3 - i }}>{a}</div>
              ))}
              <span className="badge badge-gray" style={{ marginLeft: 4 }}>+3</span>
            </div>
            <button className="btn btn-ghost btn-sm">☰ Filter</button>
            <button className="btn btn-primary btn-sm">+ New Task</button>
          </div>
        }
      />

      <div className="page-content fade-in">
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
          {Object.entries(columns).map(([key, col]) => (
            <div key={key} className="kanban-col">
              {/* Column header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.dot }}></div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>{col.label}</span>
                  <span className="badge badge-gray">{col.cards.length}</span>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: "1.1rem" }}>···</button>
              </div>

              {/* Cards */}
              {col.cards.map((card, i) => (
                <div key={i} className="kanban-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 600 }}>{card.id}</span>
                    {(card.priority || card.tag) && (
                      <span className={`badge ${card.priorityClass || card.tagClass}`} style={{ fontSize: "0.62rem" }}>
                        {card.priority || card.tag}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: "1rem" }}>{card.icon}</span>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{card.device}</div>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginBottom: 10 }}>{card.issue}</div>
                  {card.progress !== undefined && (
                    <div style={{ marginBottom: 8 }}>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${card.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text3)" }}>
                      {card.due && `🕐 ${card.due}`}
                      {card.eta && card.eta}
                      {card.started && `🕐 ${card.started}`}
                      {card.result && <span style={{ color: "#2ed57e" }}>✓ {card.result}</span>}
                      {card.tracking && <span style={{ color: "var(--text3)" }}>🚚 {card.tracking}</span>}
                    </div>
                    {card.when && <span style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{card.when}</span>}
                    {card.tech && (
                      <div className="avatar" style={{ width: 24, height: 24, fontSize: "0.65rem" }}>
                        {card.tech[0]}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {key === "incoming" && (
                <button style={{ width: "100%", padding: "10px", background: "transparent", border: "1px dashed var(--border)", borderRadius: 8, color: "var(--text3)", cursor: "pointer", fontSize: "0.82rem", marginTop: 4 }}>
                  + Add Task
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support FAB */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}>
        <button className="btn btn-primary" style={{ borderRadius: 20, padding: "10px 16px", boxShadow: "var(--primary-glow)" }}>
          💬 Support <span style={{ width: 8, height: 8, background: "#2ed57e", borderRadius: "50%", display: "inline-block", marginLeft: 4 }}></span>
        </button>
      </div>
    </div>
  );
}
