const openia = require('./openia')

async function generateSticker(client, message){
    const buffer = await client.decryptFile(message)
    const base64String = buffer.toString('base64');
    if (message.type == 'video'){
        await client.sendImageAsStickerGif(message.from, base64String)
    }else{
        await client.sendImageAsSticker(message.from, base64String)
    }
}

module.exports = {      
    async send(client, message){
        if (message.isGroupMsg == true && message.text == "#figurinha"){
            await generateSticker(client, message)
        }else if (message.isGroupMsg == false){
            await generateSticker(client, message)
        }
    },

    async dalleSticker(client, message){
        const imgDescription = message.text.substring(message.text.indexOf(" "));
        const imgUrl = await openia.getDalleResponse(imgDescription + " whatsapp sticker", message)
        await client.sendImageAsSticker(message.from, imgUrl)
    },

    async dalleImage(client, message){
        const imgDescription = message.text.substring(message.text.indexOf(" "));
        const imgUrl = await openia.getDalleResponse(imgDescription, message)
        await client.sendImage(message.from, imgUrl)
    }

}