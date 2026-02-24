import mongoose from "mongoose";

const machineReadingSchema = new mongoose.Schema({
  machineId: { type: mongoose.Schema.Types.ObjectId, ref: "Machine", required: true, index: true },
  readingValue: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, index: true },
  alertFlag: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("MachineReading", machineReadingSchema);