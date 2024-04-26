const { Router } = require("express");
const router = Router();
const roommates = require("./roommates.routes.js");
const gastos = require("./gastos.routes.js")

/* GET DE EJEMPLO  localhost:3000/   */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

/*definimos los endpoints en secciones */
router.use("/roommates", roommates);
router.use("/gastos", gastos);

router.get("*", (req, res) => {
  res.send("<h1> Esta Página no exíste <h1>");
});



module.exports = router;
