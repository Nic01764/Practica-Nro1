
function obtenerDatosPromesa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = true; 
            if (exito) {
                resolve("Datos obtenidos desde la promesa");
            } else {
                reject("Ocurrió un error en la promesa");
            }
        }, 1000);
    });
}

obtenerDatosPromesa()
    .then(resultado => console.log("Resultado con promesas:", resultado))
    .catch(error => console.error("Error con promesas:", error));


async function obtenerDatosAsync() {
    try {
        const resultado = await obtenerDatosPromesa(); 
        console.log("Resultado con async/await:", resultado);
    } catch (error) {
        console.error("Error con async/await:", error);
    }
}

obtenerDatosAsync();