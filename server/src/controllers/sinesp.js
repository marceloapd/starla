const sinespApi = require('sinesp-api');
const instructions = require("./instructions.js")

const pesquisarPlaca = async function (placa) {
    try {
        let vehicle = await sinespApi.search(placa);
        return vehicle
    } catch (e) {
        console.log(e)
    }

}
const enviarDados = function (client, message) {

    let placa = message.body.split(" ")[1]
    let dados = ``
    pesquisarPlaca(placa)
        .then(function (response) {
            client
                
            for (keys in response) {
                dados += `*➤ ${keys}*: ${response[keys]}\n`

            }
            client.sendText(message.from, "Aqui estão os dados da placa informada " + message.sender.pushname +"⤵️\n\n" + dados + "\n\n_" + instructions.nomeEmocao(message) + " se puder me ajude a permanecer viva ☺️ apoiando meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com_")
        })
        
    }

const enviarDadosChat = function (client, message, placa) {
    let dados = ``
    pesquisarPlaca(placa)
        .then(function (response) {
            client
                
            for (keys in response) {
                dados += `*➤ ${keys}*: ${response[keys]}\n`

            }
            client.sendText(message.from, "Aqui estão os dados da placa informada " + message.sender.pushname +"⤵️\n\n" + dados + "\n\n_" + instructions.nomeEmocao(message) + " se puder me ajude a permanecer viva ☺️ apoiando meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com_")
        })
        
    }

    


module.exports = {
    enviarPlaca: enviarDados,
    enviarPlacaChat: enviarDadosChat
}