import { useState } from "react";
import Menu from "../components/Menu";
import "../styles/theme.css";
import "../styles/profile.css";

function Profile({ setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    name: "sarah.alsaadan.2004",
    email: "sarah.alsaadan.2004@gmail.com",
    allergies: "",
  });

  const [formData, setFormData] = useState(profile);

  const handleEditClick = () => {
    setFormData(profile);
    setIsEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValid) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setProfile(formData);
    setIsEditing(false);
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-brand">
          <button
            type="button"
            className="icon-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div>
            <h3 className="brand-title">Pantrix</h3>
            <p className="brand-subtitle">Cook Smart, Waste Less</p>
          </div>
        </div>

        <button
          type="button"
          className="icon-btn logout-btn"
          aria-label="Logout"
        >
          ↪
        </button>
      </header>

      <main className="profile-content">
        <button
          type="button"
          className="back-link"
          onClick={() => setPage && setPage("home")}
        >
          ← Back to Home
        </button>

        <div className="profile-title-row">
          <div>
            <h1>My Profile</h1>
            <p className="profile-subtitle">
              Manage your account and cooking preferences
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              className="btn btn-primary btn-sm edit-profile-btn"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div
            className={`alert ${
              message.includes("successfully") ? "alert-success" : "alert-error"
            } profile-message`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSave}>
          <section className="profile-card">
            <h3>Account Information</h3>
            <p className="card-subtext">Your basic account details</p>

            <div className="profile-field">
              <label>Name</label>
              {isEditing ? (
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>

            <div className="profile-field">
              <label>Email</label>
              {isEditing ? (
                <>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <small className="field-note">
                    Note: Email changes may require verification in a production
                    app
                  </small>
                </>
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
          </section>

          <section className="profile-card">
            <h3>Allergies & Dietary Restrictions</h3>
            <p className="card-subtext">
              Add ingredients you want to exclude from recipes. These preferences
              will be automatically applied to your searches.
            </p>

            <div className="profile-field">
              <label>Allergies</label>
              {isEditing ? (
                <>
                  <input
                    className="input"
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="Type an allergy (e.g. Peanut)"
                  />
                  <small className="field-note">
                    Example: Peanut, Dairy, Gluten
                  </small>
                </>
              ) : (
                <p>{profile.allergies || "No allergies set"}</p>
              )}
            </div>
          </section>

          {isEditing && (
            <div className="profile-actions">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </main>

      <footer className="profile-footer">
        <p>© 2026 Pantrix - Helping you cook smart and reduce food waste</p>
        <small>Demo prototype - All data is simulated</small>
      </footer>

      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeItem="profile"
        setPage={setPage}
      />
    </div>
  );
}

export default Profile;