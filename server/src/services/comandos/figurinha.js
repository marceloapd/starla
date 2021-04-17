const inscrever = require("../../controllers/comandos").inscrever

async function run(comando, message, client){
    try {
        figurinha(message, client)
    } catch (e) {
        console.log("Error ao criar figurinha: ", e)
    }
}

async function figurinha(message, client){
    if(message.quotedMsg.type === 'image'){
        replySendImageSticker(client,message)
    }else{
        const base = await client.downloadMedia(message)
        await converterBase64(base, "copy.png")
        await client.sendImageAsSticker(message.from, "./assets/images/copy.png")
        console.log(`[${message.sender.id}] Figurinha criada`)
        client.sendImageAsStickerGif(message.from, './assets/emojis/pixEmoji.gif')
        enviarResposta("Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com", client, message)
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

const converterBase64 =async function (base, file_name) {
    let formated_base = base.split(",")[1]
    const fs = require('fs')
    await fs.writeFileSync(`./assets/images/${file_name}`, formated_base, { encoding: 'base64' })
}

const enviarResposta = async function (text, client, message) {
    try {
        await client.reply(message.from, `${text}`, message.id)
    } catch (e) {
        console.log(e)
    }
}

inscrever("#figurinha", run)
