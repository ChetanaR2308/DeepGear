import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  machineId: { type: mongoose.Schema.Types.ObjectId, ref: "Machine", required: true, index: true },
  alertType: { type: String, required: true, index: true },
  message: { type: String, required: true },
  severity: { type: String,enum: ["low","medium","high","critical"],
    default: "low"},
  resolved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Alert", alertSchema);