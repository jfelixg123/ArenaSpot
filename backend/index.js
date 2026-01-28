const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // 👈 OJO: con paréntesis

// RUTAS
const usersRouter = require("./router/users");
app.use("/api/users", usersRouter);

// test rápido DB
const pool = require("./config/db");
app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ ok: true, result: rows[0].result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 8080; // si quieres seguir usando 8080
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
