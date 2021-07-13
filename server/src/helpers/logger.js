function mensagemLog(message, texto){
    console.log(`[${message.sender.id} ${message.sender.pushname || 'sem nome'}] ${texto}`)
}

function mensagemLogError(message, texto){
    console.log('\x1b[41m ERROR \x1b[0m', `[${message.sender.id} ${message.sender.pushname || 'sem nome'}] ${texto}`)
}
module.exports = {mensagemLog, mensagemLogError}