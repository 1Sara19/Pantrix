import express from "express";

import {
  getRecipeLimit,
  updateRecipeLimit,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/settings/recipe-limit", protect, admin, getRecipeLimit);

router.put("/settings/recipe-limit", protect, admin, updateRecipeLimit);

router.get("/users", protect, admin, getAllUsers);

router.put("/users/:id", protect, admin, updateUserByAdmin);

router.delete("/users/:id", protect, admin, deleteUserByAdmin);

export default router;