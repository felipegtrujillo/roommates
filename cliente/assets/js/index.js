let roommates = [];
let gastos = [];
let gastoEditing = null;

const getRoommates = async () => {
  const res = await fetch("http://localhost:3000/roommates/");
  const data = await res.json();
  roommates = data.roommates;
  console.log("roommates", roommates);
};

const getGastos = async () => {
  const res = await fetch("http://localhost:3000/gastos/");
  const data = await res.json();
  gastos = data.gastos;
  console.log("gastos", gastos);
};

const imprimir = async () => {
  try {
    await getRoommates();
    await getGastos();

    console.log("num Integrantes", roommates.numIntegrantes);
    console.log("gasto total acumulado", gastos.totalAcumulado);
    const gastosby = calcularGastosxIntegrante(
      roommates.numIntegrantes,
      gastos.totalAcumulado
    );
    const actualizados = actualizaGastos(gastosby);

    console.log("GASTOS by", gastosby);
    console.log("roommates actualizado", actualizados);

    $("#roommates").html("");
    $("#roommatesSelect").html("");
    $("#roommatesSelectModal").html("");
    roommates.roommates.forEach((r) => {
      $("#roommatesSelect").append(`
    <option value="${r.nombre}">${r.nombre}</option>
    `);
      $("#roommatesSelectModal").append(`
    <option value="${r.nombre}">${r.nombre}</option>
    `);
      $("#roommates").append(`
            <tr>
              <td>${r.nombre}</td>
              <td class="text-danger">${r.debe ? r.debe : "-"}</td>
              <td class="text-success">${r.recibe ? r.recibe : "-"}</td>
            </tr>
        `);
    });
    $("#gastosHistorial").html("");
    gastos.gastos.forEach((g) => {
      $("#gastosHistorial").append(`
          <tr>
            <td>${g.roommate}</td>
            <td>${g.descripcion}</td>
            <td>${g.monto}</td>
            <td class="d-flex align-items-center justify-content-between">
              <i class="fas fa-edit text-warning" onclick="editGasto('${g.id}')" data-toggle="modal" data-target="#exampleModal"></i>
              <i class="fas fa-trash-alt text-danger" onclick="deleteGasto('${g.id}')" ></i>
            </td>
          </tr>
        `);
    });
  } catch (e) {
    console.log(e);
  }
};

const nuevoRoommate = () => {
  fetch("http://localhost:3000/roommates/", { method: "POST" })
    .then(async (res) => await res.json())
    .then(() => {
      imprimir();
    });
};

const agregarGasto = async () => {
  const roommateSelected = $("#roommatesSelect").val();
  const descripcion = $("#descripcion").val();
  const monto = Number($("#monto").val());
  await fetch("http://localhost:3000/gastos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roommate: roommateSelected,
      descripcion: descripcion,
      monto: monto,
    }),
  });

  imprimir();
};

const deleteGasto = async (id) => {
  await fetch("http://localhost:3000/gastos/?id=" + id, {
    method: "DELETE",
  });
  imprimir();
};

const updateGasto = async () => {
  const roommateSelected = $("#roommatesSelectModal").val();
  const descripcion = $("#descripcionModal").val();
  const monto = Number($("#montoModal").val());
  await fetch("http://localhost:3000/gastos/?id=" + gastoEditing, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roommate: roommateSelected,
      descripcion: descripcion,
      monto: monto,
    }),
  });
  $("#exampleModal").modal("hide");
  imprimir();
};

const editGasto = (id) => {
  gastoEditing = id;
  const { roommate, descripcion, monto } = gastos.gastos.find(
    (g) => g.id == id
  );
  $("#roommatesSelectModal").val(roommate);
  $("#descripcionModal").html(descripcion);
  $("#montoModal").val(monto);
};

const calcularGastosxIntegrante = (numIntegrantes, totalGasto) => {
  let gastoUnitario = totalGasto / numIntegrantes;
  return gastoUnitario;
};

const actualizaGastos = (gastosby) => {
  /* por cada roommate ver si tiene gastos 
  3.1 están, los que tienen gastos > 0 , y los que tienen gastos = 0

-Los que tienen gastos = 0, su debe será el resultado del punto 2 ( return calcularGastosxIntegrantes) y su recibe = vacío
-Los que tienen gasto > 0, se debe restar el gasto realizado - el resultado del punto 2 ( returnCalcularGastosxIntegrantes).

 Crear un objeto para almacenar las coincidencias encontradas */
  roommates.roommates.forEach((roommate) => {
    roommate.debe = gastosby;
    roommate.recibe = 300;
    roommate.gastosRealizados = 0;

    gastos.gastos.forEach((gasto) => {
      if (gasto.roommate == roommate.nombre) {
        roommate.gastosRealizados += gasto.monto;
      }
    });

    if (roommate.gastosRealizados > gastosby) {
      roommate.recibe = roommate.gastosRealizados - gastosby;
      roommate.debe = 0;
    } else if (roommate.gastosRealizados < gastosby) {
      roommate.recibe = 0;
      roommate.debe = gastosby;
    } else {
      roommate.recibe = 0;
      roommate.debe = 0;
    }
  });

  return roommates;
};

imprimir();
