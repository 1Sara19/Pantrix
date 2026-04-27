import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Calendar,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Search,
  Trash2,
} from "lucide-react";
import "../styles/pages/MealPlan.css";
import recipes from "../data/recipes";

const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const MEAL_TYPES = ["breakfast", "lunch", "dinner"];

function createEmptyPlan() {
  const emptyPlan = {};
  DAYS.forEach((day) => {
    emptyPlan[day] = {
      breakfast: { recipeId: null },
      lunch: { recipeId: null },
      dinner: { recipeId: null },
    };
  });
  return emptyPlan;
}

function getWeekStartDate(offset = 0) {
  const today = new Date();
  const currentDay = today.getDay();

  // JavaScript:
  // Sunday = 0
  // Monday = 1
  // ...
  // Saturday = 6
  const daysSinceSaturday = (currentDay - 6 + 7) % 7;

  const startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(today.getDate() - daysSinceSaturday + offset * 7);

  return startDate;
}

function getWeekStorageKey(offset = 0, userId = null) {
  const startDate = getWeekStartDate(offset);
  const formattedDate = startDate.toISOString().split("T")[0];

  return userId
    ? `mealPlan_${userId}_${formattedDate}`
    : `mealPlan_${formattedDate}`;
}

function MealPlan() {
  const navigate = useNavigate();

  const [weekOffset, setWeekOffset] = useState(0);
  const [weekPlan, setWeekPlan] = useState(createEmptyPlan());
  const [addMealDialog, setAddMealDialog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const userId = localStorage.getItem("userId");
  const favoritesKey = userId ? `favorites_${userId}` : null;

  useEffect(() => {
    const storageKey = getWeekStorageKey(weekOffset, userId);
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setWeekPlan(JSON.parse(saved));
    } else {
      setWeekPlan(createEmptyPlan());
    }
  }, [weekOffset, userId]);

  const saveMealPlan = (plan) => {
    const storageKey = getWeekStorageKey(weekOffset, userId);
    setWeekPlan(plan);
    localStorage.setItem(storageKey, JSON.stringify(plan));
  };

  const getWeekRange = () => {
    const startDate = getWeekStartDate(weekOffset);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const formatDate = (date) => {
      const month = date.toLocaleString("default", { month: "short" });
      return `${month} ${date.getDate()}`;
    };

    return `${formatDate(startDate)} – ${formatDate(endDate)}`;
  };

  const handleAddRecipe = (day, mealType) => {
    setAddMealDialog({ day, mealType });
    setSearchQuery("");
  };

  const handleSelectRecipe = (recipeId) => {
    if (!addMealDialog) return;

    const newPlan = {
      ...weekPlan,
      [addMealDialog.day]: {
        ...weekPlan[addMealDialog.day],
        [addMealDialog.mealType]: { recipeId },
      },
    };

    saveMealPlan(newPlan);
    setAddMealDialog(null);
    toast.success("Recipe added to meal plan.");
  };

  const handleRemoveRecipe = (day, mealType) => {
    const newPlan = {
      ...weekPlan,
      [day]: {
        ...weekPlan[day],
        [mealType]: { recipeId: null },
      },
    };

    saveMealPlan(newPlan);
    toast.success("Meal removed from plan.");
  };

  const handleClearWeek = () => {
    const emptyWeek = createEmptyPlan();
    saveMealPlan(emptyWeek);
    toast.success("Week plan cleared");
  };

  const getRecipe = (recipeId) => {
    if (!recipeId) return null;
    return recipes.find((recipe) => recipe.id === recipeId) || null;
  };

  const favoriteRecipeIds =
    favoritesKey ? JSON.parse(localStorage.getItem(favoritesKey)) || [] : [];

  const favoriteRecipes = recipes.filter((recipe) =>
    favoriteRecipeIds.includes(recipe.id)
  );

  const filteredRecipes = searchQuery.trim()
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : recipes;

  return (
    <div className="mealplan-page-wrapper">
      <section className="mealplan-content-section">
        <div className="container mealplan-page">
          <button
            type="button"
            className="btn btn-ghost back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="mealplan-header">
            <div className="mealplan-title-wrap">
              <div className="mealplan-icon-box">
                <Calendar size={28} />
              </div>

              <div>
                <h1>Meal Planning</h1>
                <p className="mealplan-subtitle">Plan your meals for the week</p>
              </div>
            </div>
          </div>

          <div className="card week-selector-card">
            <div className="week-selector">
              <button
                type="button"
                className="week-nav-btn"
                onClick={() => setWeekOffset((prev) => prev - 1)}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="week-range">
                <p className="week-range-title">{getWeekRange()}</p>
                {weekOffset === 0 && (
                  <p className="week-range-subtitle">This Week</p>
                )}
              </div>

              <button
                type="button"
                className="week-nav-btn"
                onClick={() => setWeekOffset((prev) => prev + 1)}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="mealplan-days">
            {DAYS.map((day) => (
              <div key={day} className="card day-card">
                <div className="day-card-header">
                  <h2>{day}</h2>
                </div>

                <div className="meal-slots-grid">
                  {MEAL_TYPES.map((mealType) => {
                    const recipe = getRecipe(
                      weekPlan[day]?.[mealType]?.recipeId || null
                    );

                    return (
                      <div key={mealType} className="meal-slot-card">
                        <p className="meal-type-label">
                          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                        </p>

                        {recipe ? (
                          <div className="meal-slot-filled">
                            <div className="meal-recipe-info">
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="meal-recipe-image"
                              />

                              <div>
                                <p className="meal-recipe-name">{recipe.title}</p>
                                <p className="meal-recipe-meta">
                                  {recipe.cookTime} min
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="meal-remove-btn"
                              onClick={() => handleRemoveRecipe(day, mealType)}
                            >
                              <X size={14} />
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="meal-add-recipe-btn"
                            onClick={() => handleAddRecipe(day, mealType)}
                          >
                            <Plus size={20} />
                            Add Recipe
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mealplan-actions">
            <button
              type="button"
              className="btn btn-secondary clear-week-btn"
              onClick={handleClearWeek}
            >
              <Trash2 size={18} />
              Clear Week Plan
            </button>
          </div>
        </div>
      </section>



      {addMealDialog && (
        <div className="modal-overlay" onClick={() => setAddMealDialog(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                Select Recipe for {addMealDialog.day} {addMealDialog.mealType}
              </h2>

              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={() => setAddMealDialog(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="meal-search-box">
              <Search size={16} className="meal-search-icon" />
              <input
                type="text"
                className="input meal-search-input"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {!searchQuery && favoriteRecipes.length > 0 && (
              <div className="recipe-section">
                <p className="recipe-section-title">Your Favorites</p>

                <div className="recipe-list">
                  {favoriteRecipes.map((recipe) => (
                    <button
                      type="button"
                      key={recipe.id}
                      className="recipe-list-item"
                      onClick={() => handleSelectRecipe(recipe.id)}
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-list-image"
                      />

                      <div className="recipe-list-text">
                        <p className="recipe-list-name">{recipe.title}</p>
                        <p className="text-small">
                          {recipe.cookTime} min • {recipe.servings} servings
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="recipe-section">
              <p className="recipe-section-title">
                {searchQuery ? "Search Results" : "All Recipes"}
              </p>

              <div className="recipe-list recipe-list-scroll">
                {filteredRecipes.map((recipe) => (
                  <button
                    type="button"
                    key={recipe.id}
                    className="recipe-list-item"
                    onClick={() => handleSelectRecipe(recipe.id)}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipe-list-image"
                    />

                    <div className="recipe-list-text">
                      <p className="recipe-list-name">{recipe.title}</p>
                      <p className="text-small">
                        {recipe.cookTime} min • {recipe.servings} servings
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealPlan;