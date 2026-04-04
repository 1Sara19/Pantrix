import { useEffect, useState } from "react";
import "../styles/manage-filters.css";
import pantrixLogo from "../assets/images/Pantrix.png";
import { Link, useNavigate } from "react-router-dom";

function ManageFilters() {
  const navigate = useNavigate();

  const [cookingTimes, setCookingTimes] = useState([
    "0-15 minutes",
    "15-30 minutes",
    "30-45 minutes",
    "45-60 minutes",
    "60+ minutes",
  ]);

  const [foodTypes, setFoodTypes] = useState([
    "Vegetarian",
    "Chicken",
    "Beef",
    "Seafood",
    "Pork",
    "Vegan",
  ]);

  const [dietaryOptions, setDietaryOptions] = useState([
    "Gluten-free",
    "Dairy-free",
    "Nut-free",
    "Low-carb",
    "Keto",
    "Paleo",
  ]);

  const [newCookingTime, setNewCookingTime] = useState("");
  const [newFoodType, setNewFoodType] = useState("");
  const [newDietaryOption, setNewDietaryOption] = useState("");

  const [toast, setToast] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

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
      return;
    }
  };

  const handleAdd = (value, setValue, list, setList) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    const isDuplicate = list.some(
      (item) => item.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (isDuplicate) return;

    setList([...list, trimmedValue]);
    setValue("");
    setHasUnsavedChanges(true);
  };

  const handleRemove = (index, list, setList) => {
    setList(list.filter((_, i) => i !== index));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    setHasUnsavedChanges(false);
    showToast("Filter settings saved successfully");
  };

  const renderSection = (title, list, setList, value, setValue) => (
    <div className="card manage-filters-card">
      <h3>{title}</h3>

      <div className="manage-filters-tags">
        {list.map((item, index) => (
          <div key={index} className="manage-filters-tag">
            <span>{item}</span>
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={() => handleRemove(index, list, setList)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="manage-filters-input">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd(value, setValue, list, setList);
            }
          }}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAdd(value, setValue, list, setList)}
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
          <Link
            to="/admin"
            className="btn btn-ghost manage-filters-back"
            onClick={handleBackClick}
          >
            ← Back to Dashboard
          </Link>

          <div className="manage-filters-brand">
            <img
              src={pantrixLogo}
              className="manage-filters-logo"
              alt="Pantrix logo"
            />
            <div>
              <h1>Manage Filters</h1>
              <p>Edit cooking times, food types, and dietary options</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container manage-filters-main">
        {renderSection(
          "Cooking Time Categories",
          cookingTimes,
          setCookingTimes,
          newCookingTime,
          setNewCookingTime
        )}

        {renderSection(
          "Food Types",
          foodTypes,
          setFoodTypes,
          newFoodType,
          setNewFoodType
        )}

        {renderSection(
          "Dietary Options",
          dietaryOptions,
          setDietaryOptions,
          newDietaryOption,
          setNewDietaryOption
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
      </main>
    </div>
  );
}

export default ManageFilters;