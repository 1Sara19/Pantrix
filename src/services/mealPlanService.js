// Meal plan API functions will be added here.
const API_URL = "https://pantrix-backend.onrender.com/api/meal-plans";

const getToken = () => localStorage.getItem("token");

export const getMealPlans = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};

export const addMealPlan = async (mealPlanData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(mealPlanData),
  });

  return res.json();
};

export const updateMealPlan = async (mealPlanId, mealPlanData) => {
  const res = await fetch(`${API_URL}/${mealPlanId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(mealPlanData),
  });

  return res.json();
};

export const deleteMealPlan = async (mealPlanId) => {
  const res = await fetch(`${API_URL}/${mealPlanId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};