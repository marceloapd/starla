let todosComandos = require("../utils/todosComandos").todosComando 

let tipos = ["image"] 

//valida o comando recebido do main
function validar(message, client){
    if(message.isGroupMsg === false){
       return validacaoPrivado(message)
    }         
    else{
        validacaoGrupo()
    }
}

//faz a validacao do privado
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

//faz a validação do grupo
function validacaoGrupo(message){
    console.log("Comando inválido")
    return false
}

//valida os regex
function validarRegex(message){
    
}

//valida se o tipo do conteudo da message tem um tipo válido
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