const venom = require('venom-bot')
const notificarTodos = require("./controllers/comandos").notificarTodos
const validacao = require("./validations/comandos/comandos")
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
        result = validacao.validar(message, client)
        if(result){
            notificarTodos(result, message, client)
        }
    })
}

