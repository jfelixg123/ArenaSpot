const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const reservaController = require("../controllers/reserva.controller");

router.get("/:id_center", auth, reservaController.obtenerReservas);

module.exports = router;
