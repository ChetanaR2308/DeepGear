import MaintenanceLog from "../models/MaintenanceLog.js";

export const createMaintenance = async (req, res) => {
  try {
    const log = await MaintenanceLog.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMaintenances = async (req, res) => {
  try {
    const logs = await MaintenanceLog.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMaintenanceById = async (req, res) => {
  try {
    const log = await MaintenanceLog.findById(req.params.id);
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMaintenance = async (req, res) => {
  try {
    const log = await MaintenanceLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMaintenance = async (req, res) => {
  try {
    await MaintenanceLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Maintenance log deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};