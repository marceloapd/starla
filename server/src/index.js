const venom = require('venom-bot')
const instructions = require("./controllers/instructions")
const figurinha = require("./controllers/figurinha")
const sinesp = require("./controllers/sinesp")
const comando = require("./validations/comandos")
const regex = require('./validations/placas')
var ffmpeg = require('ffmpeg');


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
            const caption = (message.caption) ? true : false
            const replyMessage = (message.quotedMsgObj) ? true : false
            const body =  (message.body) ? true : false
            
            //envia todos os comandos par o client
            if(message.body === "@556184047039" || message.body.toLowerCase() === "#comandos" && message.isGroupMsg === true){
                console.log(`[${message.sender.id}] Enviado lista de comandos`)
                instructions.enviarComandosGroup(client, message)
            }

            else if(message.body.match(regex.validacao.placa3) && message.type === 'chat' &&message.isGroupMsg === false){
                placa = message.body
                sinesp.enviarPlacaChat(client, message, placa)
            }

            else if(message.body.match(regex.validacao.placa2) && message.type === 'chat' &&message.isGroupMsg === false){
                placa = message.body
                sinesp.enviarPlacaChat(client, message, placa)
            }

            else if(message.body.match(regex.validacao.placa1) && message.type === 'chat' &&message.isGroupMsg === false){
                placa = message.body
                sinesp.enviarPlacaChat(client, message, placa)
            }

            //mostra os comando no privado ao receber uma mensagem
            else if (message.type === 'chat' && message.isGroupMsg === false){
                instructions.enviarComandosChat(client, message)
            }

            //envia a placa do veículo no grupo
            else if(message.body.toLowerCase().startsWith("#pl") && message.isGroupMsg === true){
                if(comando.validacao(client,message,"#placa")){
                    console.log(`[${message.sender.id}] Informando Placa`)
                    sinesp.enviarPlaca(client, message)
                }
            }
            
            //envia uma figurinha no grupo quando a imagem tem uma legenda
            else if (caption) {
                if (message.caption.toLowerCase().startsWith("#fig")) {
                    if(comando.validacaoCaption(client,message,"#figurinha")){
                        figurinha.enviarFigurinha(client, message)
                    }
                    
                }
            }
           
            //envia figurinha no grupo para uma imagem que foi marcada em um reply
            else if (replyMessage) {
                if (message.body.toLowerCase().startsWith("#figurinha")) {
                    figurinha.responderFigurinha(client, message)
                    
                }
            }


            envia figurinha sem legenda no chat privado
            else if (message.isMedia === true && message.isGroupMsg === false){
                figurinha.enviarFigurinha(client, message)
                
            }

            
        }
        catch (error) {
            console.error("Tivemos um erro: ", error)
        }
    })
}