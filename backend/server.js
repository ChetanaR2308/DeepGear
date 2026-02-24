import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));