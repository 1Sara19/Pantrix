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
import "../styles/mealplan.css";

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

const MOCK_RECIPES = [
  {
    id: "1",
    name: "Creamy Pasta",
    cookTime: 25,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Chicken Salad",
    cookTime: 15,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Vegetable Soup",
    cookTime: 30,
    servings: 4,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Avocado Toast",
    cookTime: 10,
    servings: 1,
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80",
  },
];

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

function MealPlan() {
  const navigate = useNavigate();

  const [user] = useState({
    name: "Shathaalbraiki",
    favoriteRecipes: ["1", "2"],
  });

  const [weekOffset, setWeekOffset] = useState(0);
  const [weekPlan, setWeekPlan] = useState({});
  const [addMealDialog, setAddMealDialog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("mealPlan");

    if (saved) {
      setWeekPlan(JSON.parse(saved));
    } else {
      setWeekPlan(createEmptyPlan());
    }
  }, []);

  const saveMealPlan = (plan) => {
    setWeekPlan(plan);
    localStorage.setItem("mealPlan", JSON.stringify(plan));
  };

  const getWeekRange = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const daysToSaturday = currentDay === 6 ? 0 : (6 - currentDay + 7) % 7;

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysToSaturday + weekOffset * 7);

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

    const newPlan = { ...weekPlan };

    if (!newPlan[addMealDialog.day]) {
      newPlan[addMealDialog.day] = {
        breakfast: { recipeId: null },
        lunch: { recipeId: null },
        dinner: { recipeId: null },
      };
    }

    newPlan[addMealDialog.day][addMealDialog.mealType] = { recipeId };
    saveMealPlan(newPlan);
    setAddMealDialog(null);
    toast.success("Recipe added to meal plan.");
  };

  const handleRemoveRecipe = (day, mealType) => {
    const newPlan = { ...weekPlan };

    if (newPlan[day]) {
      newPlan[day][mealType] = { recipeId: null };
      saveMealPlan(newPlan);
      toast.success("Meal removed from plan.");
    }
  };
  const handleClearWeek = () => {
    saveMealPlan(createEmptyPlan());
    toast.success("Week plan cleared");
  };

  const getRecipe = (recipeId) => {
    if (!recipeId) return null;
    return MOCK_RECIPES.find((recipe) => recipe.id === recipeId) || null;
  };

  const favoriteRecipes = MOCK_RECIPES.filter((recipe) =>
    user.favoriteRecipes.includes(recipe.id)
  );

  const filteredRecipes = searchQuery.trim()
    ? MOCK_RECIPES.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_RECIPES;

  return (
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
            <Calendar size={24} />
          </div>

          <div>
            <h1>Meal Planning</h1>
            <p className="text-muted">Plan your meals for the week</p>
          </div>
        </div>
      </div>

      <div className="card week-selector-card">
        <div className="week-selector">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setWeekOffset(weekOffset - 1)}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="week-range">
            <p className="week-range-title">{getWeekRange()}</p>
            {weekOffset === 0 && <p className="text-small">This Week</p>}
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setWeekOffset(weekOffset + 1)}
          >
            Next
            <ChevronRight size={16} />
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
                const recipe = getRecipe(weekPlan[day]?.[mealType]?.recipeId || null);

                return (
                  <div key={mealType} className="meal-slot-card">
                    <p className="meal-type-label">{mealType}</p>

                    {recipe ? (
                      <div className="meal-slot-filled">
                        <div className="meal-recipe-info">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="meal-recipe-image"
                          />

                          <div>
                            <p className="meal-recipe-name">{recipe.name}</p>
                            <p className="text-small">{recipe.cookTime} min</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn btn-ghost btn-sm meal-remove-btn"
                          onClick={() => handleRemoveRecipe(day, mealType)}
                        >
                          <X size={14} />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm meal-add-recipe-btn"
                        onClick={() => handleAddRecipe(day, mealType)}
                      >
                        <Plus size={16} />
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
          <Trash2 size={16} />
          Clear Week Plan
        </button>
      </div>

      {addMealDialog && (
        <div
          className="modal-overlay"
          onClick={() => setAddMealDialog(null)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
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
                        alt={recipe.name}
                        className="recipe-list-image"
                      />

                      <div className="recipe-list-text">
                        <p className="recipe-list-name">{recipe.name}</p>
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
                      alt={recipe.name}
                      className="recipe-list-image"
                    />

                    <div className="recipe-list-text">
                      <p className="recipe-list-name">{recipe.name}</p>
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