const loggerTerminal = require('./logger')

let codigosError = {
    'talvez': talvezError,
    'invalido': invalidoError,
    'outros': outrosError,
}

/**
 * Retorna uma mensagem de erro para o cliente
 * @param {object} message objeto da mensagem de um cliente
 * @param {object} client objeto client venom
 * @param {object} erro objeto de erro com as mensagens necessarias 
 */
function enviarMensagemError(message, client, error){
    if(!error.status){
        loggerTerminal.mensagemLogError(message, error.message)
        client.sendText(message.from, 'Desculpe, algo deu errado!')
    } else if(error.status === 'ignorar'){
        return
    } else {
        const status = error.status
        const texto = codigosError[status](error, message)
        client.sendText(message.from, texto)
    }

}

function talvezError(error, message=null){
    return  `Acredito que você quis dizer ${error.message} 😄, lembre-se que se tiver em duvida sobre algum comando digite #comandos`
}

function invalidoError(error=null, message){
    let texto = getTextoWithName(message, `Ainda não sou capaz de entender tudo oque voce diz! 😭` )
    return texto
}

function outrosError(error, message=null){
    return error.message
}

function getTextoWithName(message, texto){
    let nome = message.sender.pushname || ''
    if(nome){
        let primeiraLetra = texto.charAt(0).toLowerCase()
        texto = `${primeiraLetra}${texto.substring(1)}` 
        texto = `${nome}, ${texto}`
    }
    return texto
}

module.exports = {
    enviarMensagemError,
}