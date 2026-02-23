import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import models to register them
import User from "./models/user.js";
import Machine from "./models/Machine.js";
import MachineReading from "./models/MachineReading.js";
import Alert from "./models/Alert.js";
import MaintenanceLog from "./models/MaintenanceLog.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Test User route
app.get("/test-user", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: "test@example.com" });
    if (userExists) return res.json({ message: "Test user exists", user: userExists });

    const user = await User.create({ name: "Test", email: "test@example.com", password: "1234" });
    res.json({ message: "Test user created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test Machine route
app.get("/test-machine", async (req, res) => {
  try {
    const machineExists = await Machine.findOne({ machineId: "M001" });
    if (machineExists) return res.json({ message: "Test machine exists", machine: machineExists });

    const machine = await Machine.create({ machineId: "M001", type: "Lathe" });
    res.json({ message: "Test machine created", machine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));