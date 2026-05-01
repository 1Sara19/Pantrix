import express from "express";
import {
  addReview,
  getReviewsByRecipe,
  getAllReviews,
  hideReview,
  showReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addReview);
router.get("/recipe/:recipeId", getReviewsByRecipe);
router.get("/", protect, getAllReviews);
router.patch("/:id/hide", protect, hideReview);
router.patch("/:id/show", protect, showReview);
router.delete("/:id", protect, deleteReview);

export default router;