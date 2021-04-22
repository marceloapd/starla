const venom = require('venom-bot')
const chamarComando = require("./controllers/comandos").chamarComando
const verificarValidacao = require("./validations/comandos").verificarValidacao
const mensageiro = require("./helpers/mensageiro")
require("./incializador.js")

//Instancia do whatsapp
venom.create()
    .then(function (client) {
        start(client)
    })
    .catch(function (err) {
        console.error("Tivemos um erro: ", err)
    })
    
    //Função que inicia o bot
    async function start(client) {
        client.onMessage(function (message) {
                verificarValidacao(message, (erro, comandoValido) => {
                    try{
                        if (erro){
                            return mensageiro.enviarMensagemError(message, client, erro)
                        }
                        chamarComando(comandoValido, message, client)
                    }catch(e){
                        mensageiro.enviarMensagem(message, client, e.message)
                    }
                }) 
         })
}

