const { Router } = require("express");
const router = Router(); 
const  checkFileRoommate   = require("../Middleware/checkfileRoommates.js");
const {
  getRommate,
  postRommate
} = require("../controllers/rommates.controllers.js");

/* GET => CONSULTA */
router.get("/", checkFileRoommate, getRommate);
 
/* POST => CREAR */
router.post("/", checkFileRoommate, postRommate);

/* PATCH O PUT => EDITAR */

module.exports = router;
