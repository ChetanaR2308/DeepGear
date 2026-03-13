import Machine from "../models/Machine.js";

// CREATE
export const createMachine = async (req, res) => {
  try {
    const machine = await Machine.create(req.body);
    res.status(201).json({ message: "Machine created", machine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Machine updated", machine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteMachine = async (req, res) => {
  try {
    await Machine.findByIdAndDelete(req.params.id);
    res.json({ message: "Machine deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
export const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
export const getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ message: "Machine not found" });
    res.json(machine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};