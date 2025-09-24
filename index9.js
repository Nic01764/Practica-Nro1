const miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Éxito... se resolvió después de 3 segundos");
  }, 3000);
});

miPromesa.then((mensaje) => {
  console.log(mensaje); 
});