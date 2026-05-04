const { getReservasByCenter } = require("../models/reserva.model");

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

module.exports = { obtenerReservas };
