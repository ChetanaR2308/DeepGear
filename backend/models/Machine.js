import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
  machineId: { type: String, required: true, unique: true, index: true },
  type: { type: String, required: true },
  location: { type: String },
  status: { type: String, enum: ["active", "inactive", "maintenance"], default: "active" },
}, { timestamps: true });

export default mongoose.model("Machine", machineSchema);