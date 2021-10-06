const inscrever = require("../controllers/comandos").inscrever
const gify = require('gify')
const fs = require('fs')
const loggerTerminal = require('../helpers/logger')

const { execFile } = require('child_process');
const gifsicle = require('gifsicle');

var sizeOf = require('image-size');

let tipos_permitidos = [
    'image',
    'video',
]

async function run(comando, message, client){
    if(tipos_permitidos.includes(message.type)){
        await enviarFigurinha(message, client)
        return
    }
    throw({'message': 'Acho que você esqueceu da imagem!', 'status': 'outros'})
}

async function enviarFigurinha(message, client){
   
    const base64 = await client.downloadMedia(message)
    //A função de client.downloadMedia do Venom não está funcionando com uma quoted msg
        // if(message.quotedMsg){
        //     if(message.quotedMsg.type === 'image'){
        //         await enviarFigurinhaPorReply(client, message, base64)
        //     }
        // }
    if(message.type == 'video'){
        if(message.isGif){
            await enviarFigurinhaAnimada(client, message, base64)
        }else{
            throw({'message': getTextoWithName(message, 'Me envie o video em formato de GIF!' ), 'status': 'outros'})
        }
    } else if(message.duration > 7 || message.duration < 0){
        throw({'message': getTextoWithName(message, 'Eu só consigo criar figurinhas de gifs com menos de 8 segundos! 😝'), 'status': 'outros'})
    } else{
        await enviarFigurinhaComum(client, message, base64)
    }
}

async function enviarFigurinhaComum(client, message, base64){
    await converterBase64(base64, "copy.png")
    await client.sendImageAsSticker(message.from, "./assets/images/copy.png")
    loggerTerminal.mensagemLog(message, 'Figurinha estatica criada')
    pedirPix(client, message)
}

async function enviarFigurinhaAnimada(client, message, base64){
    let texto = getTextoWithName(message, `Vai demorar um pouco pra criar a figurinha...`)
    client.sendText(message.from, texto)
    await converterBase64(base64, "copy.mp4")
    await converterMP4toGIF(client, message)
}

async function converterMP4toGIF(client, message){
    let options = {
        height: 300,
        rate: 10
    }
    gify('./assets/images/copy.mp4', './assets/images/copy.gif', options, async (err) => {
        if (err){
            console.log(err)
            throw({'status': null})
        }
        
        let dimensions = sizeOf('./assets/images/copy.gif')
        let crop = (dimensions.width - dimensions.height) / 2

        if(dimensions.width < dimensions.height){
            await redimensionarImagem(client, message, dimensions, crop, 'horizontal')
        }else{
            await redimensionarImagem(client, message, dimensions, crop)
        }

        loggerTerminal.mensagemLog(message, 'Figurinha animada criada')
    })
}

async function redimensionarImagem(client, message, dimensions, crop, position='vertical'){
    if(position === 'horizontal'){
        execFile(gifsicle, ['--crop', `0,${parseInt(crop*-1)}+${dimensions.width}x${dimensions.width}`, '-o', './assets/images/resize.gif', './assets/images/copy.gif'],
        async (err) => {
            await client.sendImageAsStickerGif(message.from, "./assets/images/resize.gif")
            pedirPix(client, message)
        })
    } else {
        execFile(gifsicle, ['--crop', `${parseInt(crop)},0+${dimensions.height}x${dimensions.height}`, '-o', './assets/images/resize.gif', './assets/images/copy.gif'],
        async (err) => {
            await client.sendImageAsStickerGif(message.from, "./assets/images/resize.gif")
            pedirPix(client, message)
        })
    }
}

async function enviarFigurinhaPorReply(client, message, base64) {
    await converterBase64(base64, "copy.png")
    await client.sendImageAsSticker(message.from, "./assets/images/copy.png")
    loggerTerminal.mensagemLog(message, 'Figurinha criada por reply')
    pedirPix(client, message)
}

async function converterBase64(base, file_name) {
    let formated_base = base.split(",")[1]
    fs.writeFileSync(`./assets/images/${file_name}`, formated_base, { encoding: 'base64' })
}

function pedirPix(client, message){
    let probabilidade = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
    if(probabilidade == 1){
        let texto = getTextoWithName(message, `Aqui está sua Figurinha. Não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: assisserverdev@gmail.com`)
        client.sendImageAsStickerGif(message.from, './assets/emojis/pixEmoji.gif')
        client.sendText(message.from, texto)
    }
}

function getTextoWithName(message, texto){
    let nome = message.sender.pushname || ''
    if(nome){
        let primeiraLetra = texto.charAt(0).toLowerCase()
        texto = `${primeiraLetra}${texto.substring(1)}` 
        texto = `${nome}, ${texto}`
    }
    return texto
}

inscrever("#figurinha", run)
