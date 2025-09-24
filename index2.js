function mifuntion(texto){
    let invertida ="";
    for (let i = texto.length -1; i>=0; i--){
        invertida += texto[i];
    }
    return invertida;
}
let inv = mifuntion("palabra");
console.log(inv);