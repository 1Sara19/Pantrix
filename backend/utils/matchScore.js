const calculateMatchScore = (userIngredients = [], recipeIngredients = []) => {
  const matchedIngredients = recipeIngredients.filter((recipeItem) =>
    userIngredients.some((userItem) => recipeItem.includes(userItem))
  );

  const matchScore =
    recipeIngredients.length === 0
      ? 0
      : Math.round((matchedIngredients.length / recipeIngredients.length) * 100);

  return {
    matchScore,
    matchedIngredients,
  };
};

export default calculateMatchScore;