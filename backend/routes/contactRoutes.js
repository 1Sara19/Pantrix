import express from "express";

import {
  submitContactReport,
  getContactReports,
  resolveContactReport,
  deleteContactReport,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContactReport);

router.get("/", getContactReports);

router.patch("/:id/resolve", resolveContactReport);

router.delete("/:id", deleteContactReport);

export default router;