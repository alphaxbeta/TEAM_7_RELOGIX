import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./team.css";

export default function AddMember() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    year: "",
    degree: "",
    email: "",
    role: "",
    project: "",
    hobbies: "",
    certificate: "",
    internship: "",
    aboutAim: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.rollNumber.trim()) newErrors.rollNumber = "Roll Number is required";
    if (!form.year.trim()) newErrors.year = "Year is required";
    if (!form.degree.trim()) newErrors.degree = "Degree is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.role.trim()) newErrors.role = "Role is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/members", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("✅ Member added successfully! Redirecting...");
      setTimeout(() => navigate("/team/members"), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to add member. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="team-page">
      <div className="team-form-card">
        <h2 className="team-page-title">Add Team Member</h2>

        {success && <div className="team-alert team-alert-success">{success}</div>}
        {errors.submit && <div className="team-alert team-alert-error">{errors.submit}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <input
                className={`team-input ${errors.name ? "input-error" : ""}`}
                name="name"
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                className={`team-input ${errors.rollNumber ? "input-error" : ""}`}
                name="rollNumber"
                placeholder="Roll Number *"
                value={form.rollNumber}
                onChange={handleChange}
              />
              {errors.rollNumber && <span className="error-msg">{errors.rollNumber}</span>}
            </div>

            <div className="form-group">
              <input
                className={`team-input ${errors.year ? "input-error" : ""}`}
                name="year"
                placeholder="Year (e.g. 2024) *"
                value={form.year}
                onChange={handleChange}
              />
              {errors.year && <span className="error-msg">{errors.year}</span>}
            </div>

            <div className="form-group">
              <input
                className={`team-input ${errors.degree ? "input-error" : ""}`}
                name="degree"
                placeholder="Degree (e.g. B.Tech) *"
                value={form.degree}
                onChange={handleChange}
              />
              {errors.degree && <span className="error-msg">{errors.degree}</span>}
            </div>

            <div className="form-group">
              <input
                className={`team-input ${errors.email ? "input-error" : ""}`}
                name="email"
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                className={`team-input ${errors.role ? "input-error" : ""}`}
                name="role"
                placeholder="Role (e.g. Frontend Dev) *"
                value={form.role}
                onChange={handleChange}
              />
              {errors.role && <span className="error-msg">{errors.role}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <textarea
              className="team-input team-textarea"
              name="project"
              placeholder="About Project"
              value={form.project}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <input
              className="team-input"
              name="hobbies"
              placeholder="Hobbies (comma separated e.g. reading, gaming)"
              value={form.hobbies}
              onChange={handleChange}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <input
                className="team-input"
                name="certificate"
                placeholder="Certificate"
                value={form.certificate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                className="team-input"
                name="internship"
                placeholder="Internship"
                value={form.internship}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <textarea
              className="team-input team-textarea"
              name="aboutAim"
              placeholder="About Your Aim"
              value={form.aboutAim}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="form-group full-width">
            <label className="upload-label">📷 Profile Photo</label>
            <div className="upload-row">
              <button
                type="button"
                className="upload-browse-btn"
                onClick={() => document.getElementById("photo-upload").click()}
              >
                Browse...
              </button>
              <span className="upload-filename">
                {image ? image.name : "No file selected"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ display: "none" }}
                id="photo-upload"
              />
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="team-btn team-btn-outline"
              onClick={() => navigate("/team")}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="team-btn team-btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
