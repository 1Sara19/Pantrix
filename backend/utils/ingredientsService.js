import axios from "axios";


export const getIngredientSuggestions = async (query) => {
    const API_KEY = process.env.SPOONACULAR_API_KEY;
    try {
    const response = await axios.get(
      "https://api.spoonacular.com/food/ingredients/autocomplete",
      {
        params: {
          query: query,
          number: 5,
          apiKey: API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Spoonacular error:", error.message);
    return [];
  }
};