import express from "express";
import { createReading, getReadings, getReadingsByMachine } from "../controllers/machineReadingController.js";

const router = express.Router();

router.post("/", createReading);
router.get("/", getReadings);
router.get("/:machineId", getReadingsByMachine);

export default router;