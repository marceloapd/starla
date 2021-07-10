const inscrever = require("../../controllers/comandos").inscrever
const request = require('request');
const { JSDOM } = require('jsdom')
const db = require('../../databases/models').User
const loggerTerminal =  require('../../helpers/logger')

let signos = [
    "aquario", "peixes", "aries", "touro", "gemeos",
    "cancer", "leao", "virgem", "libra",
    "escorpiao", "sagitario", "capricornio"
]

let comandosValidos = {
    "diario" : cadastrarHoroscopo,
    "sair" : sairHoroscopo
}

/**
 * Executa o comando correto para o horoscopo 
 * @param {string} comando comando que será usado
 * @param {object} message mensagem do cliente
 * @param {object} client cliente venom
 */
async function run(comando, message, client){
    let comandoSecundario = comando.split(" ")[1] || null
    if(!comandoSecundario){
        throw({"message":"Acho que você esqueceu de inserir o signo", 'status': 'outros'})
    }
    if ( signos.includes(comandoSecundario)){
        let signo = comandoSecundario
        gerarEnviarHoroscopo(signo,message,client)
        return
    }
    else if(comandosValidos[comandoSecundario]){
        if(message.isGroupMsg == true){
            throw({'message': 'Estes comando está disponível apenas no privado', 'status': 'outros'})
        }
        await executarComandoSecundario(message, client, comando)
        return
    }
    throw({'message':`Desculpe, eu não reconheço este comando: ${comandoSecundario}`, 'status': 'outros'})
}

/**
 * Faz um scraping para o signo selecionado e envia para o cliente
 * @param {string} signo signo que será usado na pesquisa 
 * @param {object} message mensagem do cliente
 * @param {object} client cliente venom
 */
function gerarEnviarHoroscopo(signo, message, client){
    request(`https://joaobidu.com.br/horoscopo/signos/previsao-${signo}`, function (_, response, body) {
        if(response.statusCode != 200) {
            throw({'message':'Erro ao pesquisar este horoscopo!', 'status': 'outros'})
        }
        const { document } = new JSDOM(body).window
        let  horoscopo = document.querySelector('.texto').querySelectorAll('p')
        horoscopo = `${horoscopo[0].textContent} \n ${horoscopo[1].textContent}`
        client.sendText(message.from, `_Aqui está o horoscopo do dia de ${signo.charAt(0).toUpperCase() + signo.slice(1)}, ${message.sender.pushname} 🧙‍♂️_ \n${horoscopo}`)
        loggerTerminal.mensagemLog(message, `Horoscopo enviado: ${signo}`)
    });
}

/**
 * Executa o comando secundário do horoscopo
 * @param {object} message mensagem do cliente
 * @param {object} client cliente venom
 * @param {strinjg} comando comando que será usado 
 */
async function executarComandoSecundario(message, client, comando){
    let [comandoSecundario, signo] = [comando.split(" ")[1], comando.split(" ")[2]]
        if(signos.includes(signo)){
            await comandosValidos[comandoSecundario](message, client, signo)
            return
        }
    throw({'message':'Este signo não foi encontrado!', 'status': 'outros'})
}

/**
 * Cadastra um signo para um cliente que será enviado no horosocopo diario
 * @param {object} message mesagem do cliente
 * @param {object} client cliente venom
 * @param {string} signo signo que será cadastrado 
 */
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
            loggerTerminal.mensagemLog(message, `Horoscopo cadastrado: ${signo}`)
            return
        }else{
            throw({'message': 'Ops! Você já cadastrou este signo!', 'status': 'outros'})
        }
    }else{
        user.signo = [signo]
        user.save()
        client.reply(message.from, "Tudo certo, irei mandar o horóscopo deste signo diariamente!", message.id)
        loggerTerminal.mensagemLog(message, `Horoscopo cadastrado: ${signo}`)
    }

} 

/**
 * Retira um horoscopo do cliente do horoscopo diario
 * @param {object} message mensagem do cliente
 * @param {object} client cliente venom
 * @param {string} signo signo que será retirado 
 */
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
            loggerTerminal.mensagemLog(message, `Horoscopo removido: ${signo}`)
            return
        }else{
            throw({'message': 'Você não possui um cadastro para este signo!', 'status': 'outros'})
        }
    }
    throw({'message': 'Você não possui nenhum signo cadastrado', 'status': 'outros'})
}

inscrever("#horoscopo", run)

