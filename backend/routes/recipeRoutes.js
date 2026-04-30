import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  ingredientSuggestions,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/ingredients/suggestions", ingredientSuggestions);

router.route("/")
  .get(getRecipes)
  .post(createRecipe);

router.route("/:id")
  .get(getRecipeById)
  .put(updateRecipe)
  .delete(deleteRecipe);


export default router;