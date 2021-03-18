  const gerarGroupComandos = (message) => {
    
    let groupComands = [
        {
          "comando": "➤ *#figurinha*",
          "descrição": "mencione uma foto que alguem do grupo enviou utilizando esse comando ou me mande uma foto com esse comando de legenda que irei criar uma figurinha.\n\n"
        },
        {
          "comando": "➤ *#placa*",
          "descrição": "me envie uma placa de carro que deseja consultar com esse comando que irei te retornar oque sei sobre esse veiculo.\n```(exemplo: #placa ovt1270)```"
        }
      ]
      
      let dados;
      dados = "Olá me chamo *Starla* sou um robo 🤖 desenvolvido para executar algumas funçoes como:\n\n"
      for (let i = 0; i < groupComands.length; i++) {
        dados += `${groupComands[i].comando} ${groupComands[i].descrição}\n`
      }
      return dados
    }
    
    const gerarChatComandos = (message) => {
  
    let chatComands = [
      {
        "comando": "➤ *Criar figurinhas -->*",
        "descrição": "me envie uma foto que irei criar uma figurinha para você"
      },
      {
        "comando": "➤ *Informação sobre veiculos -->*",
        "descrição": "me envie uma placa de carro que deseja consultar que irei te retornar oque sei sobre esse veiculo"
      }
    ]
    
    let dados;
    dados = "😭 Desculpa " + message.sender.pushname + " ainda não sou capaz de entender tudo oque voce diz, mas consigo fazer algumas coisas como:\n\n"
    for (let i = 0; i < chatComands.length; i++) {
      dados += `${chatComands[i].comando} ${chatComands[i].descrição}\n`
    }
  
    return dados
  }
  
  const chatComandos = (client, message) => {
    client
    .sendText(message.from, gerarChatComandos(message)+ "\n\n_" + nome_emocao(message) + " se puder me ajude a permanecer viva ☺️ apoiando meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com_") // message.from se refere a quem enviou a mensagem
    .then((result) => {
      
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
  }
  
  const groupComandos = (client, message) => {
    client
    .sendText(message.from, gerarGroupComandos(message)+ "\n\n_" + nome_emocao(message) + " se puder me ajude a permanecer viva ☺️ apoiando meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com_") // message.from se refere a quem enviou a mensagem
    .then((result) => {
      
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    
  }
  

  function nome_emocao(message){

    let primeiro_nome = message.sender.pushname.split(" ")[0]
    let ultima_letra = primeiro_nome.slice(-1)
    let nome_emocao = primeiro_nome + ultima_letra + ultima_letra

    return nome_emocao
  }
    
  module.exports = {

    enviarComandosGroup: chatComandos,
    enviarComandosChat: groupComandos,
    nomeEmocao: nome_emocao

  }