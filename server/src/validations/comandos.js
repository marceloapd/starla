function verificarValidacao(message, callback){
    comando = validarComando(getComandoByTipo(message))
    if (comando.status == "invalido"){
        return callback(comando)
    }
    else if(comando.status == "talvez"){
        return callback(comando)
    }
    callback(null, comando.comandoCompleto)
}

function getComandoByTipo(message){
    tipos = ['caption', 'reply']
    for(index in tipos){
        if(message[tipos[index]]){
            return message[tipos[index]]
        }
    }
    return message.body
}
 
function validarComando(comandoRecebido){
    let comandoPrimario = comandoRecebido.split(" ")[0].toLowerCase()
    let comandos = getComandos()
    comandos.forEach((item, index, array)=>{
        array[index] = item.comando 
    })
    let response = {}
    for(index in comandos){
        if (comandoPrimario.startsWith(comandos[index].substring(0, 4))){
            [response['message'], response['status']] = [comandos[index], "talvez"]
            if(comandoPrimario == comandos[index]){
                [response['status'], response['comandoCompleto']] = ["valido", comandoRecebido]
                return response
            }
            return response
        }
    }
    response['status'] = 'invalido'
    return response
}

function getComandos(){
    const fs = require('fs')
    return  JSON.parse(fs.readFileSync("./helpers/comandos.json"))
}

module.exports = {verificarValidacao}