const sendImageSticker = async (client, message) =>{
    try {
        const base = await client.downloadMedia(message)
        await base64Converter(base, "copy.png")
        await client.sendImageAsSticker(message.from, "./assets/images/copy.png")
        sendResponse("Aqui está sua Figurinha " + message.sender.pushname, client, message)
        console.log(`[${message.sender.id}] Figurinha criada`)

    } catch (e) {
        console.log("Error: ", e)
        // messageError(e, message, client)
    }
}

const replySendImageSticker = async function (client, message) {
    try {
        const base = await client.downloadMedia(message.quotedMsgObj.id)
        base64Converter(base, "copy.png")
        sendResponse("Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com", client, message)
        await client.sendImageAsSticker(message.from, "./assets/images/copy.png")
        console.log(`[${message.sender.id}] Figurinha criada por reply`)

    } catch (e) {
        console.log("Error:", e)
    }
}


const base64Converter =async function (base, file_name) {
    let formated_base = base.split(",")[1]
    const fs = require('fs')
    await fs.writeFileSync(`./assets/images/${file_name}`, formated_base, { encoding: 'base64' })
}

const sendResponse = async function (text, client, message) {
    try {
        await client.reply(message.from, `${text}`, message.id)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    enviarFigurinha: sendImageSticker,
    responderFigurinha: replySendImageSticker,
}