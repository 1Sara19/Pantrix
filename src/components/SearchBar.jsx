import { useState } from "react";
import { Search } from "lucide-react";
import "../styles/components/SearchBar.css";

export default function SearchBar({ ingredients, setIngredients }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/api/recipes/ingredients/suggestions?query=${value}`
      );

      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const addIngredient = () => {
    const cleanedInput = input
      .toLowerCase()
      .replace(/[^a-z,\s]/g, "");

    const values = cleanedInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (values.length === 0) return;

    const newIngredients = values.filter(
      (item) => !ingredients.includes(item)
    );

    setIngredients([...ingredients, ...newIngredients]);
    setInput("");
    setSuggestions([]);
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const clearAll = () => {
    setIngredients([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="search-card">
      <h2 className="search-title">What ingredients do you have?</h2>

      <div className="search-input-container">
        <Search className="search-icon" />

        <input
          type="text"
          placeholder="Type an ingredient (e.g., chicken, tomato)"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((item) => (
            <div
              key={item.id || item.name}
              className="suggestion-item"
              onClick={() => {
                setInput(item.name);
                setSuggestions([]);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      {ingredients.length > 0 && (
        <div className="ingredients-section">
          <div className="ingredients-header">
            <span>Your Ingredients ({ingredients.length})</span>

            <button className="clear-btn" onClick={clearAll}>
              Clear all
            </button>
          </div>

          <div className="ingredients-tags">
            {ingredients.map((ingredient) => (
              <div key={ingredient} className="ingredient-tag">
                {ingredient}

                <button
                  className="remove-tag"
                  onClick={() => removeIngredient(ingredient)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}