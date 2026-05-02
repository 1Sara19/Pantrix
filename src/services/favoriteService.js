const API_URL = "https://pantrix-backend.onrender.com/api/favorites";

const getToken = () => localStorage.getItem("token");

export const getFavorites = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};

export const addFavorite = async (recipeId) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ recipeId }),
  });

  return res.json();
};

export const removeFavorite = async (recipeId) => {
  const res = await fetch(`${API_URL}/${recipeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};