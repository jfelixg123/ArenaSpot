const { getReservasByCenter, getReservasByClient, deleteReservaById } = require("../models/reserva.model");

const obtenerReservas = async (req, res) => {
  try {
    const { id_center } = req.params;

    const reservas = await getReservasByCenter(id_center);

    const events = reservas.map(r => ({
      title: `${r.nombre_o_numero} - ${r.cliente}`,
      start: r.fecha_hora_inicio,
      end: r.fecha_hora_fin
    }));

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

const obtenerMisReservas = async (req, res) => {
  try {
    const id_cliente = req.user.id_usuario;
    const reservas = await getReservasByClient(id_cliente);

    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener tus reservas" });
  }
};

module.exports = { obtenerReservas, obtenerMisReservas };

const eliminarReserva = async (req, res) => {
  try {
    const id_reserva = req.params.id_reserva;
    const id_cliente = req.user.id_usuario;

    const affected = await deleteReservaById(id_reserva, id_cliente);

    if (!affected) {
      return res.status(404).json({ error: "Reserva no encontrada o no autorizada" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};

module.exports = { obtenerReservas, obtenerMisReservas, eliminarReserva };
