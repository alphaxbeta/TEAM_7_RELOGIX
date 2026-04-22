import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const roleRoutes = { admin: "/admin", partner: "/partner", business: "/business", customer: "/customer" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill in all fields");
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      navigate(roleRoutes[data.user.role] || "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bg} />
      <div style={styles.container} className="page-enter">

        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={styles.logoText}>ReLogix</span>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.sub}>Sign in to your logistics platform</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              ref={emailRef}
              className="input"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "12px", marginTop: 8 }}>
            {loading ? <><span className="spinner" /> Signing in...</> : "Sign In"}
          </button>
        </form>

        <div style={styles.links}>
          <Link to="/forgot-password" style={{ color: "var(--text2)", fontSize: "0.85rem" }}>
            Forgot password?
          </Link>
          <Link to="/register" style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
            Create account →
          </Link>
        </div>

        {/* ── Team Management Section ── */}
        <div style={styles.teamSection}>
          <p style={styles.teamLabel}>👥 Team Management</p>
          <div style={styles.teamButtons}>
            <button style={styles.teamBtnAdd} onClick={() => navigate("/team/add")}>
              ➕ Add Member
            </button>
            <button style={styles.teamBtnView} onClick={() => navigate("/team/members")}>
              👁 View Members
            </button>
          </div>
        </div>

        {/* Demo credentials */}
        <div style={styles.demo}>
          <p style={{ color: "var(--text3)", fontSize: "0.75rem", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>Demo credentials</p>
          {[
            { role: "Admin", email: "admin@relogix.com", pass: "admin123" },
            { role: "Customer", email: "customer@relogix.com", pass: "cust123" },
          ].map(d => (
            <div key={d.role} style={{ fontSize: "0.75rem", color: "var(--text2)", marginBottom: 4 }}>
              <span style={{ color: "var(--text3)" }}>{d.role}:</span> {d.email} / {d.pass}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    position: "relative",
  },
  bg: {
    position: "fixed", inset: 0, zIndex: 0,
    background: "radial-gradient(ellipse at 30% 20%, rgba(108,99,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(255,101,132,0.08) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  container: {
    position: "relative", zIndex: 1,
    width: "100%", maxWidth: 400,
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: 40,
  },
  logo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 28 },
  logoIcon: {
    width: 44, height: 44,
    background: "var(--accent)",
    borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoText: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem" },
  title: { fontSize: "1.6rem", marginBottom: 6 },
  sub: { color: "var(--text2)", marginBottom: 28, fontSize: "0.9rem" },
  links: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 },

  // Team section styles
  teamSection: {
    marginTop: 24,
    padding: "16px",
    background: "linear-gradient(135deg, rgba(26,115,232,0.08), rgba(15,52,96,0.12))",
    borderRadius: 12,
    border: "1px solid rgba(26,115,232,0.25)",
  },
  teamLabel: {
    fontSize: "0.78rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text2)",
    marginBottom: 12,
  },
  teamButtons: {
    display: "flex",
    gap: 10,
  },
  teamBtnAdd: {
    flex: 1,
    padding: "10px 0",
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.88rem",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
  },
  teamBtnView: {
    flex: 1,
    padding: "10px 0",
    background: "transparent",
    color: "#1a73e8",
    border: "2px solid #1a73e8",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.88rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  demo: {
    marginTop: 16,
    padding: "14px 16px",
    background: "var(--bg3)",
    borderRadius: "var(--radius-sm)",
    border: "1px dashed var(--border)",
  },
};
