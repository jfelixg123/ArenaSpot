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

const getCenterByIdModel = async (id) => {

    const query = `
        SELECT
            gc.id_center,
            gc.nombre,
            gc.descripcion,
            gc.direccion,
            gc.ciudad,
            gc.lat,
            gc.lng,

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

        WHERE gc.id_center = ?

        GROUP BY
            gc.id_center,
            gc.nombre,
            gc.descripcion,
            gc.direccion,
            gc.ciudad,
            cm.url,
            gc.lat,
            gc.lng
    `;

    const [rows] = await pool.query(query, [id]);

    return rows[0];
};

const getCenterSpecsModel = async (id) => {

    const query = `
        SELECT
            p.id_puesto,
            p.nombre_o_numero,
            z.tipo,

            pcs.cpu,
            pcs.gpu,
            pcs.ram,
            pcs.monitor,

            vrs.headset,
            vrs.controllers,

            sim.volante,
            sim.pedales,

            cons.plataforma

        FROM puesto p

        JOIN zona z
            ON z.id_zona = p.id_zona

        LEFT JOIN puesto_pc_specs pcs
            ON pcs.id_puesto = p.id_puesto

        LEFT JOIN puesto_vr_specs vrs
            ON vrs.id_puesto = p.id_puesto

        LEFT JOIN puesto_simulador_specs sim
            ON sim.id_puesto = p.id_puesto

        LEFT JOIN puesto_consola_specs cons
            ON cons.id_puesto = p.id_puesto

        WHERE z.id_center = ?
    `;

    const [rows] = await pool.query(query, [id]);

    return rows;
};

const getCenterGamesModel = async (id) => {

    const query = `
        SELECT
            j.id_juego,
            j.nombre,
            j.genero,
            j.plataforma,
            j.portada_url

        FROM center_juego cj

        JOIN juego j
            ON j.id_juego = cj.id_juego

        WHERE cj.id_center = ?
    `;

    const [rows] = await pool.query(query, [id]);

    return rows;
};

module.exports = {
    getAllCentersModel,
    getCenterByIdModel,
    getCenterSpecsModel,
    getCenterGamesModel
};
