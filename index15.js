function obtenerDatosCallback(callback) {
    setTimeout(() => {
        const exito = true; 
        if (exito) {
            callback(null, "Datos obtenidos desde el callback");
        } else {
            callback("Ocurrió un error en el callback", null);
        }
    }, 1000);
}

function obtenerDatosPromesa() {
    return new Promise((resolve, reject) => {
        obtenerDatosCallback((error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
}

clsobtenerDatosPromesa()
    .then(resultado => console.log("Resultado:", resultado))
    .catch(error => console.error("Error:", error));