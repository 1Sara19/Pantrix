import axios from "axios";

export const getRecipeImage = async (title) => {
  const apiKey = process.env.SERP_API_KEY;
  try {
    const res = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_images",
        q: `${title} food `,
        api_key: apiKey,
      },
    });

    const image =
      res.data.images_results?.[0]?.original ||
      res.data.images_results?.[0]?.thumbnail;

    return image || `https://picsum.photos/seed/${encodeURIComponent(title)}/400/300`;
  } catch (error) {
    console.error("SerpAPI image error:", error.message);
    return `https://picsum.photos/seed/${encodeURIComponent(title)}/400/300`;
  }
};