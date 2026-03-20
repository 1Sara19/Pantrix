import { useState } from "react";
import "../styles/manage-filters.css";
import pantrixLogo from "../assets/images/Pantrix.png";
import { Link } from "react-router-dom";

function ManageFilters() {
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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleAdd = (value, setValue, list, setList, label) => {
    if (value.trim()) {
      setList([...list, value.trim()]);
      setValue("");
      showToast(`${label} added`);
    }
  };

  const handleRemove = (index, list, setList, label) => {
    setList(list.filter((_, i) => i !== index));
    showToast(`${label} removed`);
  };

  const handleSaveChanges = () => {
    showToast("Filter settings saved");
  };

  const renderSection = (title, list, setList, value, setValue, label) => (
    <div className="card manage-filters-card">
      <h3>{title}</h3>

      <div className="manage-filters-tags">
        {list.map((item, index) => (
          <div key={index} className="manage-filters-tag">
            <span>{item}</span>
            <button
              onClick={() => handleRemove(index, list, setList, label)}
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
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleAdd(value, setValue, list, setList, label)
          }
        />
        <button
          className="btn btn-primary"
          onClick={() =>
            handleAdd(value, setValue, list, setList, label)
          }
        >
          Add
        </button>
      </div>
    </div>
  );

  return (
    <div className="manage-filters-page">
      {toast && <div className="toast">{toast}</div>}

      {/* Header */}
        <header className="manage-filters-header">
            <div className="container">
                <Link to="/admin" className="btn btn-ghost manage-filters-back" >
                 ← Back to Dashboard
                </Link>

                <div className="manage-filters-brand">
                <img src={pantrixLogo} className="manage-filters-logo" alt="Pantrix logo" />
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
          setNewCookingTime,
          "Cooking time"
        )}

        {renderSection(
          "Food Types",
          foodTypes,
          setFoodTypes,
          newFoodType,
          setNewFoodType,
          "Food type"
        )}

        {renderSection(
          "Dietary Options",
          dietaryOptions,
          setDietaryOptions,
          newDietaryOption,
          setNewDietaryOption,
          "Dietary option"
        )}

        <div className="manage-filters-save">
          <button className="btn btn-primary" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}

export default ManageFilters;