let observadores = {}

/**
 * Executa o comando correto de acordo com o comando passado como parametro
 * @param {string} comando comando que será usado para chamar a função correta 
 * @param {object} message objeto da menssagem do cliente
 * @param {object} client cliente venom
 */
async function chamarComando(comando, message, client){
    let comandoFormatado = comando.split(" ")[0].toLowerCase()
    await observadores[comandoFormatado](comando.toLowerCase(), message, client) 
}


/**
 * Inscreve uma função em observadores que ficará disponível para uso
 * @param {string} nomeComando nome que será usado para ativar a função
 * @param {function} func funcao que será usada quando o comando for acionado
 */
function inscrever(nomeComando, func){
    observadores[nomeComando] = func
}

module.exports = {
    chamarComando: chamarComando,
    inscrever,
}
