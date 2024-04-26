const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.routes"); //<=todas las rutas
const app = express(); //=> 

const rommates = []; /* para guardar mis usuarios previamente y luego grabar en el json */

/* ------MIDDLEWARES---------------------------------------------------------- */
/* middleware para aceptar jsons */
app.use(express.json());

app.use(express.static('public'));
/* ----------------------CORS----------------------------------------- */
/* Para aceptar peticiones */
app.use(cors());
/* -----------------------RUTAS------------- */
/* Para los endpoints */
app.use("", routes); 

module.exports =  app;
