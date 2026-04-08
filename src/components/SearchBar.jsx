import { useState } from "react";
import "../styles/components/SearchBar.css";

export default function SearchBar({ ingredients, setIngredients }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const addIngredient = () => {
    const value = input.trim().toLowerCase();

    if (!value) {
      setError("Please enter an ingredient");
      return;
    }

    if (ingredients.includes(value)) {
      setError("This ingredient is already added");
      return;
    }

    setIngredients([...ingredients, value]);
    setInput("");
    setError("");
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const clearAll = () => {
    setIngredients([]);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-header">
        <h1 className="search-bar-title">What can you cook today?</h1>
        <p className="search-bar-subtitle">
          Add the ingredients you have, and we’ll match recipes based on them
        </p>
      </div>

      <div className="search-input-wrapper">
        <input
          type="text"
          className={`search-input ${error ? "search-input-error" : ""}`}
          placeholder="e.g., chicken, tomatoes, garlic..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={handleKeyDown}
        />

        <button className="search-button" onClick={addIngredient}>
          <span className="search-icon">＋</span>
          Add Ingredient
        </button>
      </div>

      {error && <p className="search-error-message">{error}</p>}

      {ingredients.length > 0 && (
        <div className="ingredients-box">
          <div className="ingredients-header">
            <p className="ingredients-title">
              Your Ingredients ({ingredients.length})
            </p>

            <button className="clear-ingredients-button" onClick={clearAll}>
              Clear All
            </button>
          </div>

          <div className="ingredients-tags">
            {ingredients.map((ingredient) => (
              <div className="ingredient-tag" key={ingredient}>
                <span>{ingredient}</span>
                <button
                  className="ingredient-remove"
                  onClick={() => removeIngredient(ingredient)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="match-score-info">
        <div className="match-score-badge">
          <span className="match-score-icon">✨</span>
          <span>Smart Match Score</span>
        </div>
        <p className="match-score-description">
          Recipes are ranked by how many of your ingredients they use
        </p>
      </div>
    </div>
  );
}