import MachineReading from "../models/MachineReading.js";
import Alert from "../models/Alert.js";
import Machine from "../models/Machine.js";

export const createReading = async (req, res) => {
  try {
    const {
      machineId,
      temperature,
      pressure,
      vibration,
      rpm,
      power,
      speed
    } = req.body;

    // 1️⃣ Save reading
    const reading = await MachineReading.create({
      machineId,
      temperature,
      pressure,
      vibration,
      rpm,
      power,
      speed
    });

    // 2️⃣ Update last active
    await Machine.findByIdAndUpdate(machineId, {
      lastActive: Date.now()
    });

    // 3️⃣ Alert logic
    if (temperature > 80) {
      await Alert.create({
        machineId,
        alertType: "High Temperature",
        message: `Temperature too high: ${temperature}`
      });
    }

    if (vibration > 5) {
      await Alert.create({
        machineId,
        alertType: "High Vibration",
        message: `Vibration too high: ${vibration}`
      });
    }

    // 4️⃣ Health status logic
    const alertCount = await Alert.countDocuments({
      machineId,
      resolved: false
    });

    let status = "normal";

    if (alertCount > 3) status = "critical";
    else if (alertCount > 1) status = "warning";

    await Machine.findByIdAndUpdate(machineId, {
      healthStatus: status
    });

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
export const getReadingsByMachine = async (req, res) => {
  try {
    const readings = await MachineReading
      .find({ machineId: req.params.machineId })
      .sort({ createdAt: -1 });

    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLatestReading = async (req, res) => {
  try {
    const reading = await MachineReading
      .findOne({ machineId: req.params.machineId })
      .sort({ createdAt: -1 });

    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};