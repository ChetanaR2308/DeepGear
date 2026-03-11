import MachineReading from "../models/MachineReading.js";
import Alert from "../models/Alert.js";

export const createReading = async (req, res) => {
  try {
    const { machineId, readingValue } = req.body;

    const reading = await MachineReading.create({
      machineId,
      readingValue
    });

    if (readingValue > 80) {
      await Alert.create({
        machineId,
        alertType: "High Temperature",
        message: `Machine reading too high: ${readingValue}`
      });
    }

    res.status(201).json(reading);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReadings = async (req, res) => {
  try {
    const readings = await MachineReading.find();
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};