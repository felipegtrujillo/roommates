const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { fs, rutaCompletaRoommates } = require("../utils/constants");

/* GET => CONSULTAR */
const getRommate = async (req, res) => {
  try {
      console.log("leo mi archivo existente:", req.roommates);
      return res.status(200).json({ status: "ok", roommates: req.roommates });
  } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
  }
};

/* POST => CREAR */
const postRommate = async (req, res) => {
  try {
    let roommates = req.roommates;

    const randomUserUrl = "https://randomuser.me/api/?results=1";
    const response = await axios.get(randomUserUrl);

    const newUser = response.data;

    // Obtener el primer resultado del objetoJSON existente
    const resultadoExistente = newUser.results[0];
    const id = uuidv4().substring(0, 8);

    // Crear un nuevo objeto JSON con los valores deseados
    const nuevoRoommate = {
      ID: id,
      nombre: `${newUser.results[0].name.first}  ${newUser.results[0].name.last}`,
      debe: "",
      recibe: "",
      gastosRealizados: "",
  
    };

    console.log("response.data", nuevoRoommate);

    /* primero verifico si el archivo esta creado o no */
    /* si no esta creado lo Creo */
    if (!req.archivoExiste) {
      console.log("Creando el archivo");
      (roommates.roommates).push(nuevoRoommate);
       roommates.numIntegrantes = "1";
      fs.writeFileSync(rutaCompletaRoommates, JSON.stringify(roommates));
    } else {
      console.log("Sobrescribiendo el archivo");
      console.log(typeof roommates);
      (roommates.roommates).push(nuevoRoommate);
      const numRoommates = roommates.roommates.length;
      roommates.numIntegrantes = numRoommates;
      fs.writeFileSync(rutaCompletaRoommates, JSON.stringify(roommates));

    }
    return res.status(200).json({ status: "ok" , message : "roommete creado correctamente"});
    
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ status: "error", mensaje: error.message });
  }
};

module.exports = {
  getRommate,
  postRommate,
};
