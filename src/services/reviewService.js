// Review and comment API functions will be added here.
const API_URL = "http://localhost:5001/api/reviews";

export const getReviewsByRecipe = async (recipeId) => {
  const res = await fetch(`${API_URL}/recipe/${recipeId}`);
  return res.json();
};

export const addReview = async (reviewData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  return res.json();
};