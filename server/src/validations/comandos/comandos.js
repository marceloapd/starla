let todosComandos = require("../utils/todosComandos").todosComando

let tipos = ["image"]

function validar(message, client){
    if(message.isGroupMsg === false){
       return validacaoPrivado(message)
    }         
    else{
        validacaoGrupo()
    }
}

function validacaoPrivado(message){
    if(message.type === "chat"){
        console.log("Comando inválido, ainda.")
        return false
        validarRegex()
    }
    else{
        return validarTipo(message.type)
    }
}

function validacaoGrupo(message){
    console.log("Comando inválido")
    return false
}

function validarRegex(message){
    
}

function validarTipo(message){
    if (tipos.includes(message)){
        return todosComandos.filter(function(item){
            if (message === item.privado.tipo){
                console.log("item encontrado")
                return item.comando
            }
        })[0].comando
    }
    else{
        return false
    }
}

module.exports = {validar}