import API_BASE_URL from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load users.");
  }

  return data;
}

export async function updateUserByAdmin(id, userData) {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update user.");
  }

  return data;
}

export async function deleteUserByAdmin(id) {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete user.");
  }

  return data;
}

export async function getRecipeLimit() {
  const response = await fetch(`${API_BASE_URL}/admin/settings/recipe-limit`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load recipe limit.");
  }

  return data;
}

export async function updateRecipeLimit(maxRecipes) {
  const response = await fetch(`${API_BASE_URL}/admin/settings/recipe-limit`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ maxRecipes }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update recipe limit.");
  }

  return data;
}