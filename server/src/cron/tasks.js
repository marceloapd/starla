const request = require('request');
const { JSDOM } = require('jsdom')
const db = require('../databases/models').User

async function horoscopoDiario(client){
    let users = await db.findAll({
        where: {
            isDeleted: false 
        }
    })
    users.forEach((user)=>{
        if(user.signo){
            user.signo.split(",").forEach((signo)=>{
                request(`https://joaobidu.com.br/horoscopo/signos/previsao-${signo}`, function (_, response, body) {
                    if(response.statusCode != 200) throw({'message':'Erro ao pesquisar este horoscopo'})
                    const { document } = new JSDOM(body).window
                    let  horoscopo = document.querySelector('.texto').querySelectorAll('p')
                    horoscopo =   `${horoscopo[0].textContent} \n ${horoscopo[1].textContent}`
                    client.sendText(user.numero, `_Aqui está o horoscopo do dia de ${signo.charAt(0).toUpperCase() + signo.slice(1)} 🧙‍♂️_ \n${horoscopo}`)
                })
            })
        }
    })
}

module.exports = {
    horoscopoDiario
}
