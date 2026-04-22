import { Component } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ── Stateless Class Component ──────────────────────────────
// (receives all data via props, no internal state)
class NavbarView extends Component {
  getRoleColor() {
    const colors = {
      admin: "var(--accent)",
      partner: "var(--accent2)",
      business: "var(--warning)",
      customer: "var(--accent3)",
    };
    return colors[this.props.role] || "var(--text2)";
  }

  render() {
    const { name, role, onLogout } = this.props;

    return (
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            background: "var(--accent)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)" }}>
            ReLogix
          </span>
        </div>

        {/* User info */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>{name}</div>
            <div style={{ fontSize: "0.75rem", color: this.getRoleColor(), textTransform: "uppercase", fontWeight: 600 }}>{role}</div>
          </div>
          <button className="btn btn-outline" onClick={onLogout} style={{ padding: "7px 14px", fontSize: "0.8rem" }}>
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

// Functional wrapper to inject hooks
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return <NavbarView name={user.name} role={user.role} onLogout={handleLogout} />;
}
