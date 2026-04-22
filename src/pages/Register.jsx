import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLES = [
  { value: "admin", label: "Admin", desc: "Full system control" },
  { value: "partner", label: "Partner", desc: "Service partner access" },
  { value: "business", label: "Business", desc: "Business account" },
  { value: "customer", label: "Customer", desc: "End customer access" },
];

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nameRef = useRef(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { nameRef.current?.focus(); }, []);

  const roleRoutes = { admin: "/admin", partner: "/partner", business: "/business", customer: "/customer" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) return setError("All fields required");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    setError(""); setLoading(true);
    try {
      const data = await register(name, email, password, role);
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
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={styles.logoText}>ReLogix</span>
        </div>

        <h1 style={styles.title}>Create account</h1>
        <p style={styles.sub}>Join the logistics platform</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Full Name</label>
            <input ref={nameRef} className="input" placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="label">Role</label>
            <div style={styles.roleGrid}>
              {ROLES.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  style={{
                    ...styles.roleBtn,
                    borderColor: role === r.value ? "var(--accent)" : "var(--border)",
                    background: role === r.value ? "rgba(108,99,255,0.1)" : "var(--bg3)",
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{r.label}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text2)" }}>{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "12px", marginTop: 4 }}>
            {loading ? <><span className="spinner" /> Creating...</> : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.85rem", color: "var(--text2)" }}>
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" },
  bg: { position: "fixed", inset: 0, zIndex: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(108,99,255,0.12) 0%, transparent 60%)", pointerEvents: "none" },
  container: { position: "relative", zIndex: 1, width: "100%", maxWidth: 420, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 16, padding: 40 },
  logo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 24 },
  logoIcon: { width: 38, height: 38, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem" },
  title: { fontSize: "1.5rem", marginBottom: 6 },
  sub: { color: "var(--text2)", marginBottom: 24, fontSize: "0.9rem" },
  roleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  roleBtn: { display: "flex", flexDirection: "column", gap: 2, padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid", cursor: "pointer", color: "var(--text)", textAlign: "left", transition: "all 0.15s" },
};
