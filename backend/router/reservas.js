const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const reservaController = require("../controllers/reserva.controller");

router.get("/mis-reservas", auth, reservaController.obtenerMisReservas);
router.get("/:id_center", auth, reservaController.obtenerReservas);
router.delete("/:id_reserva", auth, reservaController.eliminarReserva);

module.exports = router;
