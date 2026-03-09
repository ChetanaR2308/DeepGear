<<<<<<< HEAD
import authRoutes from "./routes/authRoutes.js";
=======
>>>>>>> 1c30b1a481a767d7bbb6036e55529c9f3533c86f
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

<<<<<<< HEAD
// Import models to register them
import User from "./models/user.js";
import Machine from "./models/Machine.js";
import MachineReading from "./models/MachineReading.js";
import Alert from "./models/Alert.js";
import MaintenanceLog from "./models/MaintenanceLog.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
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
=======
// Routes
import authRoutes from "./routes/authRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";

dotenv.config();

// Connect to MongoDB (Member 1 DB)
connectDB();

const app = express();
app.use(express.json());

// ====================
// ROUTES
// ====================
app.use("/api/auth", authRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/alerts", alertRoutes);

// Test route to check server
app.get("/", (req, res) => {
  res.send("DeepGear Member2 Backend Running");
});

// Example protected route
// (just to quickly test JWT middleware)
import protect from "./middleware/authMiddleware.js";
app.get("/protected-test", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user, // Shows user info from token
  });
});

// PORT (different from Member 1 to avoid conflict)
const PORT = process.env.PORT || 5001;
>>>>>>> 1c30b1a481a767d7bbb6036e55529c9f3533c86f
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));