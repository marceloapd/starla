const request = require('request');
const { JSDOM } = require('jsdom')
const db = require('../databases/models').User


/**
 * Envia o horoscopo para os cliente de os signos cadastrados que o cliente possui 
 * @param {object} client Objeto client Venom 
 */
async function horoscopoDiario(client){
    let users = await db.findAll({
        where: {
            isDeleted: false 
        }
    })
    users.forEach((user)=>{
        if(user.signo){
            user.signo.split(",").forEach((signo)=>{
                request(`https://joaobidu.com.br/horoscopo/signos/previsao-${signo}`, callbackHoroscopoDiario)
            })
        }
    })
    let hoje = new Date()
    console.log(`[Cron] Horoscopos enviados as ${hoje.getHours()}:${hoje.getMinutes()} horas`)
}

/**
 * Faz um scraping dos dados necessários para o horoscopo e os envia para o cliente
 * @param {*} _ Não será usado 
 * @param {*} response reposta da requisição
 * @param {*} body corpo da requisição
 */
function callbackHoroscopoDiario(_, response, body) {
    if(response.statusCode != 200){
        throw({'message':'Erro ao pesquisar este horoscopo', 'status': 'outros'})
    } 
    
    const { document } = new JSDOM(body).window
    let  horoscopo = document.querySelector('.texto').querySelectorAll('p')
    
    horoscopo = `${horoscopo[0].textContent} \n ${horoscopo[1].textContent}`
    client.sendText(user.numero, `_Aqui está o horoscopo do dia de ${signo.charAt(0).toUpperCase() + signo.slice(1)} 🧙‍♂️_ \n${horoscopo}`)
}

module.exports = {
    horoscopoDiario
}
