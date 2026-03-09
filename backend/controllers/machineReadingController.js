import MachineReading from "../models/MachineReading.js";

const ALERT_THRESHOLD = 90;

// CREATE READING
export const createReading = async (req, res) => {
  try {
    const { machineId, readingValue } = req.body;

    let alertFlag = false;

    if (readingValue > ALERT_THRESHOLD) {
      alertFlag = true;
    }

    const reading = await MachineReading.create({
      machineId,
      readingValue,
      alertFlag
    });

    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL READINGS
export const getReadings = async (req, res) => {
  try {
    const readings = await MachineReading.find();
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET READINGS BY MACHINE
export const getReadingsByMachine = async (req, res) => {
  try {
    const readings = await MachineReading.find({
      machineId: req.params.machineId
    });

    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};