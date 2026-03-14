const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/files");

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});