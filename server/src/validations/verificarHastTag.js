let tipos_permitidos = [
    'caption',
    'body',
    'reply'
]

function isComando(message){
    for (index in tipos_permitidos){
        if(message[tipos_permitidos[index]] && message[tipos_permitidos[index]].startsWith("#")){
            return true
        }
    }
    return false
}
module.exports = {isComando}