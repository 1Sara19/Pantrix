import RecipeCard from "./RecipeCard";
import "../styles/components/RecipeList.css";

export default function RecipeList({ ingredients, filters }) {
  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Chicken Pasta",
      cookTime: 25,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
      dietary: ["Dairy-Free"],
      ingredients: ["chicken", "garlic", "pasta", "cream"],
      instructions: [
        "Boil the pasta",
        "Cook chicken with garlic",
        "Add cream",
        "Mix and serve"
      ]
    },
    {
      id: 2,
      title: "Mediterranean Tomato Salad",
      cookTime: 10,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      dietary: ["Vegetarian", "Gluten-Free"],
      ingredients: ["tomato", "cucumber", "olive oil", "feta"],
      instructions: [
        "Chop vegetables",
        "Add olive oil",
        "Mix everything",
        "Serve fresh"
      ]
    },
    {
      id: 3,
      title: "Classic Margherita Pizza",
      cookTime: 45,
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      dietary: ["Vegetarian"],
      ingredients: ["dough", "tomato", "mozzarella", "basil"],
      instructions: [
        "Prepare dough",
        "Add toppings",
        "Bake pizza",
        "Serve hot"
      ]
    },
    {
      id: 4,
      title: "Herb-Roasted Chicken Thighs",
      cookTime: 40,
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
      dietary: [],
      ingredients: ["chicken", "rosemary", "thyme", "garlic"],
      instructions: [
        "Season chicken",
        "Add herbs",
        "Roast in oven",
        "Serve hot"
      ]
    },
    {
      id: 5,
      title: "Garlic Butter Shrimp Scampi",
      cookTime: 20,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      dietary: [],
      ingredients: ["shrimp", "garlic", "butter", "lemon"],
      instructions: [
        "Cook garlic in butter",
        "Add shrimp",
        "Add lemon",
        "Serve"
      ]
    }
  ];

  const filteredRecipes = recipes
    .map((recipe) => {
      const matchedIngredients = recipe.ingredients.filter((ingredient) =>
        ingredients.includes(ingredient.toLowerCase())
      );

      const missingIngredients = recipe.ingredients.filter(
        (ingredient) => !ingredients.includes(ingredient.toLowerCase())
      );

      const matchScore =
        ingredients.length === 0
          ? 0
          : Math.round((matchedIngredients.length / recipe.ingredients.length) * 100);

      return {
        ...recipe,
        matchScore,
        matchedIngredients,
        missingIngredients,
      };
    })
    .filter((recipe) => {
      const matchesIngredients =
        ingredients.length === 0 || recipe.matchedIngredients.length > 0;

      const matchesCookTime =
        !filters.cookTime || recipe.cookTime <= Number(filters.cookTime);

      const matchesDietary =
        filters.dietary.length === 0 ||
        filters.dietary.every((item) => recipe.dietary.includes(item));

      const excludedItems = filters.exclude
        .toLowerCase()
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const matchesExclude =
        excludedItems.length === 0 ||
        !recipe.ingredients.some((ingredient) =>
          excludedItems.includes(ingredient.toLowerCase())
        );

      return matchesIngredients && matchesCookTime && matchesDietary && matchesExclude;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="recipe-list-container">
      <div className="recipe-list-header">
        <h2 className="recipe-list-title">Recipe Results</h2>
        <p className="recipe-list-count">{filteredRecipes.length} recipes found</p>
      </div>

      <div className="recipe-list-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            matchScore={recipe.matchScore}
            cookTime={`${recipe.cookTime} min`}
            difficulty={recipe.difficulty}
            image={recipe.image}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            missingIngredients={recipe.missingIngredients}
          />
        ))}
      </div>
    </div>
  );
}