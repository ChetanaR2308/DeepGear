import Machine from "../models/Machine.js";

export const createMachine = async (req, res) => {//Creates and stores a new machine record in the database using the request data.
  try {
    const { machineId, type, location, status } = req.body;

    const machine = await Machine.create({
      machineId,
      type,
      location,
      status,
    });

    res.status(201).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllMachines = async (req, res) => {//Retrieves and returns all machine records from the database.
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMachineById = async (req, res) => {//Fetches and returns a single machine based on its unique ID.
  try {
    const machine = await Machine.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.status(200).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateMachine = async (req, res) => {//Updates the details of an existing machine identified by its ID.
  try {
    const { machineId, type, location, status } = req.body;

    const machine = await Machine.findByIdAndUpdate(
      req.params.id,
      { machineId, type, location, status },
      { new: true, runValidators: true }
    );

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.status(200).json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteMachine = async (req, res) => {//Deletes a machine record from the database using its ID.
  try {
    const machine = await Machine.findByIdAndDelete(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.status(200).json({ message: "Machine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import MachineReading from "../models/MachineReading.js";

export const getLatestReading = async (req, res) => {
  try {
    const reading = await MachineReading
      .findOne({ machineId: req.params.id })
      .sort({ createdAt: -1 });

    res.json(reading);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Alert from "../models/Alert.js";

export const getMachineHealth = async (req, res) => {
  try {
    const alertCount = await Alert.countDocuments({
      machineId: req.params.id,
      resolved: false
    });

    let status = "healthy";

    if (alertCount > 3) status = "critical";
    else if (alertCount > 1) status = "warning";

    res.json({
      machineId: req.params.id,
      status,
      alertCount
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};