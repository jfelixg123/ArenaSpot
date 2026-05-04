const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const authMiddleware = require("../middleware/auth");


const router = express.Router();
const upload = require("../middleware/upload");


const generateToken = (user) => {
  return jwt.sign(
    { id_usuario: user.id_usuario, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTRO GAME CENTER

// Helpers
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || ""));
const norm = (s) => (s == null ? null : String(s).trim());

router.post("/register-center", async (req, res) => {
  const { owner, center } = req.body || {};

  // --- Validación mínima ---
  const ownerNombre = norm(owner?.nombre);
  const ownerEmail = norm(owner?.email)?.toLowerCase();
  const ownerPassword = owner?.password;

  const centerNombre = norm(center?.nombre);
  const centerDireccion = norm(center?.direccion);

  if (!ownerNombre || !ownerEmail || !ownerPassword) {
    return res.status(400).json({ ok: false, error: "Datos de propietario incompletos." });
  }
  if (!isEmail(ownerEmail)) {
    return res.status(400).json({ ok: false, error: "Email inválido." });
  }
  if (String(ownerPassword).length < 6) {
    return res.status(400).json({ ok: false, error: "La contraseña debe tener al menos 6 caracteres." });
  }
  if (!centerNombre || !centerDireccion) {
    return res.status(400).json({ ok: false, error: "Nombre y dirección del local son obligatorios." });
  }

  // Datos center opcionales
  const descripcion = norm(center?.descripcion);
  const telefono = norm(center?.telefono);
  const website = norm(center?.website);
  const ciudad = norm(center?.ciudad);
  const pais = norm(center?.pais);
  const codigo_postal = norm(center?.codigo_postal);
  const lat = center?.lat != null ? Number(center.lat) : null;
  const lng = center?.lng != null ? Number(center.lng) : null;

  const logoUrl = norm(center?.logoUrl);

  // Horarios simplificados: open/close para todos los días excepto los cerrados
  // Ejemplo hours: { open: "10:00", close: "22:00", closedWeekdays: [0] }
  const openTime = norm(center?.hours?.open);   // "HH:MM"
  const closeTime = norm(center?.hours?.close); // "HH:MM"
  const closedWeekdays = Array.isArray(center?.hours?.closedWeekdays)
    ? center.hours.closedWeekdays.map((n) => Number(n)).filter((n) => Number.isInteger(n) && n >= 0 && n <= 6)
    : [];

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // 1) crear usuario ADMIN (owner)
    const passwordHash = await bcrypt.hash(String(ownerPassword), 10);

    const [userResult] = await conn.query(
      `INSERT INTO usuario (nombre, email, password, telefono, rol)
       VALUES (?, ?, ?, ?, 'ADMIN')`,
      [ownerNombre, ownerEmail, passwordHash, norm(owner?.telefono)]
    );

    const ownerId = userResult.insertId;

    // 2) crear gaming_center
    const [centerResult] = await conn.query(
      `INSERT INTO gaming_center
       (owner_id, nombre, descripcion, email_contacto, telefono, website,
        direccion, ciudad, pais, codigo_postal, lat, lng)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ownerId,
        centerNombre,
        descripcion,
        norm(center?.email_contacto) || ownerEmail, // por defecto el email del owner
        telefono,
        website,
        centerDireccion,
        ciudad,
        pais,
        codigo_postal,
        Number.isFinite(lat) ? lat : null,
        Number.isFinite(lng) ? lng : null,
      ]
    );

    const centerId = centerResult.insertId;

    // 3) logo opcional
    if (logoUrl) {
      await conn.query(
        `INSERT INTO center_media (id_center, tipo, url, orden)
         VALUES (?, 'logo', ?, 0)`,
        [centerId, logoUrl]
      );
    }

    // 4) horarios opcional (si mandan open/close)
    if (openTime && closeTime) {
      // 7 días (0..6)
      const values = [];
      for (let weekday = 0; weekday <= 6; weekday++) {
        const isClosed = closedWeekdays.includes(weekday);
        values.push([
          centerId,
          weekday,
          isClosed ? 1 : 0,
          isClosed ? null : openTime,
          isClosed ? null : closeTime,
        ]);
      }

      await conn.query(
        `INSERT INTO center_opening_hours (id_center, weekday, is_closed, open_time, close_time)
         VALUES ?
         ON DUPLICATE KEY UPDATE
           is_closed = VALUES(is_closed),
           open_time = VALUES(open_time),
           close_time = VALUES(close_time)`,
        [values]
      );
    }

    await conn.commit();

    return res.status(201).json({
      ok: true,
      owner_id: ownerId,
      id_center: centerId,
    });
  } catch (err) {
    if (conn) await conn.rollback();

    // Duplicado de email (UNIQUE)
    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ ok: false, error: "Ese email ya está registrado." });
    }

    console.error("REGISTER-CENTER ERROR:", err);
    return res.status(500).json({ ok: false, error: "Error interno al registrar." });
  } finally {
    if (conn) conn.release();
  }
});

// REGISTRO CLIENTE
router.post("/register-client", async (req, res) => {
  try {
    const nombre = norm(req.body?.nombre);
    const email = norm(req.body?.email).toLowerCase();
    const password = req.body?.password;
    const telefono = norm(req.body?.telefono) || null;

    if (!nombre || !email || !password) {
      return res.status(400).json({ ok: false, error: "Completa nombre, email y contraseña." });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Email inválido." });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ ok: false, error: "La contraseña debe tener al menos 6 caracteres." });
    }

    // email único
    const [exists] = await pool.query("SELECT id_usuario FROM usuario WHERE email = ? LIMIT 1", [email]);
    if (exists.length > 0) {
      return res.status(409).json({ ok: false, error: "Ese email ya está registrado." });
    }

    const hash = await bcrypt.hash(String(password), 10);

    const [result] = await pool.query(
      `INSERT INTO usuario (nombre, email, password, telefono, rol)
       VALUES (?, ?, ?, ?, 'CLIENTE')`,
      [nombre, email, hash, telefono]
    );

    return res.status(201).json({ ok: true, id_usuario: result.insertId });
  } catch (err) {
    console.error("REGISTER-CLIENT ERROR:", err);
    return res.status(500).json({ ok: false, error: "Error interno al registrar." });
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
    console.error("LOGIN ERROR:", err);
    console.error(err);
    res.status(500).json({ message: "Error en login" });
  }
});

// Upload logo
router.post("/upload-logo", upload.single("logo"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No se subió imagen" });

  const url = `http://localhost:3001/uploads/logos/${req.file.filename}`;
  res.json({ ok: true, url });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, email, rol FROM usuario WHERE id_usuario = ?",
      [req.user.id_usuario]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("ME ERROR:", err);
    res.status(500).json({ message: "Error interno" });
  }
});

module.exports = router;


