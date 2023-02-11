const dotenv = require('dotenv'); 
dotenv.config()

const venom = require('venom-bot');
const controllers = require('./controllers')

venom
  .create({
    session: 'Starla',
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
    client.onMessage((message) => {
      controllers.orchestrator.handler(client, message)
    });
  }
