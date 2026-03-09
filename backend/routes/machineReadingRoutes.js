import express from "express";
import { createReading, getReadings } from "../controllers/machineReadingController.js";

const router = express.Router();

router.post("/", createReading);
router.get("/", getReadings);

export default router;