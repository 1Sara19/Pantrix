import { useState } from "react";
import { Search } from "lucide-react";
import "../styles/components/SearchBar.css";

export default function SearchBar({ ingredients, setIngredients }) {
  const [input, setInput] = useState("");

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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
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