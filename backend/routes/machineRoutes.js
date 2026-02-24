import express from "express";
import {
  createMachine,
  updateMachine,
  deleteMachine,
  getMachines,
  getMachineById
} from "../controllers/machineController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin-only
router.post("/", protect, authorizeRoles("admin"), createMachine);
router.put("/:id", protect, authorizeRoles("admin"), updateMachine);
router.delete("/:id", protect, authorizeRoles("admin"), deleteMachine);

// Admin + Technician
router.get("/", protect, authorizeRoles("admin", "technician"), getMachines);
router.get("/:id", protect, authorizeRoles("admin", "technician"), getMachineById);

export default router;