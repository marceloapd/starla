const inscrever = require("../../controllers/comandos").inscrever
const request = require('request');
const { JSDOM } = require('jsdom')

let signos = [
    "aquario", "peixes", "aries", "touro", "gemeos",
    "cancer", "leao", "virgem", "libra",
    "escorpiao", "sagitario", "capricornio"
]

let comandosValidos = {
    "diario" : cadastrarHoroscopo,
    "sair" : desativarHoroscopo
}

function run(comando, message, client){
    let comandoSecundario = comando.split(" ")[1].toLowerCase()
    if (signos.includes(comandoSecundario)){
        let signo = comandoSecundario.toLowerCase()
        gerarHoroscopo(signo,message,client)
        return
    }
    else if(comandosValidos[comandoSecundario]){
        let [comandoSecundario, signo] = [comando.split(" ")[1].toLowerCase(), comando.split(" ")[2].toLowerCase()]
        if(signos.includes(signo)){
            comandosValidos[comandoSecundario](message, client, signo)
            return
        }
        throw({'message':'Este signo não foi encontrado'})
    }
    throw({'message':`Desculpe, eu não reconheço este comando: ${comandoSecundario}`})
}

function gerarHoroscopo(signo,message,client){
    request(`https://joaobidu.com.br/horoscopo/signos/previsao-${signo}`, function (_, response, body) {
        if(response.statusCode != 200) throw({'message':'Erro ao pesquisar este horoscopo'})
        const { document } = new JSDOM(body).window
        let horoscopo = document.querySelector('.texto').querySelectorAll('p')
        horoscopo = `${horoscopo[0].textContent} \n ${horoscopo[1].textContent}`
        client.sendText(message.from, `_Aqui está o horoscopo do dia de ${signo.charAt(0).toUpperCase() + signo.slice(1)}, ${message.sender.pushname} 🧙‍♂️_ \n${horoscopo}`)
});
}

function cadastrarHoroscopo(signo, message, client){
    console.log("Signo Cadastrado")
} 

function desativarHoroscopo(signo, message, client){
    console.log("Signo diario desativado")
}

inscrever("#horoscopo", run)
