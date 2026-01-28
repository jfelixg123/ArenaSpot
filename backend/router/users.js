const { Router } = require('express');
const express = require('express');
const pool = require('../config/db');

const router = Router();

const usuarios = [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
]

// GET /api/users

// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       "SELECT id_usuario, nombre, email, rol, estado FROM usuario"
//     );
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.get('/', (req, res) => {
  res.json({ 
    message: 'ok', 
    data: usuarios  
    });
  
});

router.get('/2', (req, res) => {
  res.json({ message: 'ok users 2' });
});

module.exports = router;