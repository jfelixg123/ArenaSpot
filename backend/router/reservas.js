const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const reservaController = require("../controllers/reserva.controller");

router.get("/:id_center", auth, reservaController.obtenerReservas);
router.post("/create-checkout-session", auth, reservaController.createCheckoutSession);
module.exports = router;
