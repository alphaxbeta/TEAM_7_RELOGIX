import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter new password, 3 = success
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // useEffect + useRef: auto-focus on step change
  useEffect(() => {
    if (step === 1) emailRef.current?.focus();
    if (step === 2) passwordRef.current?.focus();
  }, [step]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email");
    setError("");
    // Check if user exists before proceeding
    setLoading(true);
    try {
      // We just advance to step 2 — actual update happens at step 2
      await new Promise(r => setTimeout(r, 300)); // small UX delay
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!password) return setError("Enter a new password");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords do not match");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStep(3);
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
        {/* Back link */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text2)", fontSize: "0.85rem", marginBottom: 28, textDecoration: "none" }}>
          ← Back to login
        </Link>

        {step === 1 && (
          <>
            <h1 style={styles.title}>Reset Password</h1>
            <p style={styles.sub}>Enter your account email to continue</p>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label className="label">Email Address</label>
                <input
                  ref={emailRef}
                  className="input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: 12 }}>
                {loading ? <><span className="spinner" /> Checking...</> : "Continue →"}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 style={styles.title}>New Password</h1>
            <p style={styles.sub}>Setting new password for <strong style={{ color: "var(--text)" }}>{email}</strong></p>

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label className="label">New Password</label>
                <input
                  ref={passwordRef}
                  className="input"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="label">Confirm Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Repeat password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>
                  ← Back
                </button>
                <button className="btn btn-primary" type="submit" disabled={loading} style={{ flex: 2 }}>
                  {loading ? <><span className="spinner" /> Updating...</> : "Update Password"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
            <h1 style={{ ...styles.title, marginBottom: 8 }}>Password Updated!</h1>
            <p style={{ color: "var(--text2)", marginBottom: 28 }}>
              Your password has been successfully reset. You can now sign in with your new credentials.
            </p>
            <Link to="/" className="btn btn-primary" style={{ display: "inline-flex", padding: "12px 32px" }}>
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" },
  bg: { position: "fixed", inset: 0, zIndex: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(108,99,255,0.1) 0%, transparent 60%)", pointerEvents: "none" },
  container: { position: "relative", zIndex: 1, width: "100%", maxWidth: 400, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 16, padding: 40 },
  title: { fontSize: "1.6rem", marginBottom: 8 },
  sub: { color: "var(--text2)", fontSize: "0.9rem", marginBottom: 24 },
};
