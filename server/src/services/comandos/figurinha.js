const inscrever = require("../../controllers/comandos").inscrever
const gify = require('gify')
const fs = require('fs')
const loggerTerminal = require('../../helpers/logger')

const { execFile } = require('child_process');
const gifsicle = require('gifsicle');

var sizeOf = require('image-size');

let tipos_permitidos = [
    'image',
    'video'
]

async function run(comando, message, client){
    if(tipos_permitidos.includes(message.type)){
        await enviarFigurinha(message, client)
        return
    }
}

async function enviarFigurinha(message, client){
    if(message.duration > 7 || message.duration < 0){
        throw({'message': `${message.sender.pushname}, eu só consigo criar figurinhas de videos com menos de 8 segundos! 😝`, 'status': 'outros'})
    }
    const base64 = await client.downloadMedia(message)
    if(message.quotedMsg){
        if(message.quotedMsg.type === 'image'){
            await enviarFigurinhaPorReply(client, message, base64)
        }
    }else if(message.type == 'video'){
        client.reply(message.from, `${message.sender.pushname} espera um pouquinho posso demorar para criar essa figurinha.`, message.id)
        await enviarFigurinhaAnimada(client, message, base64)
    }
    else{
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
    await converterBase64(base64, "copy.mp4")
    let opts = {
            height: 300,
            rate: 10
    }
    gify('./assets/images/copy.mp4', './assets/images/copy.gif', opts, async function(err){
        if (err){
            console.log(err)
            throw ({'message': 'Foi mal, algo de errado aconteceu!'})
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
        let texto =`Aqui está sua Figurinha, ${message.sender.pushname}.Não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: assisserverdev@gmail.com`
        client.sendImageAsStickerGif(message.from, './assets/emojis/pixEmoji.gif')
        client.reply(message.from, texto, message.id)
    }
}

inscrever("#figurinha", run)
