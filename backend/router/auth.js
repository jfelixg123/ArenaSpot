const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id_usuario: user.id_usuario, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER CLIENTE
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    if (!nombre || !email || !password)
      return res.status(400).json({ message: "Campos obligatorios faltantes" });

    const [exists] = await pool.query(
      "SELECT id_usuario FROM usuario WHERE email = ?",
      [email]
    );

    if (exists.length)
      return res.status(409).json({ message: "Email ya registrado" });

    const hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuario (nombre, email, password, telefono, rol) VALUES (?, ?, ?, ?, 'CLIENTE')",
      [nombre, email, hash, telefono]
    );

    const user = {
      id_usuario: result.insertId,
      nombre,
      email,
      rol: "CLIENTE",
    };

    const token = generateToken(user);

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en registro" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE email = ? AND estado = 'activo'",
      [email]
    );

    if (!rows.length)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const token = generateToken(user);

    delete user.password;

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en login" });
  }
});

module.exports = router;