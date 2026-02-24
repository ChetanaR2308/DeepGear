import express from "express";
import { getAlerts, createAlert } from "../controllers/alertController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin", "technician"), getAlerts);
router.post("/", protect, authorizeRoles("admin"), createAlert);

export default router;