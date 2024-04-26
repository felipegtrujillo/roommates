
const fs = require("fs");
const path = require('path');

let objetoRoommates = { roommates: [] };  /* para guardar los roommates previamente y luego grabar en el json */
let objetoGastos = { gastos: [] }; /* para guardar los gastos previamente y luego grabar en el json */
/* const directorioActual = __dirname; */
const directorioActual = path.join(__dirname, '..', '..');
const nombreArchivo1 = 'roommates.json';
const rutaCompletaRoommates = path.join(directorioActual, nombreArchivo1);
const nombreArchivo2 = 'gastos.json';
const rutaCompletaGastos = path.join(directorioActual, nombreArchivo2);

module.exports = {fs, objetoRoommates, objetoGastos, directorioActual, rutaCompletaRoommates, rutaCompletaGastos };

