const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB (optional)
connectDB();

// Routes
app.use("/api/contact", contactRoutes);

// Health
app.get("/", (req, res) => {
  res.send({ status: "ok", message: "Portfolio backend running" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
