import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, Save, ArrowLeft, Edit2, X } from "lucide-react";
import { toast } from "sonner";
import { getFavorites } from "../services/favoriteService";
import { getCurrentUser, updateProfile } from "../services/authService";
import "../styles/pages/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    allergies: [],
    favoriteRecipes: [],
    role: "user",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [errors, setErrors] = useState({
    email: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getCurrentUser();

        setUser({
          name: data.name || "",
          email: data.email || "",
          allergies: data.allergies || [],
          favoriteRecipes: [],
          role: data.role || "user",
        });

        localStorage.setItem("userName", data.name || "");
        localStorage.setItem("userEmail", data.email || "");
        localStorage.setItem("userRole", data.role || "user");
        localStorage.setItem("userId", data._id || data.id || "");
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Failed to load profile");

        const savedEmail = localStorage.getItem("userEmail") || "";
        const savedName =
          localStorage.getItem("userName") ||
          (savedEmail ? savedEmail.split("@")[0] : "");
        const savedRole = localStorage.getItem("userRole") || "user";

        setUser({
          name: savedName,
          email: savedEmail,
          allergies: [],
          favoriteRecipes: [],
          role: savedRole,
        });
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadFavoritesCount = async () => {
      try {
        const favorites = await getFavorites();
        setFavoriteCount(Array.isArray(favorites) ? favorites.length : 0);
      } catch (error) {
        console.error("Failed to load favorites count:", error);
        setFavoriteCount(0);
      }
    };

    loadFavoritesCount();
  }, []);

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
    setAllergies(user.allergies || []);
  }, [user]);

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value);
  };

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

  const handleSave = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) return;

    if (!isValidEmail(trimmedEmail)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setErrors({ email: "" });
    setIsLoading(true);

    try {
      const updatedUser = await updateProfile({
        name: trimmedName,
        allergies,
      });

      setUser({
        ...user,
        name: updatedUser.name,
        email: updatedUser.email,
        allergies: updatedUser.allergies || [],
        role: updatedUser.role || user.role || "user",
      });

      localStorage.setItem("userName", updatedUser.name || "");
      localStorage.setItem("userEmail", updatedUser.email || "");
      localStorage.setItem("userRole", updatedUser.role || "user");

      if (updatedUser._id || updatedUser.id) {
        localStorage.setItem("userId", updatedUser._id || updatedUser.id);
      }

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name || "");
    setEmail(user.email || "");
    setAllergies(user.allergies || []);
    setAllergyInput("");
    setErrors({ email: "" });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="profile-page-wrapper">
      <section className="profile-content-section">
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
                className="btn btn-primary profile-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="profile-grid">
            <div className="card contact-demo-card">
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
                    <p className="info-text">{user.name || "No name found"}</p>
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
                        readOnly
                      />

                      <small>Email cannot be changed from the profile page.</small>

                      {errors.email && (
                        <small className="error-text">{errors.email}</small>
                      )}
                    </>
                  ) : (
                    <div className="info-row">
                      <Mail size={16} />
                      <p className="info-text">
                        {user.email || "No email found"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card profile-card">
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
                      <small>Press Enter to add each allergy</small>
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

            {showLogoutButton && (
              <div className="card profile-card">
                <div className="card-header">
                  <h2>Account Actions</h2>
                  <p>Manage your session</p>
                </div>

                <div className="card-content">
                  <button
                    type="button"
                    className="btn btn-secondary logout-btn"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}

            <div className="card profile-card stats-card">
              <div className="card-header">
                <h2>Your Cooking Stats</h2>
                <p className="stats-subtitle">Track your Pantrix journey</p>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <h3>{favoriteCount}</h3>
                  <p>Saved Recipes</p>
                </div>

                <div className="stat-box">
                  <h3>{allergies.length}</h3>
                  <p>Allergies Set</p>
                </div>

                <div className="stat-box">
                  <h3>{user.role === "admin" ? "Admin" : "User"}</h3>
                  <p>Account Type</p>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="action-buttons">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  <Save size={16} />{" "}
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;