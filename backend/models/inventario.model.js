const db = require("../config/db");


const getInventarioByCenter = async (id_center) => {
  const query = `
    SELECT
      i.id_item,
      i.nombre,
      i.categoria,
      il.cantidad
    FROM inventario_local il
    JOIN item i ON il.id_item = i.id_item
    WHERE il.id_center = ?
  `;

  const [rows] = await db.query(query, [id_center]);
  return rows;
};


const getPuestosInventario = async (id_center) => {
  const query = `
    SELECT
      p.id_puesto,
      p.nombre_o_numero,
      z.nombre AS zona,
      i.id_item,
      z.tipo,

      -- COMPONENTES
      i.nombre AS item,
      pi.cantidad,

      -- PC SPECS
      pcs.cpu,
      pcs.gpu,
      pcs.ram,
      pcs.almacenamiento,
      pcs.monitor,

      -- CONSOLA
      cs.plataforma,
      cs.almacenamiento,
      cs.monitor_tv,
      cs.notas,

      -- VR
      vr.headset,
      vr.controllers,
      vr.tracking,
      vr.plataforma_pc,
      vr.notas,

      -- SIMULADOR
      sm.base,
      sm.volante,
      sm.pedales,
      sm.shifter,
      sm.asiento,
      sm.plataforma_pc,
      sm.notas

    FROM puesto p
    JOIN zona z ON p.id_zona = z.id_zona

    LEFT JOIN puesto_item pi ON pi.id_puesto = p.id_puesto
    LEFT JOIN item i ON pi.id_item = i.id_item

    LEFT JOIN puesto_pc_specs pcs ON pcs.id_puesto = p.id_puesto
    LEFT JOIN puesto_consola_specs cs ON cs.id_puesto = p.id_puesto
    LEFT JOIN puesto_vr_specs vr ON vr.id_puesto = p.id_puesto
    LEFT JOIN puesto_simulador_specs sm ON sm.id_puesto = p.id_puesto

    WHERE z.id_center = ?
  `;

  const [rows] = await db.query(query, [id_center]);
  return rows;
};


const createItem = async (id_center, nombre, categoria, cantidad) => {
  const [result] = await db.query(
    `INSERT INTO item (nombre, categoria) VALUES (?, ?)`,
    [nombre, categoria]
  );

  await db.query(
    `INSERT INTO inventario_local (id_center, id_item, cantidad)
     VALUES (?, ?, ?)`,
    [id_center, result.insertId, cantidad]
  );

  return result.insertId;
};


const updateStock = async (id_center, id_item, cantidad) => {
  await db.query(
    `UPDATE inventario_local
     SET cantidad = ?
     WHERE id_center = ? AND id_item = ?`,
    [cantidad, id_center, id_item]
  );
};


const deleteItem = async (id_item) => {
  await db.query(
    `DELETE FROM item WHERE id_item = ?`,
    [id_item]
  );
};

const deletePuesto = async (id_puesto) => {
  await db.query(
    `DELETE FROM puesto WHERE id_puesto = ?`,
    [id_puesto]
  );
};

const createPuesto = async (id_zona, nombre) => {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const { id_zona, nombre, specs, perifericos } = data;

    // 1. Crear puesto
    const [puestoResult] = await conn.query(
      `INSERT INTO puesto (id_zona, nombre_o_numero)
       VALUES (?, ?)`,
      [id_zona, nombre]
    );

    const id_puesto = puestoResult.insertId;

    // 2. Insertar specs según tipo
    if (specs?.cpu) {
      await conn.query(
        `INSERT INTO puesto_pc_specs
        (id_puesto, cpu, gpu, ram, almacenamiento, monitor)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          id_puesto,
          specs.cpu,
          specs.gpu,
          specs.ram,
          specs.almacenamiento,
          specs.monitor
        ]
      );
    }

    // 3. Periféricos
    for (const p of perifericos) {
      await conn.query(
        `INSERT INTO puesto_item (id_puesto, id_item, cantidad)
         VALUES (?, ?, ?)`,
        [id_puesto, p.id_item, p.cantidad]
      );
    }

    await conn.commit();
    return id_puesto;

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

const getZonasByCenter = async (id_center) => {
  const [rows] = await db.query(
    `SELECT id_zona, nombre, tipo
     FROM zona
     WHERE id_center = ?`,
    [id_center]
  );

  return rows;
};

const updatePuesto = async (id, nombre, id_zona, specs, perifericos) => {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 🔹 1. actualizar puesto
    await conn.query(
      `UPDATE puesto
       SET nombre_o_numero = ?, id_zona = ?
       WHERE id_puesto = ?`,
      [nombre, id_zona, id]
    );

    // 🔹 2. borrar periféricos antiguos
    await conn.query(
      `DELETE FROM puesto_item WHERE id_puesto = ?`,
      [id]
    );

    // 🔹 3. insertar periféricos nuevos
    for (const p of perifericos) {
      await conn.query(
        `INSERT INTO puesto_item (id_puesto, id_item, cantidad)
         VALUES (?, ?, ?)`,
        [id, p.id_item, p.cantidad]
      );
    }

    // 🔹 4. actualizar specs PC (simple)
    if (specs?.cpu) {
      await conn.query(
        `UPDATE puesto_pc_specs
         SET cpu=?, gpu=?, ram=?, almacenamiento=?, monitor=?
         WHERE id_puesto = ?`,
        [
          specs.cpu,
          specs.gpu,
          specs.ram,
          specs.almacenamiento,
          specs.monitor,
          id
        ]
      );
    }

    await conn.commit();

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getInventarioByCenter,
  getPuestosInventario,
  createItem,
  updateStock,
  deletePuesto,
  createPuesto,
  getZonasByCenter,
  updatePuesto
};
