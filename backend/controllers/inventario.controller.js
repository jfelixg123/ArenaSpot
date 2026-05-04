const {
  getInventarioByCenter,
  getPuestosInventario,
  createItem,
  updateStock,
  deletePuesto,
  createPuesto,
  getZonasByCenter,
  updatePuesto,
} = require("../models/inventario.model");


const obtenerInventario = async (req, res) => {
  try {
    const { id_center } = req.params;

    const inventario = await getInventarioByCenter(id_center);

    res.json(inventario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener inventario" });
  }
};


const obtenerPuestosInventario = async (req, res) => {
  try {
    const { id_center } = req.params;
    const data = await getPuestosInventario(id_center);

    const puestosMap = {};

    data.forEach(row => {

      if (!puestosMap[row.id_puesto]) {
        puestosMap[row.id_puesto] = {
          id: row.id_puesto,
          nombre: row.nombre_o_numero,
          zona: row.zona,
          tipo: row.tipo,

          specs: {},
          componentes: []
        };

        // 🔥 asignar specs según tipo
        if (row.tipo === "PC") {
          puestosMap[row.id_puesto].specs = {
            cpu: row.cpu,
            gpu: row.gpu,
            ram: row.ram,
            almacenamiento: row.almacenamiento,
            monitor: row.monitor
          };
        }

        if (row.tipo === "CONSOLA") {
          puestosMap[row.id_puesto].specs = {
            plataforma: row.plataforma,
            almacenamiento: row.almacenamiento,
            monitor_tv: row.monitor_tv,
            notas: row.notas
          };
        }

        if (row.tipo === "VR") {
          puestosMap[row.id_puesto].specs = {
            headset: row.headset,
            controllers: row.controllers,
            tracking: row.tracking,
            plataforma_pc: row.plataforma_pc,
            notas: row.notas
          };
        }

        if (row.tipo === "SIMULADOR"){
            puestosMap[row.id_puesto].specs = {
                base: row.base,
                volante: row.volante,
                pedales: row.pedales,
                shifter: row.shifter,
                asiento: row.asiento,
                plataforma_pc: row.plataforma_pc,
                notas: row.notas
            };
        }
      }

      // 🔥 COMPONENTES (IMPORTANTE)
      if (row.id_item) {
        puestosMap[row.id_puesto].componentes.push({
          id_item: row.id_item,
          nombre: row.item,
          cantidad: row.cantidad
        });
      }

    });

    res.json(Object.values(puestosMap));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener puestos" });
  }
};


const crearItem = async (req, res) => {
  try {
    const { id_center } = req.params;
    const { nombre, categoria, cantidad } = req.body;

    await createItem(id_center, nombre, categoria, cantidad);

    res.json({ message: "Item creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear item" });
  }
};

const obtenerItems = async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener items" });
  }
};


const actualizarStock = async (req, res) => {
  try {
    const { id_center, id_item } = req.params;
    const { cantidad } = req.body;

    await updateStock(id_center, id_item, cantidad);

    res.json({ message: "Stock actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar stock" });
  }
};


const eliminarItem = async (req, res) => {
  try {
    const { id_item } = req.params;

    await deleteItem(id_item);

    res.json({ message: "Item eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar item" });
  }
};

const eliminarPuesto = async (req, res) => {
  try {
    const { id } = req.params;

    await deletePuesto(id);

    res.json({ message: "Puesto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar puesto" });
  }
};

const crearPuesto = async (req, res) => {
  try {
    const id = await createPuestoCompleto(req.body);
    res.json({ message: "Equipo creado", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear equipo" });
  }
};

const obtenerZonas = async (req, res) => {
  try {
    const { id_center } = req.params;

    const zonas = await getZonasByCenter(id_center);

    res.json(zonas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener zonas" });
  }
};

const actualizarPuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, id_zona, specs, perifericos } = req.body;

    await updatePuesto(id, nombre, id_zona, specs, perifericos);

    res.json({ message: "Equipo actualizado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar equipo" });
  }
};

module.exports = {
  obtenerInventario,
  obtenerPuestosInventario,
  crearItem,
  actualizarStock,
  eliminarItem,
  eliminarPuesto,
  crearPuesto,
  obtenerZonas,
  obtenerItems,
  actualizarPuesto
};
