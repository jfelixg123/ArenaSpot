const db = require("../config/db");

const getReservasByCenter = async (id_center) => {
  const query = `
    SELECT
      r.id_reserva,
      r.fecha_hora_inicio,
      r.fecha_hora_fin,
      p.nombre_o_numero,
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

const getReservasByClient = async (id_cliente) => {
  const query = `
    SELECT
      r.id_reserva,
      r.fecha_hora_inicio,
      r.fecha_hora_fin,
      r.estado,
      p.nombre_o_numero,
      gc.id_center,
      gc.nombre AS center_nombre,
      gc.direccion AS center_direccion,
      gc.ciudad AS center_ciudad
    FROM reserva r
    JOIN puesto p ON r.id_puesto = p.id_puesto
    JOIN zona z ON p.id_zona = z.id_zona
    JOIN gaming_center gc ON z.id_center = gc.id_center
    WHERE r.id_cliente = ?
    ORDER BY r.fecha_hora_inicio DESC
  `;

  const [rows] = await db.query(query, [id_cliente]);
  return rows;
};

module.exports = { getReservasByCenter, getReservasByClient };

const deleteReservaById = async (id_reserva, id_cliente) => {
  const query = `DELETE FROM reserva WHERE id_reserva = ? AND id_cliente = ?`;
  const [result] = await db.query(query, [id_reserva, id_cliente]);
  return result.affectedRows;
};

module.exports = { getReservasByCenter, getReservasByClient, deleteReservaById };
