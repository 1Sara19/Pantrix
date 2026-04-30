// Recipe, search, suggestions, and AI API functions will be added here.
const API_URL = "http://localhost:5001/api/recipes";

export const suggestRecipes = async (ingredients, filters, page = 1, limit = 6) => {
  const res = await fetch(`${API_URL}/suggest?page=${page}&limit=${limit}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients, filters }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
};

export const searchRecipes = async (ingredients, filters) => {
  const res = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients, filters }),
  });

  if (!res.ok) {
    throw new Error("Failed to search recipes");
  }

  return res.json();
};

export const getIngredientSuggestions = async (query) => {
  const res = await fetch(
    `${API_URL}/ingredients/suggestions?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ingredient suggestions");
  }

  return res.json();
};