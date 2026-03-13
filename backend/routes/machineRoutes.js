import express from "express";
import {
  createMachine,
  updateMachine,
  deleteMachine,
  getAllMachines,
  getMachineById,
  getLatestReading,
  getMachineHealth
} from "../controllers/machineController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin-only routes
router.post("/", protect, authorizeRoles("admin"), createMachine);
router.put("/:id", protect, authorizeRoles("admin"), updateMachine);
router.delete("/:id", protect, authorizeRoles("admin"), deleteMachine);

// Admin + Technician
router.get("/", protect, authorizeRoles("admin", "technician"), getAllMachines);
router.get("/:id", protect, authorizeRoles("admin", "technician"), getMachineById);
router.get("/:id/latest-reading", getLatestReading);
router.get("/:id/health", getMachineHealth);
export default router;