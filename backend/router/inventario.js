const router = require("express").Router();
const {
  obtenerInventario,
  obtenerPuestosInventario,
  crearItem,
  actualizarStock,
  eliminarPuesto,
  crearPuesto,
  obtenerZonas,
  obtenerItems,
  actualizarPuesto
} = require("../controllers/inventario.controller");

// 🔥 PRIMERO LAS ESPECÍFICAS
router.get("/zonas/:id_center", obtenerZonas);
router.get("/puestos/:id_center", obtenerPuestosInventario);
router.post("/puestos", crearPuesto);
router.put("/puestos/:id", actualizarPuesto);
router.delete("/puestos/:id", eliminarPuesto);

// 🔴 AL FINAL LAS GENÉRICAS
router.get("/:id_center", obtenerInventario);
router.post("/:id_center", crearItem);
router.put("/stock/:id_center/:id_item", actualizarStock);
router.get("/items", obtenerItems);

module.exports = router;
