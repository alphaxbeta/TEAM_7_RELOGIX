import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./team.css";

export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/members/${id}`)
      .then((res) => {
        setMember(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load member details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="team-page"><div className="team-loading">⏳ Loading...</div></div>;
  if (error) return <div className="team-page"><div className="team-alert team-alert-error">{error}</div></div>;
  if (!member) return null;

  return (
    <div className="team-page">
      <div className="detail-card">
        <div className="detail-img-wrap">
          {member.image ? (
            <img
              src={`/${member.image}`}
              alt={member.name}
              className="detail-img"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="detail-placeholder"
            style={{ display: member.image ? "none" : "flex" }}
          >
            <span>{member.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>

        <div className="detail-body">
          <h2 className="detail-name">{member.name}</h2>
          <p className="detail-role-degree">
            {member.role} &mdash; {member.degree} · {member.year}
          </p>

          <div className="detail-info-grid">
            <div className="detail-row">
              <span className="detail-label">Roll Number:</span>
              <span className="detail-value">{member.rollNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{member.email}</span>
            </div>
            {member.project && (
              <div className="detail-row">
                <span className="detail-label">Project:</span>
                <span className="detail-value">{member.project}</span>
              </div>
            )}
            {member.certificate && (
              <div className="detail-row">
                <span className="detail-label">Certificate:</span>
                <span className="detail-value">{member.certificate}</span>
              </div>
            )}
            {member.internship && (
              <div className="detail-row">
                <span className="detail-label">Internship:</span>
                <span className="detail-value">{member.internship}</span>
              </div>
            )}
            {member.aboutAim && (
              <div className="detail-row">
                <span className="detail-label">About Your Aim:</span>
                <span className="detail-value">{member.aboutAim}</span>
              </div>
            )}
          </div>

          {member.hobbies && member.hobbies.length > 0 && (
            <div className="detail-hobbies">
              <span className="detail-label">Hobbies:</span>
              <div className="hobby-tags">
                {member.hobbies.map((h, i) => (
                  <span key={i} className="hobby-tag">{h}</span>
                ))}
              </div>
            </div>
          )}

          <div className="detail-actions">
            <button
              className="team-btn team-btn-outline"
              onClick={() => navigate("/team/members")}
            >
              ← Back to Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
