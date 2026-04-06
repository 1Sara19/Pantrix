import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, Save, ArrowLeft, Edit2, X } from "lucide-react";
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    allergies: ["Peanuts", "Dairy"],
    favoriteRecipes: ["Pasta", "Salad", "Soup"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAllergies(user.allergies || []);
    }
  }, [user]);

  const handleAddAllergy = (e) => {
    if (e.key === "Enter" && allergyInput.trim()) {
      e.preventDefault();

      const newAllergy = allergyInput.trim();

      if (!allergies.includes(newAllergy)) {
        setAllergies([...allergies, newAllergy]);
      }

      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (allergyToRemove) => {
    setAllergies(allergies.filter((item) => item !== allergyToRemove));
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: name.trim(),
        email: email.trim(),
        allergies,
      };

      setUser(updatedUser);
      setIsEditing(false);
      setIsLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setAllergies(user.allergies || []);
    setAllergyInput("");
    setIsEditing(false);
  };

  return (
    <div className="container container-sm profile-page">
      <button
        type="button"
        className="btn btn-ghost back-btn"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your account and cooking preferences</p>
        </div>

        {!isEditing && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="card-header">
            <h2>
              <User size={20} />
              Account Information
            </h2>
            <p>Your basic account details</p>
          </div>

          <div className="card-content">
            <div className="form-group">
              <label htmlFor="profile-name">Name</label>
              {isEditing ? (
                <input
                  id="profile-name"
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <p className="info-text">{user.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">Email</label>
              {isEditing ? (
                <>
                  <input
                    id="profile-email"
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small>
                    Note: Email changes may require verification in a production
                    app
                  </small>
                </>
              ) : (
                <div className="info-row">
                  <Mail size={16} />
                  <p className="info-text">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <h2>
              <Shield size={20} />
              Allergies & Dietary Restrictions
            </h2>
            <p>
              Add ingredients you want to exclude from recipes. These
              preferences will be automatically applied to your searches.
            </p>
          </div>

          <div className="card-content">
            <div className="form-group">
              <label htmlFor="allergy-input">Allergies</label>

              {isEditing ? (
                <div className="allergy-input-wrap">
                  <input
                    id="allergy-input"
                    className="input"
                    type="text"
                    placeholder="Type an allergy and press Enter"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyDown={handleAddAllergy}
                  />
                  <small>Press Enter to add each allergy as a tag</small>
                </div>
              ) : (
                <p className="allergy-note">
                  {allergies.length === 0
                    ? "No allergies set"
                    : "Your allergies:"}
                </p>
              )}

              <div className="allergy-tags">
                {allergies.map((allergy) => (
                  <span className="allergy-badge" key={allergy}>
                    {allergy}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(allergy)}
                        aria-label={`Remove ${allergy}`}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              <Save size={16} />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="profile-card stats-card">
          <div className="card-header">
            <h2>Your Cooking Stats</h2>
            <p>Track your Pantrix journey</p>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <h3>{user.favoriteRecipes.length}</h3>
              <p>Saved Recipes</p>
            </div>

            <div className="stat-box">
              <h3>{allergies.length}</h3>
              <p>Allergies Set</p>
            </div>

            <div className="stat-box">
              <h3>Demo</h3>
              <p>Account Type</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;