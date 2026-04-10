import RecipeCard from "./RecipeCard";
import recipes from "../data/recipes";
import { ChefHat } from "lucide-react";
import "../styles/components/RecipeList.css";

export default function RecipeList({ ingredients = [], filters }) {
  const normalizedUserIngredients = ingredients.map((item) =>
    item.toLowerCase().trim()
  );

  const filteredRecipes =
    normalizedUserIngredients.length === 0
      ? []
      : recipes
          .map((recipe) => {
            const recipeIngredients = recipe.ingredients.map((item) =>
              item.toLowerCase()
            );

            const matchedCount = recipeIngredients.filter((item) =>
              normalizedUserIngredients.includes(item)
            ).length;

            const matchScore = Math.round(
              (matchedCount / recipeIngredients.length) * 100
            );

            const missingIngredients = recipe.ingredients.filter(
              (item) =>
                !normalizedUserIngredients.includes(item.toLowerCase())
            );

            return {
              ...recipe,
              matchScore,
              missingIngredients,
            };
          })
          .filter((recipe) => {
            if (recipe.matchScore === 0) return false;

            if (filters.cookTime && recipe.cookTime > Number(filters.cookTime)) {
              return false;
            }

            if (
              filters.dietary.length > 0 &&
              !filters.dietary.every((d) => recipe.dietary.includes(d))
            ) {
              return false;
            }

            if (filters.exclude) {
              const excludedItems = filters.exclude
                .toLowerCase()
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

              const hasExcludedIngredient = recipe.ingredients.some((i) =>
                excludedItems.some((excluded) =>
                  i.toLowerCase().includes(excluded)
                )
              );

              if (hasExcludedIngredient) return false;
            }

            return true;
          })
          .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="recipe-list-container">
      <div className="recipe-list-header">
        <h2 className="recipe-list-title">
          {normalizedUserIngredients.length === 0
            ? "Popular Recipes"
            : "Recipe Results"}
        </h2>
        <p className="recipe-list-count">{filteredRecipes.length} recipes found</p>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="recipe-list-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      ) : (
        <div className="no-recipes-box">
          <div className="no-recipes-icon">
            <ChefHat className="no-recipes-chef-icon" />
          </div>
          <h3>No recipes found</h3>
          <p>
            {normalizedUserIngredients.length === 0
              ? "Add some ingredients to find matching recipes!"
              : "Try changing your ingredients or filters."}
          </p>
        </div>
      )}
    </div>
  );
}