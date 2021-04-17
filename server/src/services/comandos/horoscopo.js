const inscrever = require("../../controllers/comandos").inscrever

async function run(comando, message, client){
   let signo = message.body.split(" ")[1]
    console.log(signo)
}

















inscrever("#horoscopo", run)
