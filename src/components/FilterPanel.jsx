import "../styles/FilterPanel.css";

export default function FilterPanel({ filters, setFilters }) {
  const handleCookTimeChange = (e) => {
    setFilters({ ...filters, cookTime: e.target.value });
  };

  const handleDietaryChange = (value) => {
    const exists = filters.dietary.includes(value);

    if (exists) {
      setFilters({
        ...filters,
        dietary: filters.dietary.filter((item) => item !== value),
      });
    } else {
      setFilters({
        ...filters,
        dietary: [...filters.dietary, value],
      });
    }
  };

  const handleExcludeChange = (e) => {
    setFilters({ ...filters, exclude: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      cookTime: "",
      dietary: [],
      exclude: "",
    });
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-panel-title">Filters</h3>

      <div className="filter-section">
        <label className="filter-label">Cooking Time</label>
        <select
          className="filter-select"
          value={filters.cookTime}
          onChange={handleCookTimeChange}
        >
          <option value="">Any time</option>
          <option value="15">Under 15 min</option>
          <option value="30">Under 30 min</option>
          <option value="60">Under 1 hour</option>
          <option value="120">Under 2 hours</option>
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Dietary Preferences</label>
        <div className="filter-checkboxes">
          {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map((item) => (
            <label className="checkbox-label" key={item}>
              <input
                type="checkbox"
                className="checkbox-input"
                checked={filters.dietary.includes(item)}
                onChange={() => handleDietaryChange(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Exclude Ingredients</label>
        <input
          type="text"
          className="filter-input"
          placeholder="e.g., nuts, shellfish..."
          value={filters.exclude}
          onChange={handleExcludeChange}
        />
        <p className="filter-hint">Add allergies or ingredients to avoid</p>
      </div>

      <button className="filter-clear-button" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );
}