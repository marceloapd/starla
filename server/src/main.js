require('./databases/config')

const venom = require('venom-bot')

const chamarComando = require("./controllers/comandos").chamarComando
const verificarValidacao = require("./validations/comandos").verificarValidacao
const isComando = require("./validations/verificarHastTag").isComando
const mensageiro = require("./helpers/mensageiro")
const serviceUsuario = require('./services/usuario')

require("./incializador.js")


venom.create()
    .then(function (client) {
        // cron.schedule("0 8 * * *",()=>{
        //     taksCron.horoscopoDiario(client)
        // })
        start(client)
    })
    .catch(function (err) {
        console.error("Tivemos um erro: ", err)
    })
    

/**
 * Gerencia as validações e as execuções dos comandos
 * @param {object} client Objeto client Venom 
 */
async function start(client) {
    client.onMessage(async function(message) {
        try{
            await serviceUsuario.salvarUsuarioGrupo(message)
            if(message.isGroupMsg == true && !isComando(message)){
                return
            }
            let resultado = verificarValidacao(message)
            await chamarComando(resultado.message, message, client)
        } catch(error){
            mensageiro.enviarMensagemError(message, client, error)
        }
    }) 
}

