import { useEffect, useState } from "react";
import "../styles/pages/ManageFilters.css";
import { Link } from "react-router-dom";
import {
  getAdminFilters,
  saveFilterOption,
  deleteFilterOption,
} from "../services/filterService";

const FILTER_TYPES = {
  cookingTime: "cookTime",
  foodType: "dietary",
  dietaryOption: "allergy",
};

function ManageFilters() {
  const [cookingTimes, setCookingTimes] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [dietaryOptions, setDietaryOptions] = useState([]);

  const [newCookingTime, setNewCookingTime] = useState("");
  const [newFoodType, setNewFoodType] = useState("");
  const [newDietaryOption, setNewDietaryOption] = useState("");

  const [deletedFilters, setDeletedFilters] = useState([]);
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const normalizeFilter = (item) => ({
    id: item._id || item.id || crypto.randomUUID(),
    name: item.name || item.value || item.label,
    value: item.value || item.name || item.label,
    type: item.type,
    isNew: item.isNew || false,
  });

  const loadFilters = async () => {
    try {
      setIsLoading(true);

      const data = await getAdminFilters();

      setCookingTimes((data.cookTime || []).map(normalizeFilter));
      setFoodTypes((data.dietary || []).map(normalizeFilter));
      setDietaryOptions((data.allergy || []).map(normalizeFilter));
    } catch (error) {
      showToast(error.message || "Failed to load filters.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  const handleAdd = (value, setValue, list, setList, type, label) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      showToast("Please enter a value first.");
      return;
    }

    const isDuplicate = list.some(
      (item) => item.name.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (isDuplicate) {
      showToast(`${label} already exists.`);
      return;
    }

    const newFilter = {
      id: crypto.randomUUID(),
      name: trimmedValue,
      value: trimmedValue,
      type,
      isNew: true,
    };

    setList([...list, newFilter]);
    setValue("");
    setHasUnsavedChanges(true);
    showToast(`${label} added locally. Click Save Changes to save.`);
  };

  const handleRemove = (item, list, setList, label) => {
    if (!item.isNew) {
      setDeletedFilters((prev) => [...prev, item]);
    }

    setList(list.filter((filter) => filter.id !== item.id));
    setHasUnsavedChanges(true);
    showToast(`${label} removed locally. Click Save Changes to save.`);
  };

  const getAllFilters = () => {
    return [...cookingTimes, ...foodTypes, ...dietaryOptions];
  };

  const handleSaveChanges = async () => {
    try {
      const allFilters = getAllFilters();
      const newFilters = allFilters.filter((item) => item.isNew);

      for (const filter of newFilters) {
        await saveFilterOption({
          name: filter.name,
          value: filter.value,
          type: filter.type,
        });
      }

      for (const filter of deletedFilters) {
        await deleteFilterOption(filter.id);
      }

      setDeletedFilters([]);
      setHasUnsavedChanges(false);
      showToast("Filter settings saved successfully.");

      await loadFilters();
    } catch (error) {
      showToast(error.message || "Failed to save filter changes.");
    }
  };

  const renderSection = (
    title,
    list,
    setList,
    value,
    setValue,
    type,
    label,
    placeholder
  ) => (
    <div className="card manage-filters-card">
      <h3>{title}</h3>

      <div className="manage-filters-tags">
        {list.length === 0 ? (
          <p className="text-muted">No options available.</p>
        ) : (
          list.map((item) => (
            <div key={item.id || item.name} className="manage-filters-tag">
              <span>{item.name}</span>

              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => handleRemove(item, list, setList, label)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div className="manage-filters-input">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd(value, setValue, list, setList, type, label);
            }
          }}
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAdd(value, setValue, list, setList, type, label)}
        >
          Add
        </button>
      </div>
    </div>
  );

  return (
    <div className="manage-filters-page">
      {toast && <div className="toast">{toast}</div>}

      <header className="manage-filters-header">
        <div className="container">
          <Link to="/admin" className="btn btn-ghost manage-filters-back">
            ← Back to Dashboard
          </Link>

          <div className="manage-filters-brand">
            <div>
              <h1>Manage Filters</h1>
              <p>Edit cooking times, food types, and dietary options</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container manage-filters-main">
        {isLoading ? (
          <div className="card manage-filters-card">
            <p className="text-muted">Loading filters...</p>
          </div>
        ) : (
          <>
            {renderSection(
              "Cooking Time Categories",
              cookingTimes,
              setCookingTimes,
              newCookingTime,
              setNewCookingTime,
              FILTER_TYPES.cookingTime,
              "Cooking time",
              "e.g., 90-120 minutes"
            )}

            {renderSection(
              "Food Types",
              foodTypes,
              setFoodTypes,
              newFoodType,
              setNewFoodType,
              FILTER_TYPES.foodType,
              "Food type",
              "e.g., Vegan"
            )}

            {renderSection(
              "Allergies",
              dietaryOptions,
              setDietaryOptions,
              newDietaryOption,
              setNewDietaryOption,
              FILTER_TYPES.dietaryOption,
              "Allergy option",
              "e.g., Nut"
            )}

            <div className="manage-filters-save-wrap">
              {hasUnsavedChanges && (
                <p className="manage-filters-unsaved">
                  You have unsaved changes.
                </p>
              )}

              <div className="manage-filters-save">
                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default ManageFilters;