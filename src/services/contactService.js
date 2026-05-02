import API_BASE_URL from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function submitContactReport(contactData) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit contact report.");
  }

  return data;
}

export async function getContactReports() {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get contact reports.");
  }

  return data;
}

export async function resolveContactReport(id) {
  const response = await fetch(`${API_BASE_URL}/api/contact/${id}/resolve`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to resolve contact report.");
  }

  return data;
}

export async function deleteContactReport(id) {
  const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete contact report.");
  }

  return data;
}