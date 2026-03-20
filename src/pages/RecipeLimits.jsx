import { useState } from "react";
import "../styles/recipe-limits.css";
import pantrixLogo from "../assets/images/Pantrix.png";
import { Link } from "react-router-dom";

function RecipeLimits() {
  const [maxRecipes, setMaxRecipes] = useState("20");
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleSave = () => {
    const value = parseInt(maxRecipes, 10);

    if (isNaN(value) || value < 1) {
      showToast("Please enter a valid number greater than 0.");
      return;
    }

    showToast(`Search results limit updated to ${value} recipes.`);
  };

  const displayValue = parseInt(maxRecipes, 10);
  const isValid = !isNaN(displayValue) && displayValue >= 1;


  return (
    <div className="recipe-limits-page">
      {toast && <div className="toast">{toast}</div>}

      <header className="recipe-limits-header">
        <div className="container">
          <div className="recipe-limits-header__content">
            <div className="recipe-limits-header__left">
                <Link to="/admin" className="btn btn-ghost recipe-limits-back" >
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
                Set the maximum number of recipes displayed per search.
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
                  onChange={(e) => setMaxRecipes(e.target.value)}
                  placeholder="20"
                />
                <p className="text-small">
                  This defines how many recipes appear in the search results page.
                </p>
              </div>

              <div className="recipe-limits-summary">
                <h3 className="recipe-limits-summary__title">Current Setting</h3>

                <p className="recipe-limits-summary__value">
                  {isValid ? `Maximum ${displayValue} recipes per search` : "—"}
                </p>

                {isValid && (
                  <p className="recipe-limits-summary__text">
                    When a user performs a search, only the top{" "}
                    <strong>{displayValue}</strong> matching recipes will be displayed.
                  </p>
                )}
              </div>

              <div className="recipe-limits-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>

          <div className="card recipe-limits-info">
            <div className="card-header">
              <h3 className="card-title">How This Setting Works</h3>
            </div>

            <div className="card-content recipe-limits-info__content">
              <div className="recipe-limits-info__item">
                <span className="recipe-limits-info__icon">🔍</span>
                <p>
                  When a user performs a search, the system ranks all matching recipes.
                </p>
              </div>

              <div className="recipe-limits-info__item">
                <span className="recipe-limits-info__icon">📋</span>
                <p>
                  Only the top results based on this limit are shown to the user.
                </p>
              </div>

              <div className="recipe-limits-info__item">
                <span className="recipe-limits-info__icon">📊</span>
                <p>
                  This is a display limit only. It does not limit how many searches
                  the user can perform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecipeLimits;