function mifuntion (texto){
    let vocales = { a:0, e:0, i:0, o:0 , u:0};

    for(let i=0;i< texto.length; i++){
        let letra = texto[i];
        if(letra === "a"|| letra === "e"|| letra === "i"|| letra === "o"|| letra === "u"){
         vocales[letra]++;   
        }
    }
    return vocales
}
let obj = mifuntion("informatica")
console.log(obj);