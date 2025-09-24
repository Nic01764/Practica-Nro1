function miFuntion(numeros){
    let resultado ={ pares:[],impares:[]};
    let iPar = 0, iImpar=0;

    for(let i=0; i<numeros.length ;i++){
        if(numeros[i]%2 === 0){
            resultado.pares[iPar]=numeros[i];
            iPar++;
        }else{
            resultado.impares[iImpar]=numeros[i];
            iImpar++;
        }
    }
    return resultado;
}
let obj = miFuntion([1,2,3,4,5,6,12,17,64]);
console.log(obj)