import express from "express";

import {
  submitContactReport,
  getContactReports,
  resolveContactReport,
  deleteContactReport,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", submitContactReport);

router.get("/", protect, admin, getContactReports);

router.patch("/:id/resolve", protect, admin, resolveContactReport);

router.delete("/:id", protect, admin, deleteContactReport);

export default router;