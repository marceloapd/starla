let observadores = {}

function chamarComando(comando, message, client){
    let comandoFormatado = comando.split(" ")[0].toLowerCase()
    observadores[comandoFormatado](comando.toLowerCase(), message, client) 
}

function inscrever(nomeComando, func){
    observadores[nomeComando] = func
}

function deletar(func){
    
}

module.exports = {
    chamarComando: chamarComando,
    inscrever,
    deletar
}
