import { useNavigate } from "react-router-dom";
import "./team.css";

export default function TeamHome() {
  const navigate = useNavigate();

  return (
    <div className="team-home">
      <div className="team-home-card">
        <div className="team-banner">
          <h1 className="team-title">TEAM SEVEN</h1>
          <p className="team-subtitle">Welcome to the TEAM SEVEN  Management System</p>
        </div>

        <div className="team-home-body">
          <p className="team-intro">
            Manage your student team members — add new members, view the complete
            roster, and explore individual profiles all in one place.
          </p>

          <h3 className="manage-label">Manage Team</h3>

          <div className="team-home-buttons">
            <button
              className="team-btn team-btn-primary"
              onClick={() => navigate("/team/add")}
            >
              ➕ Add Member
            </button>
            <button
              className="team-btn team-btn-secondary"
              onClick={() => navigate("/team/members")}
            >
              👥 View Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
