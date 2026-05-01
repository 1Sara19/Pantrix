import axios from "axios";

export const getRecipeImage = async (title) => {
  const apiKey = process.env.SERP_API_KEY;
  try {
    const res = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_images",
        q: `${title} recipe food dish plate `,
        api_key: apiKey,
      },
    });
    const images = res.data.images_results || [];
    const validImage = images.find(
      (img) =>
        img.original &&
        img.original.startsWith("http") &&
        !img.original.includes("logo") &&
        !img.original.includes("icon")
    );
    return validImage?.original || "";

  
} catch (error) {
    console.error("SerpAPI image error:", error.message);
    return "";
  }
};