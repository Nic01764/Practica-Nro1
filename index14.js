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

function obtenerDatosCallback(callback) {
    obtenerDatosPromesa()
        .then(resultado => callback(null, resultado)) 
        .catch(error => callback(error, null));      
}

obtenerDatosCallback((error, resultado) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Resultado:", resultado);
    }
});