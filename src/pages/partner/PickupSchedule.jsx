import { useState } from "react";
import Topbar from "../../components/Topbar";

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
const weekHeaders = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const events = {
  2: [{ label: "Pickup...", color: "#13daec" }],
  4: [{ label: "Bulk ...", color: "#a78bfa" }],
  6: [{ label: "Pickup...", color: "#13daec" }, { label: "Pickup...", color: "#13daec" }],
  7: [{ label: "Urge...", color: "#ff4757" }],
};

const queue = [
  {
    id: "#REQ-8821", name: "iPhone 14 Pro Max", badge: "urgent",
    location: "Apple Store, 5th Avenue", city: "New York, NY 10022",
    window: "Today, 2:00 PM - 4:00 PM", windowColor: "#ff4757",
  },
  {
    id: "#REQ-9942", name: "MacBook Air M2", badge: "fragile",
    location: "TechHub Logistics", city: "Brooklyn, NY 11201",
    window: "Tomorrow, 9:00 AM", windowColor: "var(--text2)",
  },
  {
    id: "#REQ-7712", name: "AirPods Max (Bulk)", badge: null,
    location: "Best Buy Warehouse", city: "Queens, NY 11101",
    window: "Oct 12, 10:00 AM", windowColor: "var(--text2)",
  },
];

export default function PickupSchedule() {
  const [view, setView] = useState("Month");
  const [selectedDay, setSelectedDay] = useState(7);

  // October 2023 starts on Sunday
  const startPad = 0;

  return (
    <div>
      <Topbar
        title="Pickup Schedule"
        subtitle="LOGISTICS DASHBOARD"
        actions={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="live-dot"></div>
              <span style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 600 }}>System Online</span>
            </div>
          </div>
        }
      />

      <div className="page-content fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
          {/* Calendar */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>October 2023</h3>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}>‹</button>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}>›</button>
                </div>
              </div>
              <div className="tabs">
                {["Month", "Week", "Day"].map(v => (
                  <button key={v} className={`tab ${view === v ? "active" : ""}`} onClick={() => setView(v)}>{v}</button>
                ))}
              </div>
            </div>

            {/* Week headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 8 }}>
              {weekHeaders.map(d => (
                <div key={d} style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text3)", fontWeight: 600, padding: "6px 0" }}>{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
              {/* Padding for start */}
              {Array.from({ length: startPad }).map((_, i) => (
                <div key={`pad-${i}`} style={{ minHeight: 60 }}></div>
              ))}
              {/* Days */}
              {daysInMonth.map(day => (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  style={{
                    minHeight: 60, padding: "6px", borderRadius: 8, cursor: "pointer",
                    background: selectedDay === day ? "var(--primary-dim)" : "transparent",
                    border: `1px solid ${selectedDay === day ? "var(--primary)" : "transparent"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: "0.82rem", fontWeight: selectedDay === day ? 700 : 400, color: selectedDay === day ? "var(--primary)" : day < 1 ? "var(--text3)" : "var(--text)", marginBottom: 4 }}>
                    {day}
                  </div>
                  {events[day]?.map((ev, i) => (
                    <div key={i} style={{ fontSize: "0.62rem", padding: "2px 4px", background: `${ev.color}20`, color: ev.color, borderRadius: 3, marginBottom: 2, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {ev.label}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Queue */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Queue</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                  Pending <span className="badge badge-warning" style={{ fontSize: "0.8rem", marginLeft: 6 }}>5</span>
                </h3>
              </div>
              <button className="icon-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="16" y2="18"/></svg>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {queue.map((item, i) => (
                <div key={i} className="card" style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📱</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text2)" }}>ID: {item.id}</div>
                      </div>
                    </div>
                    {item.badge && (
                      <span className={`badge ${item.badge === "urgent" ? "badge-danger" : "badge-orange"}`}>
                        {item.badge.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: "0.8rem" }}>📍</span>
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>{item.location}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>{item.city}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: "0.8rem" }}>🕐</span>
                      <div style={{ fontSize: "0.78rem" }}>
                        Pickup Window: <span style={{ color: item.windowColor, fontWeight: 500 }}>{item.window}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Assign Driver</button>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Schedule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
