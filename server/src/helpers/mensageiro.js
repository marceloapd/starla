/**
 * Retorna uma mensagem de erro para o cliente
 * @param {object} message objeto da mensagem de um cliente
 * @param {object} client objeto client venom
 * @param {object} erro objeto de erro com as mensagens necessarias 
 */
function enviarMensagemError(message, client, erro){
    let texto;
    if (erro.status == "talvez"){
        texto = `Acredito que você quis dizer ${erro.message} 😄, lembre-se que se tiver em duvida sobre algum comando digite #comandos`
    } else {
        texto = `😭 Desculpa, ${message.sender.pushname}, ainda não sou capaz de entender tudo oque voce diz!`
    }
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

module.exports = {
    enviarMensagemError,
    enviarMensagem
}