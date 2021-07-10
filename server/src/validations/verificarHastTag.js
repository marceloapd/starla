let tipos_permitidos = [
    'caption',
    'body',
]

function isComando(message){
    let comandos = getComandos()
    for (index in tipos_permitidos){
        for(index_comando in comandos){
            let comando_start_with = comandos[index_comando]['comando'].substring(0,4)
            if(message[tipos_permitidos[index]] && message[tipos_permitidos[index]].toLowerCase().startsWith(comando_start_with)){
                return true
            }
        }
    }
    return false
}

function getComandos(){
    const fs = require('fs')
    return  JSON.parse(fs.readFileSync("./helpers/comandos.json"))
}
module.exports = {isComando}