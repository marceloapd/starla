const service = require('../service');

module.exports = {
    async handler(client, message){
        try {
            await client.startTyping(message.from);
            if (message.type == 'image' || message.type == 'video') {
                await service.sticker.send(client, message)
            }
            else if (message.type == 'chat') {
                await service.openia.chatgpt(client, message)
            }
            await client.stopTyping(message.from);
        } catch (error) {
            client.sendText(message.from, "não consegui te atender")
            await client.stopTyping(message.from);
            
        }
    }
}