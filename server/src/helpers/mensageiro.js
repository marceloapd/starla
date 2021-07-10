
let codigosError = {
    'talvez': talvezError,
    'invalido': invalidoError,
    'outro': outroError
}

/**
 * Retorna uma mensagem de erro para o cliente
 * @param {object} message objeto da mensagem de um cliente
 * @param {object} client objeto client venom
 * @param {object} erro objeto de erro com as mensagens necessarias 
 */
function enviarMensagemError(message, client, error){
    status = error.status ? error.status : 'outro'
    texto = codigosError[status](error, message)
    client.reply(message.from, texto, message.id)
}

/**
 * 
 * @param {object} message objeto da mensagem de um cliente 
 * @param {object} client objeto client venom
 * @param {string} texto texto que será enviado
 */
function enviarMensagem(message, client, texto){
    client.reply(message.from, texto, message.id)
}

function talvezError(error, message=null){
    return  `Acredito que você quis dizer ${error.message} 😄, lembre-se que se tiver em duvida sobre algum comando digite #comandos`
}

function invalidoError(error=null, message){
    return `😭 Desculpa, ${message.sender.pushname}, ainda não sou capaz de entender tudo oque voce diz!`
}

function outroError(error, message=null){
    return error.message
}


module.exports = {
    enviarMensagemError,
    enviarMensagem
}