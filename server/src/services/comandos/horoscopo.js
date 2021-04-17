const inscrever = require("../../controllers/comandos").inscrever
const request = require('request');
const { JSDOM } = require('jsdom')

async function run(comando, message, client){
    let signo = message.body.split(" ")[1].toLowerCase()
    gerarHoroscopo(signo,message,client)
}




function gerarHoroscopo(signo,message,client){
    request(`https://joaobidu.com.br/horoscopo/signos/previsao-${signo}`, function (error, response, body) {
        const { document } = new JSDOM(body).window
        let horoscopo = document.querySelector('.texto').querySelectorAll('p')
        horoscopo = `${horoscopo[0].textContent} \n ${horoscopo[1].textContent}`
        client.sendText(message.from, `_Aqui está o horoscopo do dia de ${signo.charAt(0).toUpperCase() + signo.slice(1)}, ${message.sender.pushname} 🧙‍♂️_ \n${horoscopo}`)
});
}

inscrever("#horoscopo", run)
