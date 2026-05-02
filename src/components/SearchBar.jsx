import { useState } from "react";
import { Search } from "lucide-react";
import "../styles/components/SearchBar.css";

export default function SearchBar({ ingredients, setIngredients }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchSuggestions = async (value) => {
    if (!value.trim() || value.trim().length < 2) {      
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://pantrix-backend.onrender.com/api/recipes/ingredients/suggestions?query=${value}`
      );

      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const addIngredientValue = (value) => {
    const cleanedValue = value.toLowerCase().trim();

    if (!cleanedValue || ingredients.includes(cleanedValue)) return;

    setIngredients([...ingredients, cleanedValue]);
    setInput("");
    setSuggestions([]);
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
      const match = suggestions.find(
          (item) => item.name.toLowerCase() === input.toLowerCase().trim()
        );
        if (match) {
          addIngredientValue(match.name);
        } else {
          setInput("");
        }
        setSuggestions([]);
        setShowDropdown(false);
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

        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((item) => (
              <button
                type="button"
                key={item.id || item.name}
                className="suggestion-item"
                onClick={() => addIngredientValue(item.name)}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="suggestion-img"
                  />
                )}

                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

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