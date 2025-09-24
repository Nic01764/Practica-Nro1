function obtenerDatos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Datos obtenidos");
    }, 1000);
  });
}

function procesarDatos(datos) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${datos} -> Datos procesados`); 
    }, 1000);
  });
}

obtenerDatos()
  .then((resultado1) => {
    console.log(resultado1); 
    return procesarDatos(resultado1); 
  })
  .then((resultado2) => {
    console.log(resultado2); 
    return "Proceso finalizado";
  })
  .then((mensajeFinal) => {
    console.log(mensajeFinal); 
  })
  .catch((error) => {
    console.error("Ocurrió un error:", error);
  });