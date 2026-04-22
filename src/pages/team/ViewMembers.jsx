import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./team.css";

export default function ViewMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/members")
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load members. Make sure the backend server is running on port 5000.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="team-page">
      <div className="team-page-header">
        <button className="team-btn team-btn-outline" onClick={() => navigate("/team")}>
          ← Home
        </button>
        <h2 className="team-page-title">MEET OUR AMAZING TEAM</h2>
        <button className="team-btn team-btn-primary" onClick={() => navigate("/team/add")}>
          ➕ Add Member
        </button>
      </div>

      {loading && <div className="team-loading">⏳ Loading members...</div>}
      {error && <div className="team-alert team-alert-error">{error}</div>}

      {!loading && !error && members.length === 0 && (
        <div className="team-empty">
          <p>No members yet. Add your first team member!</p>
          <button className="team-btn team-btn-primary" onClick={() => navigate("/team/add")}>
            ➕ Add Member
          </button>
        </div>
      )}

      <div className="members-grid">
        {members.map((member) => (
          <div className="member-card" key={member._id}>
            <div className="member-card-img">
              {member.image ? (
                <img
                  src={`/${member.image}`}
                  alt={member.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="member-placeholder"
                style={{ display: member.image ? "none" : "flex" }}
              >
                <span>{member.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="member-card-body">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-roll">Roll No: {member.rollNumber}</p>
              <p className="member-role">{member.role}</p>
              <p className="member-degree">{member.degree} · {member.year}</p>
            </div>
            <div className="member-card-footer">
              <button
                className="team-btn team-btn-view"
                onClick={() => navigate(`/team/members/${member._id}`)}
              >
                VIEW DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
