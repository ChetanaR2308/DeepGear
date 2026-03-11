import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import machineReadingRoutes from "./routes/machineReadingRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import protect from "./middleware/authMiddleware.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ====================
// ROUTES
// ====================
app.use("/api/auth", authRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/readings", machineReadingRoutes);
app.use("/api/maintenance", maintenanceRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("DeepGear Backend Running");
});

// Test protected route
app.get("/protected-test", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});