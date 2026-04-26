import express from "express";

import {
  getRecipeLimit,
  updateRecipeLimit,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/settings/recipe-limit", getRecipeLimit);

router.put("/settings/recipe-limit", updateRecipeLimit);

export default router;