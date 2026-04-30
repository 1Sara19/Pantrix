import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAIRecipes = async (ingredients, filters = {}) => {
  const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
Create 6 different recipes using some or all of these ingredients: ${ingredients.join(", ")}.

Filters:
cookTime: ${filters.cookTime || "any"}
dietary: ${filters.dietary?.join(", ") || "none"}
exclude/allergies: ${filters.exclude || "none"}

Return ONLY valid JSON array. No markdown.

Each recipe must follow this format:
{
  "title": "Recipe name",
  "ingredients": ["ingredient1", "ingredient2"],
  "instructions": ["step1", "step2"],
  "cookTime": 30,
  "servings": 2,
  "difficulty": "Easy",
  "image": "",
  "dietary": [],
  "tags": [],
  "allergyTags": [],
  "source": "ai",
  "aiGenerated": true
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(cleaned);
};