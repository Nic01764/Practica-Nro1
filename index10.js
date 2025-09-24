function obtenerDatos(callback) {
  console.log("Obteniendo los");
  setTimeout(() => {
    callback("Datos recibidos con callback");
  }, 2000);
}

obtenerDatos((resultado) => {
  console.log(resultado);
});

function obtenerDatos() {
  return new Promise((resolve, reject) => {
    console.log("Obteniendo datos");
    setTimeout(() => {
      resolve("Datos recibidos ");
    }, 2000);
  });
}

obtenerDatos()
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.log("Error:", error);
  });