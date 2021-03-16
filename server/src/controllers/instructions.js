var allComands = [
  {
    "comando": "➤ *#figurinha*",
    "descrição": "me envie uma foto com essa legenda que irei criar uma figurinha para você"
  },
  {
    "comando": "➤ *#placa*",
    "descrição": "me envie uma placa de carro que deseja consultar com esse comando que irei te retornar oque sei sobre esse veiculo"
  }
]

const gerarComandos = () => {
  let dados;
  dados = "Olá Sou um robo desenvolvido para executar algumas funçoes como:\n\n"
  for (let i = 0; i < allComands.length; i++) {
    dados += `${allComands[i].comando} ${allComands[i].descrição}\n`
  }
  return dados
}


const comandos = (client, message) => {
  client
    .sendText(message.from, gerarComandos()) // message.from se refere a quem enviou a mensagem
    .then((result) => {

    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
}

module.exports = {
  enviarComandos: comandos
}
