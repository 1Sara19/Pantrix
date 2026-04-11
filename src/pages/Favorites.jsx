import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ChefHat } from "lucide-react";
import "../styles/pages/favorites.css";
import recipes from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const userId = localStorage.getItem("userId");
  const favoritesKey = userId ? `favorites_${userId}` : null;

  const loadFavorites = () => {
    if (!favoritesKey) {
      setFavoriteRecipes([]);
      return;
    }

    const savedFavorites =
      JSON.parse(localStorage.getItem(favoritesKey)) || [];

    const likedRecipes = recipes.filter((recipe) =>
      savedFavorites.includes(recipe.id)
    );

    setFavoriteRecipes(likedRecipes);
  };

  useEffect(() => {
    loadFavorites();

    const handleFavoritesUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, [favoritesKey]);

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
                <RecipeCard key={recipe.id} {...recipe} />
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

     
    </div>
  );
}

export default Favorites;