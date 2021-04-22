const inscrever = require("../../controllers/comandos").inscrever
const request = require('request');
const { JSDOM } = require('jsdom')
const db = require('../../databases/models').User
const sequelize = require('../../databases/models').sequelize

let signos = [
    "aquario", "peixes", "aries", "touro", "gemeos",
    "cancer", "leao", "virgem", "libra",
    "escorpiao", "sagitario", "capricornio"
]

let comandosValidos = {
    "diario" : cadastrarHoroscopo,
    "sair" : sairHoroscopo
}

function run(comando, message, client){
    let comandoSecundario = comando.split(" ")[1] || null
    if(!comandoSecundario){
        throw({"message":"Acho que você esqueceu de inserir o signo"})
    }
    if ( signos.includes(comandoSecundario)){
        let signo = comandoSecundario
        gerarHoroscopo(signo,message,client)
        return
    }
    else if(comandosValidos[comandoSecundario]){
        let [comandoSecundario, signo] = [comando.split(" ")[1], comando.split(" ")[2]]
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

async function cadastrarHoroscopo(message, client, signo){
    let [user, created] = await db.findOrCreate({
        where:{
            numero: message.from,
            isDeleted: false,
        },
        defaults:{numero: message.from}
    })
    if(!created){
        let signos = user.signo.split(",")
        if(!signos.includes(signo)){
            signos.push(signo)
            user.signo = signos
            user.save()
            client.reply(message.from, "Tudo certo, acrescentei mais este signo na sua lista de horóscopos diários!", message.id)
            return
        }else{
            client.reply(message.from, "Ops! Você já cadastrou este signo!", message.id)
            return 
        }
    }else{
        user.signo = [signo]
        user.save()
        client.reply(message.from, "Tudo certo, irei mandar o horóscopo deste signo diariamente!", message.id)
        return
    }

} 

async function sairHoroscopo(message, client, signo){
    let user = await db.findOne({
        where:{
            numero: message.from
        }
    })
    if(user && user.signo){
        let signos = user.signo.split(",")
        if(signos.includes(signo)){
            signos.splice(signos.indexOf(signo), 1)
            user.signo = signos
            user.save()
            client.reply(message.from, "Pronto! Você não receberá mais o horóscopo deste signo!", message.id)
            return
        }else{
            client.reply(message.from, "Você não possui um cadastro para este signo!", message.id)
            return
        }
    }
    client.reply(message.from, "Você não possui nenhum signo cadastrado", message.id)
    return
}

function checkHour(){
    setInterval(function () {
        var dataAtual = new Date(); // Data e hora do momento da execução
        // console.log(dataAtual.getHours()+ "-" + dataAtual.getMinutes() + "-" + dataAtual.getSeconds())
        if (dataAtual.getHours() == 8 && dataAtual.getMinutes() == 0 && dataAtual.getSeconds() == 0){
            console.log("Envie os horoscopos para todos")
        }
    }, 1000);
}

inscrever("#horoscopo", run)

