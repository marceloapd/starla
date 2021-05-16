const inscrever = require("../../controllers/comandos").inscrever
const gify = require('gify')

const { execFile } = require('child_process');
const gifsicle = require('gifsicle');

var sizeOf = require('image-size');

let tipos_permitidos = [
    'image',
    'video'
]

async function run(comando, message, client){

    try {
        if(tipos_permitidos.includes(message.type)){
            figurinha(message, client)
            return
        }
        client.reply(message.from, "Eu não sei lidar com este tipo de arquivo!", message.id)
        return 
    } catch (e) {
        console.log("Error ao criar figurinha: ", e)
    }
}

async function figurinha(message, client){
    try{
        if(message.quotedMsg){
            if(message.quotedMsg.type === 'image'){
                replySendImageSticker(client,message)
            }
        }else if(message.type == 'video'){
            const base = await client.downloadMedia(message)
            await converterBase64(base, "copy.mp4")
            var opts = {
                height: 300,
                rate: 10
              };
            gify('./assets/images/copy.mp4', './assets/images/copy.gif',opts,function(err){
                if (err) throw err;
                var dimensions = sizeOf('./assets/images/copy.gif')
                let crop = (dimensions.width - dimensions.height) / 2
                if(dimensions.width < dimensions.height){
                    execFile(gifsicle, ['--crop', `0,${parseInt(crop*-1)}+${dimensions.width}x${dimensions.width}`, '-o', './assets/images/resize.gif', './assets/images/copy.gif'], err => {
                        client.sendImageAsStickerGif(message.from, "./assets/images/resize.gif")
                        console.log(`[${message.sender.id}] Figurinha criada`)
                        client.sendImageAsStickerGif(message.from, './assets/emojis/pixEmoji.gif')
                        enviarResposta("Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com", client, message)
                    });
                }else{
                    execFile(gifsicle, ['--crop', `${parseInt(crop)},0+${dimensions.height}x${dimensions.height}`, '-o', './assets/images/resize.gif', './assets/images/copy.gif'], err => {
                        client.sendImageAsStickerGif(message.from, "./assets/images/resize.gif")
                        console.log(`[${message.sender.id}] Figurinha criada`)
                        client.sendImageAsStickerGif(message.from, './assets/emojis/pixEmoji.gif')
                        enviarResposta("Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com", client, message)
                      });
                }
            })
        }
        else{
            const base = await client.downloadMedia(message)
            await converterBase64(base, "copy.png")
            await client.sendImageAsSticker(message.from, "./assets/images/copy.png")
            console.log(`[${message.sender.id}] Figurinha criada`)
            client.sendImageAsStickerGif(message.from, './assets/emojis/pixEmoji.gif')
            enviarResposta("Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com", client, message)
        }
    }catch(e){
        console.log("Error ao criar figurinha: ", e)
    }
}

async function replySendImageSticker (client, message) {
    try {
        const base = await client.downloadMedia(message.quotedMsgObj.id)
        converterBase64(base, "copy.png")
        await client.sendImageAsSticker(message.from, "./assets/images/copy.png")
        console.log(`[${message.sender.id}] Figurinha criada por reply`)
        client.sendImageAsStickerGif(message.from, './assets/emojis/pixEmoji.gif')
        enviarResposta("Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com", client, message)

    } catch (e) {
        console.log("Error:", e)
    }
}

async function converterBase64(base, file_name) {
    let formated_base = base.split(",")[1]
    const fs = require('fs')
    fs.writeFileSync(`./assets/images/${file_name}`, formated_base, { encoding: 'base64' })
}

async function enviarResposta   (text, client, message) {
    try {
        await client.reply(message.from, `${text}`, message.id)
    } catch (e) {
        console.log(e)
    }
}

inscrever("#figurinha", run)
