import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  returns: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.54"/>
    </svg>
  ),
  logistics: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 5v3h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  finance: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  analytics: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  hub: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 19 21 12 17 5 21 12 2"/>
    </svg>
  ),
  partner: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  sustainability: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 22 16 8M3.47 12.53A5 5 0 0 1 3 10.5C3 7.46 5.46 5 8.5 5c.92 0 1.79.25 2.53.68"/>
      <path d="M6.08 6.08A6 6 0 0 0 3 12c0 3.31 2.69 6 6 6h10c1.66 0 3-1.34 3-3 0-1.66-1.34-3-3-3-1.11 0-2.07.6-2.6 1.5"/>
    </svg>
  ),
  inspection: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  repair: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  schedule: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
};

const navsByRole = {
  admin: [
    { label: "Overview", icon: "dashboard", path: "/admin" },
    { label: "Return Requests", icon: "returns", path: "/admin/returns" },
    { label: "Logistics", icon: "logistics", path: "/admin/logistics" },
    { label: "Finance", icon: "finance", path: "/admin/finance" },
    { label: "Analytics", icon: "analytics", path: "/admin/analytics" },
    { label: "Users", icon: "users", path: "/admin/users" },
    { label: "Sustainability", icon: "sustainability", path: "/admin/sustainability" },
  ],
  partner: [
    { label: "Dashboard", icon: "dashboard", path: "/partner" },
    { label: "Repair Tasks", icon: "repair", path: "/partner/repairs" },
    { label: "Inspection", icon: "inspection", path: "/partner/inspection" },
    { label: "Schedule", icon: "schedule", path: "/partner/schedule" },
    { label: "Analytics", icon: "analytics", path: "/partner/analytics" },
  ],
  business: [
    { label: "Overview", icon: "dashboard", path: "/business" },
    { label: "Return Requests", icon: "returns", path: "/business/returns" },
    { label: "Hub Coordination", icon: "hub", path: "/business/hubs" },
    { label: "Shipment Tracking", icon: "logistics", path: "/business/shipments" },
    { label: "Partner Performance", icon: "partner", path: "/business/partners" },
    { label: "Reports", icon: "analytics", path: "/business/reports" },
    { label: "Sustainability", icon: "sustainability", path: "/business/sustainability" },
  ],
  customer: [
    { label: "My Returns", icon: "returns", path: "/customer" },
    { label: "New Return", icon: "returns", path: "/customer/new-return" },
    { label: "Pickup Tracking", icon: "logistics", path: "/customer/pickup" },
    { label: "Refund Status", icon: "finance", path: "/customer/refund" },
    { label: "Impact", icon: "sustainability", path: "/customer/impact" },
  ],
};

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = navsByRole[role] || [];

  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: "100vh",
      background: "var(--bg2)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s ease",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? "20px 0" : "20px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid var(--border)",
        justifyContent: collapsed ? "center" : "space-between",
      }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, var(--primary), #0fa8b8)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.54"/>
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>
              ReLogix
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text2)", padding: 4, borderRadius: 6,
            display: "flex", alignItems: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {collapsed ? <polyline points="9 18 15 12 9 6"/> : <polyline points="15 18 9 12 15 6"/>}
          </svg>
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div style={{ padding: "12px 20px" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "var(--primary)",
            background: "rgba(19,218,236,0.1)", padding: "3px 8px", borderRadius: 20,
          }}>
            {role}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : ""}
              style={{
                display: "flex", alignItems: "center",
                gap: collapsed ? 0 : 10,
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "10px" : "10px 12px",
                borderRadius: 8, border: "none", cursor: "pointer",
                background: isActive ? "rgba(19,218,236,0.1)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--text2)",
                fontFamily: "var(--font-body)", fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.15s ease",
                width: "100%",
                borderLeft: isActive ? "2px solid var(--primary)" : "2px solid transparent",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--bg3)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              {icons[item.icon]}
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom: user + logout */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => navigate(`/${role}/settings`)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            width: "100%", padding: "10px 12px", borderRadius: 8,
            border: "none", background: "transparent", cursor: "pointer",
            color: "var(--text2)", fontFamily: "var(--font-body)", fontSize: "0.875rem",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          {icons.settings}
          {!collapsed && "Settings"}
        </button>

        {!collapsed && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 12px", marginTop: 4,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), #0fa8b8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 700, color: "#0a1a1f",
              }}>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>{user?.name || "User"}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text2)" }}>{user?.email || ""}</div>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text2)", padding: 4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
