const db = require("../config/db");

const getReservasByCenter = async (id_center) => {
  const query = `
  SELECT
    r.id_reserva,
    r.fecha_hora_inicio,
    r.fecha_hora_fin,
    p.nombre_o_numero,
    z.nombre AS zona,
    u.nombre AS cliente
  FROM reserva r
  JOIN puesto p ON r.id_puesto = p.id_puesto
  JOIN zona z ON p.id_zona = z.id_zona
  JOIN gaming_center gc ON z.id_center = gc.id_center
  JOIN usuario u ON r.id_cliente = u.id_usuario
  WHERE gc.id_center = ?
    AND r.estado = 'confirmada'
`;

  const [rows] = await db.query(query, [id_center]);
  return rows;
};

module.exports = { getReservasByCenter };
