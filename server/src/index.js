const venom = require('venom-bot')
const instructions = require("./controllers/instructions")
const figurinha = require("./controllers/figurinha")
const sinesp = require("./controllers/sinesp")
const comando = require("./validations/comandos")

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
            const body =  (message.body) ? true : false
            //envia todos os comandos par o client
            if(message.body === "@556184047039" || message.body.toLowerCase() === "#comandos" && message.isGroupMsg === true){
                instructions.enviarComandosGroup(client, message)
                
            }

            else if (message.type === 'chat' && message.isGroupMsg === false){
                instructions.enviarComandosChat(client, message)
            }
            //envia a placa do veículo

            else if (body) {
            if (message.body.toLowerCase().startsWith("#pl") && message.isGroupMsg === true){
                
                if (comando.validacao(message,client, "#placa")){
                    sinesp.enviarPlaca(client, message)
                }

            }
        }

            //envia uma figurinha quando a imagem tem uma legenda
            else if (caption) {
                if (message.caption.startsWith("#figurinha") || message.caption.startsWith("#FIGURINHA") && message.isGroupMsg === true) {
                    figurinha.enviarFigurinha(client, message)
                }
            }
            //envia figurinha para uma imagem que foi marcada em um reply
            else if (replyMessage) {
                if (message.body.startsWith("#figurinha") || message.caption.startsWith("#FIGURINHA")) {
                    figurinha.responderFigurinha(client, message)
                   
                }

            }
            
            else if (message.isMedia === true && message.isGroupMsg === false){
                    figurinha.enviarFigurinha(client, message)
                }
                

        }
        catch (error) {
            console.error("Tivemos um erro: ", error)
        }
    })
}