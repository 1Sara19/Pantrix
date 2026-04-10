import RecipeCard from "./RecipeCard";
import "../styles/components/RecipeList.css";

export default function RecipeList({ ingredients = [], filters }) {

  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Chicken Pasta",
      cookTime: 25,
      difficulty: "Easy",
      servings: "2 servings",
      dietary: [],
      ingredients: ["pasta", "chicken", "garlic", "cream", "parmesan"],
      instructions: [
        "Boil pasta until al dente",
        "Cook chicken with garlic",
        "Add cream and parmesan",
        "Mix pasta with sauce"
      ],
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
    },

    {
      id: 2,
      title: "Mediterranean Tomato Salad",
      cookTime: 10,
      difficulty: "Easy",
      servings: "2 servings",
      dietary: ["Vegetarian", "Gluten-Free"],
      ingredients: ["tomato", "olive oil", "feta", "cucumber", "mint"],
      instructions: [
        "Chop tomatoes and cucumber",
        "Add feta cheese",
        "Drizzle olive oil",
        "Mix and serve"
      ],
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop"
    },

    {
      id: 3,
      title: "Classic Margherita Pizza",
      cookTime: 45,
      difficulty: "Medium",
      servings: "4 servings",
      dietary: ["Vegetarian"],
      ingredients: ["pizza dough", "tomato", "mozzarella", "basil"],
      instructions: [
        "Roll pizza dough",
        "Spread tomato sauce",
        "Add mozzarella",
        "Bake in oven"
      ],
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
    },

    {
      id: 4,
      title: "Garlic Butter Shrimp",
      cookTime: 20,
      difficulty: "Easy",
      servings: "2 servings",
      dietary: ["Gluten-Free"],
      ingredients: ["shrimp", "garlic", "butter", "lemon"],
      instructions: [
        "Cook shrimp in butter",
        "Add garlic",
        "Squeeze lemon",
        "Serve hot"
      ],
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
    },

    {
      id: 5,
      title: "Homemade Tomato Soup",
      cookTime: 35,
      difficulty: "Easy",
      servings: "3 servings",
      dietary: ["Vegan", "Gluten-Free"],
      ingredients: ["tomato", "onion", "garlic", "olive oil"],
      instructions: [
        "Cook onion and garlic",
        "Add tomatoes",
        "Blend soup",
        "Serve warm"
      ],
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
    }
  ];

  /* ---------------- MATCH SCORE ---------------- */

  const calculateMatchScore = (recipeIngredients) => {
    if (ingredients.length === 0) return 0;

    const matched = recipeIngredients.filter((item) =>
      ingredients.includes(item)
    ).length;

    return Math.round((matched / recipeIngredients.length) * 100);
  };

  /* ---------------- FILTERS ---------------- */

  const filteredRecipes = recipes
    .map((recipe) => {
      const matchScore = calculateMatchScore(recipe.ingredients);

      const missingIngredients = recipe.ingredients.filter(
        (item) => !ingredients.includes(item)
      );

      return {
        ...recipe,
        matchScore,
        missingIngredients
      };
    })

    .filter((recipe) => {
      if (filters.cookTime && recipe.cookTime > filters.cookTime) return false;

      if (
        filters.dietary.length > 0 &&
        !filters.dietary.every((d) => recipe.dietary.includes(d))
      ) {
        return false;
      }

      if (filters.exclude) {
        const exclude = filters.exclude.toLowerCase();

        if (
          recipe.ingredients.some((i) =>
            i.toLowerCase().includes(exclude)
          )
        ) {
          return false;
        }
      }

      return true;
    })

    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="recipe-list-container">

      <div className="recipe-list-header">
        <h2 className="recipe-list-title">Recipe Results</h2>
        <p className="recipe-list-count">
          {filteredRecipes.length} recipes found
        </p>
      </div>

      <div className="recipe-list-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            {...recipe}
          />
        ))}
      </div>

    </div>
  );
}