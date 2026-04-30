import RecipeCard from "./RecipeCard";
import { ChefHat } from "lucide-react";
import "../styles/components/RecipeList.css";

export default function RecipeList({
  recipes = [],
  loading = false,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
}) {
  return (
    <div className="recipe-list-container">
      <div className="recipe-list-header">
        <h2 className="recipe-list-title">Recipe Results</h2>

        <p className="recipe-list-count">
          {loading ? "Searching..." : `${recipes.length} recipes found`}
        </p>
      </div>

      {loading ? (
        <div className="loading-recipes-box">
          <div className="loading-spinner"></div>
          <h3>Finding the best recipes...</h3>
          <p>Searching database first, then AI if needed.</p>
        </div>
      ) : recipes.length > 0 ? (
        <>
          <div className="recipe-list-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                id={recipe._id}
                {...recipe}
              />
            ))}
          </div>

          {hasMore && (
            <button
              type="button"
              className="load-more-btn"
              onClick={onLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      ) : (
        <div className="no-recipes-box">
          <div className="no-recipes-icon">
            <ChefHat className="no-recipes-chef-icon" />
          </div>

          <h3>No recipes found</h3>
          <p>Add ingredients to find matching recipes.</p>
        </div>
      )}
    </div>
  );
}