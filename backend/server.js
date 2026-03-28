import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import machineReadingRoutes from "./routes/machineReadingRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";

// Middleware
import protect from "./middleware/authMiddleware.js";

// Models (Chetana added)
import User from "./models/User.js";
import Machine from "./models/Machine.js";
import MachineReading from "./models/MachineReading.js";
import Alert from "./models/Alert.js";
import MaintenanceLog from "./models/MaintenanceLog.js";

// Dashboard util
import { getDashboardStats } from "./utils/dashboardStats.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/readings", machineReadingRoutes);
app.use("/api/maintenance", maintenanceRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("DeepGear Backend Running");
});

// Protected route
app.get("/protected-test", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

// Dashboard route
app.get("/dashboard", async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});