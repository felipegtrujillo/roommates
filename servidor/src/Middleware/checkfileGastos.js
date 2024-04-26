const {fs, objetoGastos, rutaCompletaGastos } = require("../utils/constants")

const checkFileGastos = (req, res, next) => {

    // Verifica si el archivo existe
    if (fs.existsSync(rutaCompletaGastos)) {
      console.log('El archivo existe en la siguiente ruta:', rutaCompletaGastos);
      const stringGastos = fs.readFileSync(rutaCompletaGastos, 'utf8');
      req.gastos = JSON.parse(stringGastos); // si existe el archivo, mi arreglo sera lo que contiene el archivo
      console.log("leo mi archivo existente:", req.gastos);
      req.archivoExiste = true;
    } else {
      req.gastos = objetoGastos;  // si no existe el archivo, mi arreglo sera  
      console.error('El archivo no existe');
      req.archivoExiste = false;
    }
  
    console.log("llama a la siguiente funcion");
    next(); // Llama a la siguiente función en la cadena de middleware

  };


  module.exports =  checkFileGastos ;

