function enviarMensagemError(message, client, erro){
    let texto;
    if (erro.status == "talvez"){
        texto = `Acredito que você quis dizer ${erro.message} 😄, lembre-se que se tiver em duvida sobre algum comando digite #comandos`
    }else if(erro.status == "privado"){
        texto = `Bom, ${message.sender.pushname | message.author}, eu não sei manipular este tipo de arquivo!`
    }else{
        texto = `😭 Desculpa, ${message.sender.pushname}, ainda não sou capaz de entender tudo oque voce diz, mas consigo fazer algumas coisas como`
    }
    client.reply(message.from, texto, message.id)
}

function enviarMensagem(message, client, texto){
    client.reply(message.from, texto, message.id)
}

module.exports = {
    enviarMensagemError,
    enviarMensagem
}