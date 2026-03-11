import express from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance
} from "../controllers/maintenanceController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMaintenance);
router.get("/", protect, getMaintenances);
router.get("/:id", protect, getMaintenanceById);
router.put("/:id", protect, updateMaintenance);
router.delete("/:id", protect, deleteMaintenance);

export default router;