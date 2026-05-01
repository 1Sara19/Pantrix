import API_BASE_URL from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function getAllReviews() {
  const response = await fetch(`${API_BASE_URL}/api/reviews`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load reviews.");
  }

  return data;
}

export async function hideReview(id) {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${id}/hide`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to hide review.");
  }

  return data;
}

export async function showReview(id) {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${id}/show`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to show review.");
  }

  return data;
}

export async function deleteReview(id) {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete review.");
  }

  return data;
}

export async function addReview(reviewData) {
  const response = await fetch(`${API_BASE_URL}/api/reviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add review.");
  }

  return data;
}

export async function getReviewsByRecipe(recipeId) {
  const response = await fetch(`${API_BASE_URL}/api/reviews/recipe/${recipeId}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load recipe reviews.");
  }

  return data;
}