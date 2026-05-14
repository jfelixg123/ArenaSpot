const pool = require("../config/db");

const getAllCentersModel = async () => {

    const query = `
        SELECT
            gc.id_center,
            gc.nombre,
            gc.descripcion,
            gc.direccion,
            gc.ciudad,

            MIN(t.precio_hora) AS precio,

            cm.url AS imagen

        FROM gaming_center gc

        LEFT JOIN zona z
            ON z.id_center = gc.id_center

        LEFT JOIN tarifa t
            ON t.id_zona = z.id_zona
            AND t.activa = true

        LEFT JOIN center_media cm
            ON cm.id_center = gc.id_center
            AND cm.tipo = 'cover'

        WHERE gc.estado = 'activo'

        GROUP BY
            gc.id_center,
            gc.nombre,
            gc.descripcion,
            gc.direccion,
            gc.ciudad,
            cm.url

        ORDER BY gc.nombre ASC

        LIMIT 4;
    `;

    const [rows] = await pool.query(query);

    return rows;
};

module.exports = {
    getAllCentersModel
};
