import Recipe from "../models/Recipe.js";
import { getIngredientSuggestions } from "../utils/ingredientsService.js";
import { generateAIRecipes } from "../utils/aiRecipeService.js";
import { getRecipeImage } from "../utils/recipeImageService.js";
import normalizeIngredients from "../utils/normalizeIngredients.js";
import calculateMatchScore from "../utils/matchScore.js";
import AppSetting from "../models/AppSetting.js";

// GET all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST add new recipe
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update recipe
export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE recipe
export const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ingredient autocomplete
export const ingredientSuggestions = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.json([]);
  }

  const suggestions = await getIngredientSuggestions(query);
  res.json(suggestions);
};

// Database first, AI fallback
export const suggestAIRecipe = async (req, res) => {
  try {
    const { ingredients, filters } = req.body;

    const page = Number(req.query.page) || 1;
    const setting = await AppSetting.findOne({ key: "recipeLimit" });
    const limit = Number(setting?.value) || 6;
    
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: "Ingredients are required" });
    }

    const normalize = (text) =>
      text.toLowerCase().replace(/[^a-z\s]/g, "").trim();

    const inputIngredients = ingredients.map(normalize);

    const calculateScore = (recipe) => {
      const recipeIngredients = recipe.ingredients.map(normalize);

      const matchedIngredients = recipeIngredients.filter((recipeItem) =>
        inputIngredients.some((input) => recipeItem.includes(input))
      );

      const matchScore = Math.round(
        (matchedIngredients.length / recipeIngredients.length) * 100
      );

      return {
        ...recipe._doc,
        matchScore,
        matchedIngredients,
      };
    };

    const allRecipes = await Recipe.find();

    const matchedRecipes = allRecipes
      .map(calculateScore)
      .filter((recipe) => recipe.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    const start = (page - 1) * limit;
    const paginatedRecipes = matchedRecipes.slice(start, start + limit);

    if (page > 1) {
      return res.json({
        source: "database",
        recipes: [],
        hasMore: false,
      });
    }

    if (paginatedRecipes.length >= limit) {
      return res.json({
        source: "database",
        recipes: paginatedRecipes,
        hasMore: false,
      });
    }

    const remainingCount = limit - paginatedRecipes.length;
    let aiResults = [];

    try {
      const existingTitles = new Set(
        paginatedRecipes.map((recipe) => recipe.title.toLowerCase().trim())
      );

      let attempts = 0;

      while (aiResults.length < remainingCount && attempts < 4) {
        attempts += 1;

        const neededNow = remainingCount - aiResults.length;
        const aiRecipes = await generateAIRecipes(ingredients, filters, neededNow);

        const uniqueAIRecipes = aiRecipes.filter((recipe) => {
          const title = recipe.title?.toLowerCase().trim();

          if (!title || existingTitles.has(title)) {
            return false;
          }

          existingTitles.add(title);
          return true;
        });


        const recipesWithImages = await Promise.all(
          uniqueAIRecipes.slice(0, neededNow).map(async (recipe) => {
            const img = recipe.image || (await getRecipeImage(recipe.title));

            return {
              ...recipe,
              image:
                img && img.startsWith("http")
                  ? img
                  : `https://picsum.photos/seed/${encodeURIComponent(
                      recipe.title
                    )}/400/300`,
            };
          })
        );

        if (recipesWithImages.length === 0) {
          break;
        }

        const savedRecipes = await Recipe.insertMany(recipesWithImages);

        const scoredRecipes = savedRecipes
          .map(calculateScore)
          .sort((a, b) => b.matchScore - a.matchScore);

        aiResults = [...aiResults, ...scoredRecipes].slice(0, remainingCount);
      }
    } catch (aiError) {
      console.error("AI FILL ERROR:", aiError.message);
    }

    const finalRecipes = [...paginatedRecipes, ...aiResults].slice(0, limit);

    return res.json({
      source: aiResults.length > 0 ? "database+ai" : "database",
      recipes: finalRecipes,
      hasMore: false,
    });
  } catch (error) {
    console.error("SUGGEST RECIPE ERROR:", error);
    res.status(500).json({
      message: "AI recipe generation failed",
      error: error.message,
    });
  }
};

export const searchRecipes = async (req, res) => {
  try {
    const { ingredients = [], filters = {} } = req.body;

    if (ingredients.length === 0) {
      return res.json({
        source: "database",
        recipes: [],
        hasMore: false,
      });
    }

    const inputIngredients = normalizeIngredients(ingredients);
    const allRecipes = await Recipe.find();

    let results = allRecipes.map((recipe) => {
      const recipeIngredients = normalizeIngredients(recipe.ingredients);

      const { matchScore, matchedIngredients } = calculateMatchScore(
        inputIngredients,
        recipeIngredients
      );

      return {
        ...recipe._doc,
        matchScore,
        matchedIngredients,
      };
    });

    results = results.filter((recipe) => recipe.matchScore > 0);

    if (filters.cookTime) {
      results = results.filter(
        (recipe) => recipe.cookTime <= Number(filters.cookTime)
      );
    }

    if (filters.dietary?.length > 0) {
      results = results.filter((recipe) => {
        const labels = [...(recipe.dietary || []), ...(recipe.tags || [])].map(
          (item) => item.toLowerCase()
        );

        return filters.dietary.every((diet) =>
          labels.includes(diet.toLowerCase())
        );
      });
    }

    if (filters.exclude) {
      const excludedItems = filters.exclude
        .toLowerCase()
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      results = results.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map((item) =>
          item.toLowerCase()
        );

        const allergyTags = (recipe.allergyTags || []).map((item) =>
          item.toLowerCase()
        );

        return !excludedItems.some(
          (excluded) =>
            recipeIngredients.some((ingredient) =>
              ingredient.includes(excluded)
            ) || allergyTags.some((tag) => tag.includes(excluded))
        );
      });
    }

    results.sort((a, b) => b.matchScore - a.matchScore);

    return res.json({
      source: "database",
      recipes: results,
      hasMore: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};