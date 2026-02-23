import mongoose from "mongoose";

const maintenanceLogSchema = new mongoose.Schema({
  machineId: { type: mongoose.Schema.Types.ObjectId, ref: "Machine", required: true, index: true },
  performedBy: { type: String, required: true },
  description: { type: String },
  maintenanceDate: { type: Date, default: Date.now, index: true },
}, { timestamps: true });

export default mongoose.model("MaintenanceLog", maintenanceLogSchema);