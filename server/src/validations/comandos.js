function validacao(message, client, comandos){
    
    if (message.body.split(" ")[0] != comandos){

        client.reply(message.from,"Você quis dizer " + comandos, message.id)
        return false
    }else{
        return true
    }
}



module.exports = {
    validacao: validacao
}