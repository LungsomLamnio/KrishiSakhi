require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const connectDB = require("./db/db");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api/farmers", farmerRoutes);

app.get("/", (req, res) => {
  res.send("root page");
});

module.exports = app;
