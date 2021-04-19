let observadores = {}

function chamarComando(comando, message, client){
    let comandoFormatado = comando.split(" ")[0]
    observadores[comandoFormatado](comando, message, client) 
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
