var allComands = [
  {
    "comando": "➤ *Criar figurinhas -->*",
    "descrição": "me envie uma foto que irei criar uma figurinha para você"
  },
  {
    "comando": "➤ *Informação sobre veiculos -->*",
    "descrição": "me envie uma placa de carro que deseja consultar que irei te retornar oque sei sobre esse veiculo"
  }
]

const gerarComandos = (message) => {
  
  let dados;
  dados = "😭 Desculpa " + message.sender.pushname + " ainda não sou capaz de entender tudo oque voce diz, mas consigo fazer algumas coisas como:\n\n"
  for (let i = 0; i < allComands.length; i++) {
    dados += `${allComands[i].comando} ${allComands[i].descrição}\n`
  }

  return dados
}


const comandos = (client, message) => {
  let nome_emocao = instructions_group.nome_emocao(message)
  client

    .sendText(message.from, gerarComandos(message) + "\n\n_" + nome_emocao + " se puder me ajude a permanecer viva ☺️ apoiando meu desenvolvimento doando qualquer valor no PIX EMAIL: marcelo.apdassis@gmail.com_") // message.from se refere a quem enviou a mensagem
    .then((result) => {

    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}


module.exports = {
  enviarComandos: comandos
}
