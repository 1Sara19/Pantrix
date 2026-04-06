import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ChefHat } from "lucide-react";
import "../styles/favorites.css";

function Favorites() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Shathaalbraiki",
    favoriteRecipes: [1, 3],
  });

  const [recipes] = useState([
    {
      id: 1,
      title: "Creamy Pasta",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
      category: "Dinner",
      time: "25 min",
    },
    {
      id: 2,
      title: "Avocado Toast",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80",
      category: "Breakfast",
      time: "10 min",
    },
    {
      id: 3,
      title: "Chicken Salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
      category: "Healthy",
      time: "15 min",
    },
    {
      id: 4,
      title: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
      category: "Lunch",
      time: "30 min",
    },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem("pantrixUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const favoriteRecipes = recipes.filter((recipe) =>
    user.favoriteRecipes.includes(recipe.id)
  );

  return (
    <div className="container favorites-page">
      <button
        type="button"
        className="btn btn-ghost back-btn"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div className="favorites-header">
        <div className="favorites-title-wrap">
          <div className="favorites-icon-box">
            <Heart size={24} className="favorites-main-icon" />
          </div>

          <div>
            <h1>My Favorite Recipes</h1>
            <p className="text-muted">
              {favoriteRecipes.length}{" "}
              {favoriteRecipes.length === 1 ? "recipe" : "recipes"} saved
            </p>
          </div>
        </div>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="favorites-grid">
          {favoriteRecipes.map((recipe) => (
            <div className="card favorite-recipe-card" key={recipe.id}>
              <div className="favorite-image-wrap">
                <img src={recipe.image} alt={recipe.title} className="favorite-image" />
                <button type="button" className="favorite-heart-btn">
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>

              <div className="favorite-card-body">
                <div className="favorite-meta">
                  <span className="badge badge-secondary">{recipe.category}</span>
                  <span className="text-small">{recipe.time}</span>
                </div>

                <h3>{recipe.title}</h3>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/")}
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card favorites-empty-state">
          <div className="favorites-empty-icon">
            <Heart size={36} />
          </div>

          <h2>No favorites yet</h2>
          <p className="text-muted">
            Start exploring recipes and click the heart icon to save your
            favorites here.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            <ChefHat size={18} />
            Discover Recipes
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;