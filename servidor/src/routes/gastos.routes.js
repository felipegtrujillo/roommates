const { Router } = require("express");
const router = Router(); 
const   checkFileGastos = require("../Middleware/checkfileGastos.js");
const {
  getGastos,
  postGastos,
  editGastos,
  deleteGastos
} = require("../controllers/gastos.controllers");

/* GET => CONSULTA */
router.get("/", checkFileGastos  , getGastos);

/* POST => CREA */
router.post("/", checkFileGastos  , postGastos);

/* PATCH O PUT => EDITAR */
router.put("/", checkFileGastos, editGastos);

/* DELETE => ELIMINAR */
router.delete("/", checkFileGastos, deleteGastos);

module.exports = router;
