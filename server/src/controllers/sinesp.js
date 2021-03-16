const sinespApi = require('sinesp-api');

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
                .sendText(message.from, "Aqui está os dados da placa informada") // message.from se refere a quem enviou a mensagem
            for (keys in response) {
                dados += `*➤ ${keys}*: ${response[keys]}\n`

            }
            client.sendText(message.from, dados)
        })
}


module.exports = {
    enviarPlaca: enviarDados
}