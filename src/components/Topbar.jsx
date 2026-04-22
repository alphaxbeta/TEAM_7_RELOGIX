import { useAuth } from "../context/AuthContext";

export default function Topbar({ title, subtitle, actions }) {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)" }}>
          {title}
        </h1>
        {subtitle && <p style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 2 }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {actions}
        <div style={{ position: "relative" }}>
          <button className="icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          <span style={{
            position: "absolute", top: 4, right: 4, width: 8, height: 8,
            background: "var(--danger)", borderRadius: "50%", border: "1.5px solid var(--bg2)",
          }}></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="avatar" style={{ width: 32, height: 32, fontSize: "0.8rem" }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{user?.name}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text2)", textTransform: "capitalize" }}>{user?.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
