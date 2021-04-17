let observadores = {}

function chamarComando(comando, message, client){
    console.log(comando)
    let comando_formatado = comando.split(" ")
    observadores[comando_formatado](comando, message, client) 
    console.log(comando_formatado)
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
