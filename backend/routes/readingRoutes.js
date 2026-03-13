import express from "express";
import { createReading } from "../controllers/readingController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin","technician"), createReading);

export default router;