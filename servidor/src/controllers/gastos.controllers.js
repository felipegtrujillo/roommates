const { v4: uuidv4 } = require("uuid");
const { fs, rutaCompletaGastos } = require("../utils/constants");

const getGastos = async (req, res) => {
  try {
    console.log("leo mi archivo existente:", req.gastos);
    return res.status(200).json({ status: "ok", gastos: req.gastos });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

const postGastos = async (req, res) => {
  try {
    let gastos = req.gastos;

    const id = uuidv4().substring(0, 8);
    let roommate = req.body.roommate;
    let desc = req.body.descripcion;
    let monto = req.body.monto;

    let totalAcumulado = 0;

    // Crear un nuevo objeto JSON con los valores deseados
    const nuevoGasto = {
      id: id,
      roommate: roommate,
      descripcion: desc,
      monto: monto,
    };

    console.log(" new gastos", nuevoGasto);

    /* primero verifico si el usuario esta creado o no */
    /* si no esta creado lo Creo */
    if (!req.archivoExiste) {
      console.log("Creando el archivo");
      gastos.gastos.push(nuevoGasto);
      gastos.gastos.forEach((gasto, index) => {
        totalAcumulado += parseInt(gasto.monto); // Sumar el monto al total acumulado
        gastos.totalAcumulado = totalAcumulado; // Actualizar el total acumulado del elemento
      });
      fs.writeFileSync(rutaCompletaGastos, JSON.stringify(gastos));
    } else {
      console.log("Sobrescribiendo el archivo");
      console.log(typeof gastos);
      gastos.gastos.push(nuevoGasto);
      gastos.gastos.forEach((gasto, index) => {
        totalAcumulado += parseInt(gasto.monto); // Sumar el monto al total acumulado
        gastos.totalAcumulado = totalAcumulado; // Actualizar el total acumulado del elemento
      });

      fs.writeFileSync(rutaCompletaGastos, JSON.stringify(gastos));
    }
    return res.status(200).json({ status: "ok", gastos: gastos });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ status: "error", mensaje: error.message });
  }
};

/* PATCH O PUT => EDITAR */
const editGastos = async (req, res) => {
  let gastos = req.gastos;
  let idBuscado = req.query.id;
  let newRoommate = req.body.roommate;
  let newDesc = req.body.descripcion;
  let newMonto = req.body.monto;

  try {
    const elemento = gastos.gastos.find((item) => item.id === idBuscado);

    if (elemento) {
      // Calcular la diferencia entre el nuevo monto y el monto anterior
      const diferenciaMonto = newMonto - elemento.monto;

      elemento.roommate = newRoommate;
      elemento.monto = newMonto;
      elemento.descripcion = newDesc;

      // Actualizar el total acumulado
      gastos.totalAcumulado += diferenciaMonto;

      // Escribir el archivo actualizado
      fs.writeFileSync(rutaCompletaGastos, JSON.stringify(gastos));
      return res
        .status(200)
        .json({ status: "ok", mensaje: "Gasto modificado" });
    } else {
      console.log(`No se encontró un elemento con el ID ${idBuscado}`);
      return res.status(200).json({
        status: "ok",
        mensaje: `No se encontró un elemento con el ID ${idBuscado}`,
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

/* DELETE => ELIMINAR */
const deleteGastos = async (req, res) => {
  try {
    const idBorrar = req.query.id;
    let gastos = req.gastos;

    // Obtener el monto del gasto a eliminar
    const gastoEliminado = gastos.gastos.find((gasto) => gasto.id === idBorrar);
    const montoEliminado = gastoEliminado ? gastoEliminado.monto : 0;

    // Restar el monto eliminado del total acumulado
    gastos.totalAcumulado -= montoEliminado;

    // Filtrar la lista de gastos para eliminar el objeto con el ID proporcionado
    const newLista = gastos.gastos.filter((objeto) => objeto.id !== idBorrar);

    // Mantener el resto de la estructura del objeto de gastos intacta
    gastos.gastos = newLista;

    console.log("Gastos actualizados:", gastos);

    if (newLista.length === 0) {
      // Si la nueva lista está vacía después de eliminar el objeto, borra el archivo
      fs.unlinkSync(rutaCompletaGastos); // Borra el archivo
    } else {
      // Si la nueva lista no está vacía, escribe la lista actualizada en el archivo
      fs.writeFileSync(rutaCompletaGastos, JSON.stringify(gastos));
    }
    return res
      .status(200)
      .json({ status: "ok", mensaje: "Gasto borrado correctamente" });
  } catch (error) {
    return res.status(400).json({ status: "error", mensaje: error.message });
  }
};

module.exports = {
  getGastos,
  postGastos,
  editGastos,
  deleteGastos,
};
