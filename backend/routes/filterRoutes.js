import express from "express";

import {
  getActiveFilters,
  getAllFilters,
  createFilterOption,
  updateFilterOption,
  deleteFilterOption,
} from "../controllers/filterController.js";

const router = express.Router();

router.get("/", getActiveFilters);

export const adminFilterRouter = express.Router();

adminFilterRouter.get("/", getAllFilters);
adminFilterRouter.post("/", createFilterOption);
adminFilterRouter.put("/:id", updateFilterOption);
adminFilterRouter.delete("/:id", deleteFilterOption);

export default router;