import { useEffect, useState } from "react";
import "../styles/pages/recipe-limits.css";
import pantrixLogo from "../assets/images/Pantrix.png";
import { Link, useNavigate } from "react-router-dom";

function RecipeLimits() {
  const navigate = useNavigate();

  const [savedMaxRecipes, setSavedMaxRecipes] = useState("20");
  const [maxRecipes, setMaxRecipes] = useState("20");
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const parsedValue = parseInt(maxRecipes, 10);
  const isValid = !isNaN(parsedValue) && parsedValue >= 1;
  const hasUnsavedChanges = maxRecipes !== savedMaxRecipes;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleBackClick = (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();

      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave without saving?"
      );

      if (confirmLeave) {
        navigate("/admin");
      }
    }
  };

  const handleSave = () => {
    const value = parseInt(maxRecipes, 10);

    if (isNaN(value) || value < 1) {
      setError("Please enter a valid number greater than 0.");
      return;
    }

    setError("");
    setSavedMaxRecipes(String(value));
    setMaxRecipes(String(value));
    showToast(`Search results limit updated to ${value} recipes.`);
  };

  const handleChange = (e) => {
    setMaxRecipes(e.target.value);

    if (error) {
      setError("");
    }
  };

  return (
    <div className="recipe-limits-page">
      {toast && <div className="toast">{toast}</div>}

      <header className="recipe-limits-header">
        <div className="container">
          <div className="recipe-limits-header__content">
            <div className="recipe-limits-header__left">
              <Link
                to="/admin"
                className="btn btn-ghost recipe-limits-back"
                onClick={handleBackClick}
              >
                ← Back to Dashboard
              </Link>

              <div className="recipe-limits-brand">
                <img
                  src={pantrixLogo}
                  alt="Pantrix logo"
                  className="recipe-limits-brand__logo"
                />
                <div>
                  <h1 className="recipe-limits-brand__title">
                    Search Results Maximum Limit
                  </h1>
                  <p className="recipe-limits-brand__subtitle">
                    Set the maximum number of recipes displayed per search.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container recipe-limits-main">
        <div className="recipe-limits-layout">
          <div className="card recipe-limits-card">
            <div className="card-header">
              <h2 className="card-title">Search Results Maximum Limit</h2>
              <p className="card-description">
                Choose how many recipes can appear in one search result.
              </p>
            </div>

            <div className="card-content recipe-limits-form">
              <div className="recipe-limits-form-group">
                <label htmlFor="max-recipes">Maximum Recipes Per Search</label>
                <input
                  id="max-recipes"
                  type="number"
                  min="1"
                  max="200"
                  className="input recipe-limits-input"
                  value={maxRecipes}
                  onChange={handleChange}
                  placeholder="20"
                />

                {error && <p className="recipe-limits-error">{error}</p>}

                <p className="recipe-limits-help-text">
                  Enter a number greater than 0.
                </p>

                {isValid && !error && (
                  <p className="recipe-limits-preview">
                    Current value: <strong>{parsedValue}</strong> recipes per search
                  </p>
                )}
              </div>

              <div className="recipe-limits-actions-wrap">
                {hasUnsavedChanges && (
                  <p className="recipe-limits-unsaved">
                    You have unsaved changes.
                  </p>
                )}

                <div className="recipe-limits-actions">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecipeLimits;