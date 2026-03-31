import express from "express";
import { getAlerts, createAlert, getMachineAlerts } from "../controllers/alertController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { resolveAlert } from "../controllers/alertController.js";

const router = express.Router();

// Get all alerts
router.get("/", protect, authorizeRoles("admin", "technician"), getAlerts);

// Create alert
router.post("/", protect, authorizeRoles("admin"), createAlert);

// Get alerts for a specific machine
router.get("/machine/:machineId",protect,authorizeRoles("admin", "technician"),
  getMachineAlerts);
export default router;

router.put("/:id", protect, authorizeRoles("admin"), resolveAlert);