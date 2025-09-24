function paso1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Paso 1 completado");
      resolve("Resultado 1");
    }, 1000);
  });
}

function paso2(resultadoAnterior) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Paso 2 completado con:", resultadoAnterior);
      resolve("Resultado 2");
    }, 1000);
  });
}

function paso3(resultadoAnterior) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Paso 3 completado con:", resultadoAnterior);
      resolve("Resultado final");
    }, 1000);
  });
}

async function ejecutarPasos() {
  try {
    const resultado1 = await paso1();
    const resultado2 = await paso2(resultado1);
    const resultado3 = await paso3(resultado2);

    console.log("Proceso terminado con:", resultado3);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
}

ejecutarPasos();