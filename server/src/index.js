const venom = require('venom-bot')
const instructions = require("./controllers/instructions")
const figurinha = require("./controllers/figurinha")
const sinesp = require("./controllers/sinesp")
const location = require("./controllers/god's_eye")

//instancia do whatsapp
venom.create()
    .then(function (client) {
        start(client)
    })
    .catch(function (err) {
        console.error("Tivemos um erro: ", err)
    })

//função que incia o bot
async function start(client) {
    client.onMessage(function (message) {
        try {
            // console.log(message)
            const caption = (message.caption) ? true : false
            const replyMessage = (message.quotedMsgObj) ? true : false

            //envia todos os comandos par o client
            if(message.body === "#comandos"){
                instructions.enviarComandos(client, message)
            }
            //envia a placa do veículo
            else if(message.body.startsWith("#placa")){
                sinesp.enviarPlaca(client, message)
            }

            //envia uma figurinha quando a imagem tem uma legenda
            else if (caption) {
                if (message.caption.startsWith("#figurinha")) {
                    figurinha.enviarFigurinha(client, message)
                }
            }
            //envia figurinha para uma imagem que foi marcada em um reply
            else if (replyMessage) {
                if (message.body.startsWith("#figurinha")) {
                    figurinha.responderFigurinha(client, message)
                }

            else if (replyMessage) {
                if (message.body.startsWith("#location")) {

                }
            }

            }
        }
        catch (error) {
            console.error("Tivemos um erro: ", error)
        }
    })
}