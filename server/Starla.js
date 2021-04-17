const { type } = require('os');
const venom = require('venom-bot'); //Import da lib
const { measureMemory } = require('vm');
const { cli } = require('winston/lib/winston/config');

function initStarla(){

}

venom
  .create() //função start
  .then((client) => start(client)) // verifica se as funçoes foram executadas
  .catch((erro) => { // se de erro
    console.log(erro); //imprime erro
  }); 
  
function start(client) { 
  client.onMessage((message) => {
      const pngsticker = message.body.startsWith("#figurinha")
      const gifsticker = message.body.startsWith("#animado")
      const sinesplaca = message.body.startsWith("#placa")
      const mention = message.body.startsWith("#mention")
      // const texto = message.body.startsWith("#texto")
    if (message.body === '#comandos') {
      console.log(message)
      client
        .sendText(message.from, "Ola " + message.sender.pushname + " me chamo Starla, sou um robo desenvolvido para executar algumas funçoes como:\n\n➤ *#comandos* (mostra todos os meus comando)\n➤ *#figurinha* (me envie uma foto com essa legenda que irei criar uma figurinha para você)\n➤ *#animado* (me envie um link gif com esse comando que irei te retornar uma figurinha animada)\n➤ *#placa* (me envie uma placa de carro que deseja consultar com esse comando que irei te retornar oque sei sobre esse veiculo)") // message.from se refere a quem enviou a mensagem
        .then((result) => {
         
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }else if (pngsticker){
        sticker(client,message)
        client.sendText(message.from, "Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
    }else if (gifsticker){
        gifSticker(client,message)
        client.sendText(message.from, "Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
    }
    else if (message.type === 'image' && message.caption === '#figurinha'){
        client.downloadMedia(message).then(function(response){
            convert(client, message,response)
            client.sendText(message.from, "Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
        })
        .catch(function (erro){
            console.log(erro)
        })
    
    

    }

    else if (mention){
      console.log(message)
      if (message.quotedMsg.type === 'image'){  
        men ='false_' + message.from + "_" + message.quotedStanzaID 
        console.log(men)
        client.downloadMedia(men).then(function(response){
            convert(client, message,response)
            client.sendText(message.from, "Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
        })
        .catch(function (erro){
            console.log(erro)
        })
      }
  
    // }else if (texto){
    //     let t = message.body.split(" ").slice(1).join(" ")
    //     var fs = require('fs');
    //     var text2png = require('text2png');
    //     fs.writeFileSync('out.png', text2png(t,{color: 'blue', padding: 140}));
    //     client.sendImageAsSticker(message.from, 'out.png')
      }
    else if (message.type === 'video' && message.caption === '#figurinha'){
        client.downloadMedia(message).then(function(response){
            convertgif(client, message,response)
            client.sendText(message.from, "Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
        })
        .catch(function (erro){
            console.log(erro)
        })

    }else if (sinesplaca){
      let placa = message.body.split(" ")[1]
      let dados = ``
      sinesp(placa).then(function (response){
        client.sendText(message.from, "Aqui está os dados da placa informada " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
        for (keys in response){
          dados += `*➤ ${keys}*: ${response[keys]}\n`
        
        }
        client.sendText(message.from, dados)
    })
 
      
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });

  }else if (message.type === 'video' && message.caption === '#animado'){
    console.log(message)
    client.downloadMedia(message).then(function(response){
        convertgif(client, message,response)
        client.sendText(message.from, "Aqui está sua Figurinha " + message.sender.pushname + ", não se esqueça de apoiar o meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com")
    })
    .catch(function (erro){
        console.log(erro)
    })



}

    
    
    else{
      console.log(message)
    }
  });
}


function sticker(client, message){
    let link = message.body.split(" ")[1]
    client.sendImageAsSticker(message.from, link)
    .then((result) => {
    })
    
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    
}

function gifSticker(client, message){
    let link = message.body.split(" ")[1]
    client.sendImageAsStickerGif(message.from, link)
    .then((result) => {
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}

function convert(client, message,response){
    const fs = require("fs")
    const base = response.split(",")[1]
    fs.writeFileSync('image.png',base, {encoding:'base64'})
    client.sendImageAsSticker(message.from, './image.png').then(function (response){

    })
    .catch(function(erro){
        console.log(erro)
    })
}

function convertgif(client, message,response){
    const fs = require("fs")
    // client.sendVideoAsGif(client, response, 'filename', caption)
    const base = response.split(",")[1]
    fs.writeFileSync('image.mp4',base, {encoding:'base64'})
    client.sendImageAsStickerGif(message.from, 'image.gif').then(function (response){

    })
    .catch(function(erro){
        console.log(erro)
    })

  }

const sinesp = async function(placa){
  try{
        const sinespApi = require('sinesp-api');
        let vehicle = await sinespApi.search(placa);
        return vehicle
    }catch(e){
        console.log(e)
    }
}


initStarla()



