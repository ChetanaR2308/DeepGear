import express from "express";
import {
  createMachine,
<<<<<<< HEAD
  getAllMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
} from "../controllers/machineController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createMachine
);

router.get("/", authMiddleware, getAllMachines);

router.get("/:id", authMiddleware, getMachineById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateMachine
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteMachine
);
=======
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
>>>>>>> 1c30b1a481a767d7bbb6036e55529c9f3533c86f

export default router;