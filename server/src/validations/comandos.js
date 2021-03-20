function validacaoCaption(client, message, comandos){
    
    if (message.caption.split(" ")[0].toLowerCase() != comandos){
        client.reply(message.from,"Acredito que você quis dizer "+comandos+" 😄 , _lembre-se que se tiver em duvida sobre algum comando digite #comandos_", message.id)
        return false
    }else{
        return true
    }
}

function validacao(client, message, comandos){
    
    if (message.body.toLowerCase().split(" ")[0].toLowerCase() != comandos){
        client.reply(message.from,"Acredito que você quis dizer "+comandos+" 😄 , _lembre-se que se tiver em duvida sobre algum comando digite #comandos_", message.id)
        return false
    }else{
        return true
    }
}



module.exports = {
    validacao: validacao,
    validacaoCaption: validacaoCaption
}