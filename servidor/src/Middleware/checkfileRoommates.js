const {fs, objetoRoommates, rutaCompletaRoommates } = require("../utils/constants")

const checkFileRoommates = (req, res, next) => {

    // Verifica si el archivo existe
    if (fs.existsSync(rutaCompletaRoommates)) {
      console.log('El archivo existe en la siguiente ruta:', rutaCompletaRoommates);
      const stringRoommates = fs.readFileSync(rutaCompletaRoommates, 'utf8');
      req.roommates = JSON.parse(stringRoommates); // si existe el archivo, mi arreglo sera lo que contiene el archivo

      console.log("leo mi archivo existente:", req.roommates);
      req.archivoExiste = true;
    } else {
/*       req.roommates = roommates;  // si no existe el archivo, mi arreglo sera unio v */
      req.roommates = objetoRoommates;  // si no existe el archivo, mi arreglo sera unio v
      console.error('El archivo no existe');
      req.archivoExiste = false;
    }
    next(); // Llama a la siguiente función en la cadena de middleware

  };

  module.exports =  checkFileRoommates ;
