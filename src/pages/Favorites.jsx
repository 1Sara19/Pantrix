import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ChefHat } from "lucide-react";
import "../styles/pages/favorites.css";
import RecipeCard from "../components/RecipeCard";
import { getFavorites } from "../services/favoriteService";

function Favorites() {
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavoriteRecipes(data || []);
    } catch (error) {
      console.error("Failed to load favorites:", error);
      setFavoriteRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();

    const handleFavoritesUpdate = () => loadFavorites();
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, []);

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

          {loading ? (
            <p>Loading favorites...</p>
          ) : favoriteRecipes.length > 0 ? (
            <div className="favorites-grid">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id || recipe.id}
                  {...recipe}
                  id={recipe._id || recipe.id}
                />
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