import express from "express";

import {
  getActiveFilters,
  getAllFilters,
  createFilterOption,
  updateFilterOption,
  deleteFilterOption,
} from "../controllers/filterController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getActiveFilters);

export const adminFilterRouter = express.Router();

adminFilterRouter.get("/", protect, admin, getAllFilters);

adminFilterRouter.post("/", protect, admin, createFilterOption);

adminFilterRouter.put("/:id", protect, admin, updateFilterOption);

adminFilterRouter.delete("/:id", protect, admin, deleteFilterOption);

export default router;