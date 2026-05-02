import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import "../styles/components/FilterPanel.css";
import { getActiveFilters } from "../services/filterService";

const defaultCookTimeOptions = [
  { label: "10 minutes", value: "10" },
  { label: "30 minutes", value: "30" },
  { label: "1 hour", value: "60" },
  { label: "Open time", value: "" },
];

export default function FilterPanel({ filters, setFilters }) {
  const [cookTimeOptions, setCookTimeOptions] = useState(defaultCookTimeOptions);
  const [dietOptions, setDietOptions] = useState([]);
  const [allergyOptions, setAllergyOptions] = useState([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data = await getActiveFilters();

        const cookTimes = (data.cookTime || []).map((item) => {
          const label = item.name || item.value;
          const numericValue = String(item.value || item.name).replace(/\D/g, "");

          return {
            label,
            value: numericValue,
          };
        });

        const dietary = (data.dietary || []).map(
          (item) => item.name || item.value
        );

        const allergies = (data.allergy || []).map(
          (item) => item.name || item.value
        );

        if (cookTimes.length > 0) {
          setCookTimeOptions([
            ...cookTimes,
            { label: "Open time", value: "" },
          ]);
        }

        setDietOptions(dietary);
        setAllergyOptions(allergies);
      } catch (error) {
        console.error("Failed to load filters:", error);
      }
    };

    loadFilters();
  }, []);

  const handleCookTimeChange = (value) => {
    setFilters({ ...filters, cookTime: value });
  };

  const handleDietaryChange = (value) => {
    const currentDietary = filters.dietary || [];
    const exists = currentDietary.includes(value);

    if (exists) {
      setFilters({
        ...filters,
        dietary: currentDietary.filter((item) => item !== value),
      });
    } else {
      setFilters({
        ...filters,
        dietary: [...currentDietary, value],
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
        <label className="filter-section-title">Food Type</label>

        <div className="filter-checkbox-group">
          {dietOptions.length === 0 ? (
            <p className="filter-section-note">No food type filters available.</p>
          ) : (
            dietOptions.map((item) => (
              <label className="filter-checkbox-item" key={item}>
                <input
                  type="checkbox"
                  checked={(filters.dietary || []).includes(item)}
                  onChange={() => handleDietaryChange(item)}
                />
                <span>{item}</span>
              </label>
            ))
          )}
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
          {allergyOptions.length === 0 ? (
            <p className="filter-section-note">No allergy filters available.</p>
          ) : (
            allergyOptions.map((item) => (
              <label className="filter-checkbox-item" key={item}>
                <input
                  type="checkbox"
                  checked={isExcludedChecked(item)}
                  onChange={() => handleExcludeToggle(item)}
                />
                <span>{item}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
}