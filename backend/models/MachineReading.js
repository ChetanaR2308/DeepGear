import mongoose from "mongoose";

const machineReadingSchema = new mongoose.Schema(
  {
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
      index: true,
    },

    temperature: {
      type: Number,
      required: true,
      min: -50,
      max: 200,
    },

    pressure: {
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },

    vibration: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    rpm: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },

    power: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },

    speed: {
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);


machineReadingSchema.index({ machineId: 1, timestamp: -1 });

export default mongoose.model("MachineReading", machineReadingSchema);