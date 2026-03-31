import Alert from "../models/Alert.js";

// GET ALL ALERTS
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE ALERT
export const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json({ message: "Alert created", alert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMachineAlerts = async (req, res) => {

  try {

    const alerts = await Alert.find({
      machineId: req.params.machineId
    });

    res.json(alerts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.json({ message: "Alert resolved", alert });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};