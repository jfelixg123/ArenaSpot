const express = require("express");
const authRouter = require("./router/auth");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// RUTAS
const usersRouter = require("./router/users");
const reservasRouter = require("./router/reservas");
const inventarioRouter = require("./router/inventario");
const trendingRouter = require("./router/trending");
const centerRouter = require("./router/center");

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/reservas", reservasRouter);
app.use('/api/inventario', inventarioRouter);
app.use('/api/trendingGamingCenters', trendingRouter);
app.use("/api/centers", centerRouter);


// test rápido DB
const pool = require("./config/db");
app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ ok: true, result: rows[0].result });
  } catch (err) {
    console.error("DB-TEST ERROR:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log('Servidor corriendo en puerto 3001');
});
