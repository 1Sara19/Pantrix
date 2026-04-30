const normalizeIngredients = (ingredients = []) => {
  return [
    ...new Set(
      ingredients
        .map((item) => item.toLowerCase().trim())
        .filter(Boolean)
    ),
  ];
};

export default normalizeIngredients;