import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";

const activities = [
  { name: "iPhone 13 Pro Trade-in", sub: "Refurbished for resale • Oct 24, 2023", pts: "+120 pts", status: "Complete", statusColor: "#2ed57e", icon: "📱" },
  { name: "iPad Air Recycle", sub: "Material recovery • Oct 12, 2023", pts: "+45 pts", status: "Processed", statusColor: "#13daec", icon: "📱" },
  { name: "Accessory Bundle", sub: "Cable recycling • Sep 28, 2023", pts: "+15 pts", status: "Recycled", statusColor: "#a78bfa", icon: "🔌" },
];

export default function CustomerImpact() {
  const navigate = useNavigate();

  return (
    <div>
      <Topbar
        title="Sustainability Impact"
        subtitle="Your circular economy contribution visualized."
        actions={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost btn-sm">↗ Share Report</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/customer/new-return")}>+ New Return</button>
          </div>
        }
      />

      <div style={{ padding: "4px 12px 10px", display: "flex", gap: 8 }}>
        <span className="badge badge-gray">Q3 2023 REPORT</span>
        <span className="badge badge-gray">BETA V2.0</span>
      </div>

      <div className="page-content" style={{ paddingTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Score */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Circular Contribution Score</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 160, height: 160 }}>
                <svg viewBox="0 0 160 160" width="160" height="160">
                  <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12"/>
                  <circle cx="80" cy="80" r="68" fill="none" stroke="url(#scoreGrad)" strokeWidth="12"
                    strokeDasharray={`${0.87 * 427} 427`} strokeLinecap="round" transform="rotate(-90 80 80)"/>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0fa8b8"/>
                      <stop offset="100%" stopColor="#13daec"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 800, color: "var(--primary)" }}>87</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600, letterSpacing: "0.1em" }}>EXCELLENT</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase" }}>Rank</div>
                <div style={{ fontWeight: 700, color: "var(--text)" }}>Top 5%</div>
              </div>
              <div style={{ width: 1, background: "var(--border)" }}></div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase" }}>Next Tier</div>
                <div style={{ fontWeight: 700, color: "var(--primary)" }}>Platinum</div>
              </div>
            </div>
          </div>

          {/* Right metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Carbon */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🌱</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text2)" }}>Carbon Saved</span>
                </div>
                <span className="badge badge-success" style={{ fontSize: "0.65rem" }}>+12% vs last month</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800 }}>
                245 <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--text2)" }}>kg CO2e</span>
              </div>
              <div className="progress-bar" style={{ marginTop: 8 }}>
                <div className="progress-fill success" style={{ width: "65%" }}></div>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 6 }}>Equivalent to driving a car for 850 miles.</div>
            </div>

            {/* E-Waste */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>♻</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text2)" }}>E-Waste Diverted</span>
                </div>
                <span className="badge badge-primary" style={{ fontSize: "0.65rem" }}>2 Active Returns</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800 }}>
                42.8 <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--text2)" }}>kg</span>
              </div>
              <div className="progress-bar" style={{ marginTop: 8 }}>
                <div className="progress-fill" style={{ width: "45%" }}></div>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 6 }}>You've saved 14 devices from landfills.</div>
            </div>
          </div>
        </div>

        {/* Nature equivalent */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 6 }}>Nature Equivalent</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text2)", marginBottom: 10 }}>Your actions this year have had the same positive effect as planting:</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800 }}>12</span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#2ed57e" }}>Mature Trees</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>In an urban environment</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 0.7, 0.5].map((o, i) => (
                <div key={i} style={{ width: 36, height: 48, opacity: o }}>
                  <div style={{ width: "100%", height: 30, background: "#2ed57e", borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%", opacity: 0.8 }}></div>
                  <div style={{ width: 4, height: 18, background: "#1a5c2a", margin: "0 auto" }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
          {/* Recent activity */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>Recent Impact Activity</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.8rem" }}>View All</button>
            </div>
            {activities.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < activities.length - 1 ? "1px solid var(--border2)" : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{a.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>{a.sub}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "var(--success)" }}>{a.pts}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", fontSize: "0.72rem", color: a.statusColor }}>
                    ✓ {a.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Community rank */}
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 20 }}>Community Rank</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              {[
                { rank: "#2", you: false, size: 40 },
                { rank: "You", you: true, size: 50 },
                { rank: "#3", you: false, size: 36 },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  {p.you && <span style={{ fontSize: "1.2rem" }}>🏆</span>}
                  <div className="avatar" style={{ width: p.size, height: p.size, fontSize: "0.75rem", border: p.you ? "2px solid var(--primary)" : "2px solid var(--border)", boxShadow: p.you ? "0 0 12px rgba(19,218,236,0.4)" : "none" }}>
                    {p.rank[0]}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: p.you ? "var(--primary)" : "var(--text3)", fontWeight: p.you ? 600 : 400 }}>{p.rank}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text2)", textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>
              You're in the <span style={{ color: "var(--primary)", fontWeight: 600 }}>top 5%</span> of sustainability contributors in your region!
            </p>
            <div className="divider"></div>
            <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Latest Badge Earned</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg3)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>⭐</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>Streak Master</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text2)" }}>3 returns in one month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
