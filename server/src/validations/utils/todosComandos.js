let todosComando = [
    {
        "comando":"#placa",
        "descricao": "me envie uma placa de carro que deseja consultar com esse comando que irei te retornar oque sei sobre esse veiculo.\n```(exemplo: #placa ovt1270)```",
        "privado":{
            "comando": "➤ *Informação sobre veiculos -->*",
            "descrição": "me envie uma placa de carro que deseja consultar que irei te retornar oque sei sobre esse veiculo",
            "regex1": []
        }
    },
    {
        "comando":"#figurinha",
        "descrição": "mencione uma foto que alguem do grupo enviou utilizando esse comando ou me mande uma foto com esse comando de legenda que irei criar uma figurinha.\n\n",
        "privado":{
            "comando":"➤ *Criar figurinhas -->*",
            "descrição": "me envie uma foto que irei criar uma figurinha para você",
            "tipo":"image"
        }
    }
]


module.exports = {
    todosComando,
}


// AAA0A00 AAA00A0 AAA0000

// const validacao = [
//     {
//         "placa3": /([a-zA-Z])([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])/
//     },
//     {
//         "placa2": /([a-zA-Z])([a-zA-Z])([a-zA-Z])([0-9])([0-9])([a-zA-Z])([0-9])/
//     },
//     {
//         "placa1": /([a-zA-Z])([a-zA-Z])([a-zA-Z])([0-9])([a-zA-Z])([0-9])([0-9])/
//     }
// ]