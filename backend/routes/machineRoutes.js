import express from "express";
import {
  createMachine,
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

export default router;