const inscrever = require("../../controllers/comandos").inscrever


async function chatComandos(comando, message, client){
    let comandos = getComandos()
    let boasVindas = `Ola ${message.sender.pushname} me chamo Starla sou um robo 🤖 desenvolvido para executar algumas funçoes como:\n`
    let pix = `\n\n${message.sender.pushname} se puder me ajude a permanecer viva ☺️ apoiando meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com`
    
    if(message.isGroupMsg == true){
        for(index in comandos){
            if(comandos[index]['descricao'] != undefined){
                boasVindas += comandos[index]['descricao']
            }
        }
        client.sendText(message.from, boasVindas + pix)
    }else{
        for(index in comandos){
            if(comandos[index]['descricaoPrivado'] != undefined){
                boasVindas += comandos[index]['descricao']
            }
        }
        client.sendText(message.from, boasVindas + pix)
    }
}

async function comandos(comando, message, client){
    if(message.isGroupMsg == true){
        client.sendText(message.from, "Ola " + message.sender.pushname + " Olá me chamo Starla sou um robo 🤖 desenvolvido para executar algumas funçoes como:\n\n➤ *#figurinha* mencione uma foto que alguem do grupo enviou utilizando esse comando ou me mande uma foto com esse comando de legenda que irei criar uma figurinha, tambem consigo criar figurinhas animadas com videos ou gifs\n➤ *#horoscopo* para consultar seu horoscopo digite esse comando seguido de seu signo.\n(exemplo: #horoscopo escorpiao)\n\n"+ message.sender.pushname +"se puder me ajude a permanecer viva ☺️ apoiando meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
    }
}

function getComandos(){
    const fs = require('fs')
    return  JSON.parse(fs.readFileSync("./helpers/comandos.json"))
}


inscrever("#comandos", chatComandos)
inscrever("@556184047039", comandos)
