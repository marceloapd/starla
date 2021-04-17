const venom = require('venom-bot')
const chamarComando = require("./controllers/comandos").chamarComando
require("./services")

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
        chamarComando(message.caption || message.body ,message, client)
    })
}

