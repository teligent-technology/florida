require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const todoRoutes = require("./routes/todos");

const app = express();
const corsOptions = {
  origin: "https://florida-frontend.onrender.com", // ✅ sirf aapke frontend ka link allow hoga
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ Mongo connection error:", err));
