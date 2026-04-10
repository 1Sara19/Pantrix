import { Clock3 } from "lucide-react";
import "../styles/components/FilterPanel.css";

const cookTimeOptions = [
  { label: "10 minutes", value: "10" },
  { label: "30 minutes", value: "30" },
  { label: "1 hour", value: "60" },
  { label: "Open time", value: "" },
];

const dietOptions = [
  "Vegetarian",
  "High Protein",
  "Healthy",
  "Light Meal",
  "Comfort Food",
];

const allergyOptions = [
  "Dairy",
  "Eggs",
  "Peanuts",
  "Tree Nuts",
  "Gluten / Wheat",
  "Soy",
  "Fish",
  "Seafood",
];

export default function FilterPanel({ filters, setFilters }) {
  const handleCookTimeChange = (value) => {
    setFilters({ ...filters, cookTime: value });
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

  const handleExcludeToggle = (value) => {
    const currentExcluded = filters.exclude
      ? filters.exclude.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const exists = currentExcluded.includes(value);

    const updatedExcluded = exists
      ? currentExcluded.filter((item) => item !== value)
      : [...currentExcluded, value];

    setFilters({
      ...filters,
      exclude: updatedExcluded.join(", "),
    });
  };

  const isExcludedChecked = (value) => {
    const currentExcluded = filters.exclude
      ? filters.exclude.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    return currentExcluded.includes(value);
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h2 className="filter-panel-title">Filter Recipes</h2>
        <p className="filter-panel-subtitle">
          Refine your recipe search with filters
        </p>
      </div>

      <div className="filter-section">
        <div className="filter-section-heading">
          <Clock3 size={16} />
          <span>Cook in X Minutes</span>
        </div>

        <div className="cook-time-options">
          {cookTimeOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              className={`cook-time-button ${
                filters.cookTime === option.value ? "active" : ""
              }`}
              onClick={() => handleCookTimeChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-section-title">Diet Mode</label>

        <div className="filter-checkbox-group">
          {dietOptions.map((item) => (
            <label className="filter-checkbox-item" key={item}>
              <input
                type="checkbox"
                checked={filters.dietary.includes(item)}
                onChange={() => handleDietaryChange(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-section-title">
          Exclude Ingredients / Allergies
        </label>

        <p className="filter-section-note">
          Saved preferences are automatically applied
        </p>

        <div className="filter-checkbox-group">
          {allergyOptions.map((item) => (
            <label className="filter-checkbox-item" key={item}>
              <input
                type="checkbox"
                checked={isExcludedChecked(item)}
                onChange={() => handleExcludeToggle(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}