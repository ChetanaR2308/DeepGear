import express from "express";
import { createReading, getReadings, getReadingsByMachine,getLatestReading  } from "../controllers/machineReadingController.js";
const router = express.Router();

router.post("/", createReading);
router.get("/", getReadings);
router.get("/:machineId", getReadingsByMachine);
router.get("/:machineId/latest", getLatestReading);
export default router;