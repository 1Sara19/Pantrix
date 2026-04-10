import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ChefHat, Clock3, ChevronDown } from "lucide-react";
import "../styles/favorites.css";

function Favorites() {
  const navigate = useNavigate();

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const recipes = [
    {
      id: 1,
      title: "Classic Chicken Stir-Fry",
      image:
        "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80",
      cookTime: "20 minutes",
      servings: "4 servings",
      tags: ["High Protein", "Healthy"],
      difficulty: "Easy",
      matchScore: 95,
      ingredients: [
        "2 chicken breasts",
        "1 bell pepper",
        "1 carrot",
        "2 tbsp soy sauce",
        "1 onion",
        "2 garlic cloves",
        "1 tbsp oil",
      ],
      instructions: [
        "Slice the chicken and vegetables into thin strips.",
        "Heat oil in a pan and cook the chicken until lightly golden.",
        "Add onion, garlic, carrot, and bell pepper.",
        "Pour in soy sauce and stir-fry for a few minutes.",
        "Serve hot.",
      ],
      missingIngredients: [],
    },
    {
      id: 2,
      title: "Creamy Tomato Pasta",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
      cookTime: "25 minutes",
      servings: "3 servings",
      tags: ["Vegetarian", "Comfort Food"],
      difficulty: "Easy",
      matchScore: 92,
      ingredients: [
        "Pasta",
        "Cooking cream",
        "Parmesan cheese",
        "Garlic",
        "Butter",
      ],
      instructions: [
        "Boil the pasta until al dente.",
        "Melt butter and sauté garlic.",
        "Add cream and parmesan cheese.",
        "Mix in the pasta and serve warm.",
      ],
      missingIngredients: [],
    },
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const likedRecipes = recipes.filter(
      (recipe) => localStorage.getItem(`liked_recipe_${recipe.id}`) === "true"
    );
    setFavoriteRecipes(likedRecipes);
  };

  const handleRemoveFavorite = (id) => {
    localStorage.setItem(`liked_recipe_${id}`, "false");

    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null);
    }

    loadFavorites();
  };

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);

    const savedReviews = localStorage.getItem(`recipe_reviews_${recipe.id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews([]);
    }
  };

  return (
    <div className="favorites-page-wrapper">
      <section className="favorites-content-section">
        <div className="container favorites-page">
          <button
            type="button"
            className="btn btn-ghost favorites-back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <div className="favorites-header">
            <div className="favorites-title-wrap">
              <div className="favorites-icon-box">
                <Heart size={28} className="favorites-main-icon" />
              </div>

              <div>
                <h1>My Favorite Recipes</h1>
                <p className="favorites-subtitle">
                  {favoriteRecipes.length}{" "}
                  {favoriteRecipes.length === 1 ? "recipe" : "recipes"} saved
                </p>
              </div>
            </div>
          </div>

          {favoriteRecipes.length > 0 ? (
            <div className="favorites-grid">
              {favoriteRecipes.map((recipe) => (
                <article className="card favorite-recipe-card" key={recipe.id}>
                  <div className="favorite-image-wrap">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="favorite-image"
                    />

                    <button
                      type="button"
                      className="favorite-heart-btn"
                      onClick={() => handleRemoveFavorite(recipe.id)}
                      aria-label="Remove from favorites"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>

                  <div className="favorite-card-body">
                    <h3>{recipe.title}</h3>

                    <div className="favorite-meta-line">
                      <span className="favorite-meta-item">
                        <Clock3 size={16} />
                        {recipe.cookTime}
                      </span>
                      <span className="favorite-meta-dot">•</span>
                      <span>{recipe.servings}</span>
                    </div>

                    <div className="favorite-tags">
                      {recipe.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className={`favorite-tag ${
                            tag.toLowerCase() === "healthy" ||
                            tag.toLowerCase() === "vegetarian"
                              ? "green"
                              : ""
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="btn btn-secondary favorite-view-btn"
                      onClick={() => handleOpenRecipe(recipe)}
                    >
                      View Recipe
                      <ChevronDown size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card favorites-empty-state">
              <div className="favorites-empty-icon">
                <Heart size={38} />
              </div>

              <h2>No favorites yet</h2>
              <p>
                Start exploring recipes and click the heart icon to save your
                favorites here.
              </p>

              <button
                type="button"
                className="btn btn-primary favorites-discover-btn"
                onClick={() => navigate("/")}
              >
                <ChefHat size={18} />
                <span>Discover Recipes</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="favorites-footer">
        <p>© 2026 Pantrix - Helping you cook smart and reduce food waste</p>
        <small>Demo prototype - All data is simulated</small>
      </footer>

      {selectedRecipe && (
        <div
          className="recipe-modal-overlay"
          onClick={() => setSelectedRecipe(null)}
        >
          <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="recipe-modal-close"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close recipe"
            >
              ×
            </button>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="recipe-modal-image"
            />

            <h2 className="recipe-modal-title">{selectedRecipe.title}</h2>

            <div className="recipe-modal-meta">
              <span>{selectedRecipe.cookTime}</span>
              <span>•</span>
              <span>{selectedRecipe.servings}</span>
              <span>•</span>
              <span>{selectedRecipe.matchScore}% Match</span>
            </div>

            {selectedRecipe.tags?.length > 0 && (
              <div className="recipe-modal-tags">
                {selectedRecipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`favorite-tag ${
                      tag.toLowerCase() === "healthy" ||
                      tag.toLowerCase() === "vegetarian"
                        ? "green"
                        : ""
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="recipe-modal-section">
              <h3>Ingredients</h3>
              <ul>
                {selectedRecipe.ingredients.map((item, index) => {
                  const isMissing =
                    selectedRecipe.missingIngredients?.includes(item);

                  return (
                    <li key={index}>
                      {item}
                      {isMissing && (
                        <span className="missing-ingredient">(missing)</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="recipe-modal-section">
              <h3>Instructions</h3>
              <ol>
                {selectedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {reviews.length > 0 && (
              <div className="recipe-modal-section">
                <h3>Reviews</h3>
                <div className="review-list">
                  {reviews.map((review) => (
                    <div className="review-item" key={review.id}>
                      <p className="review-stars-display">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </p>
                      {review.comment && <p>{review.comment}</p>}
                      <small>{review.date}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="recipe-modal-actions">
              <button
                className="btn btn-destructive favorite-liked-btn"
                onClick={() => handleRemoveFavorite(selectedRecipe.id)}
              >
                Liked ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;