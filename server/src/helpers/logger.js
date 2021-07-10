function mensagemLog(message, texto){
    console.log('\x1b[42m',`[${message.sender.id} ${message.sender.pushname}] ${texto}`)
}

function mensagemLogError(message, texto){
    console.log('\x1b[41m', `[${message.sender.id} ${message.sender.pushname}] ${texto}`)
}
module.exports = {mensagemLog, mensagemLogError}