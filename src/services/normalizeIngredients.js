const normalizeText = (text) =>
  text
    ?.toLowerCase()
    .replace(/[^a-z\s]/g, "") 
    .replace(/\s+/g, " ") 
    .trim();

const normalizeIngredients = (ingredients = []) => {
  return [
    ...new Set(
      ingredients
        .map((item) => normalizeText(item))
        .filter(Boolean)
    ),
  ];
};

export default normalizeIngredients;