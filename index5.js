function miFuntion(texto){
    let invertida ="";
    for(let i= texto.length -1; i>=0;i--){
        invertida+=texto[i];
    } 
    return texto === invertida;
}
let band = miFuntion("programa")
console.log(band);
band = miFuntion("ana");
console.log(band);