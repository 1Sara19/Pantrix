import express from "express";
import {
  addMealPlan,
  getMealPlans,
  updateMealPlan,
  deleteMealPlan,
} from "../controllers/mealPlanController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addMealPlan);
router.get("/", protect, getMealPlans);
router.put("/:id", protect, updateMealPlan);
router.delete("/:id", protect, deleteMealPlan);

export default router;