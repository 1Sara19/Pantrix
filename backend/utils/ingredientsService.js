import axios from "axios";

export const getIngredientSuggestions = async (query) => {
  const API_KEY = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(
      "https://api.spoonacular.com/food/ingredients/autocomplete",
      {
        params: {
          query,
          number: 5,
          metaInformation: true,
          apiKey: API_KEY,
        },
      }
    );

    return response.data.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image
        ? `https://img.spoonacular.com/ingredients_100x100/${item.image}`
        : "https://via.placeholder.com/100?text=Food",    }));
  } catch (error) {
    console.error("Spoonacular error:", error.message);
    return [];
  }
};