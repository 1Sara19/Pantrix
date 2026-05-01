import API_BASE_URL from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function getAdminFilters() {
  const response = await fetch(`${API_BASE_URL}/api/admin/filters`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load filters.");
  }

  return data;
}

export async function saveFilterOption(filterData) {
  const response = await fetch(`${API_BASE_URL}/api/admin/filters`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(filterData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save filter.");
  }

  return data;
}

export async function deleteFilterOption(id) {
  const response = await fetch(`${API_BASE_URL}/api/admin/filters/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete filter.");
  }

  return data;
}

export async function getActiveFilters() {
  const response = await fetch(`${API_BASE_URL}/api/filters`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load active filters.");
  }

  return data;
}