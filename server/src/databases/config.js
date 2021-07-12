const { Sequelize } = require('sequelize')
const configs = require('../config.json')

const sequelize = new Sequelize({
    dialect: configs.dialect,
    storage: configs.storage,
    logging: false
})
try{
    sequelize.authenticate()
}catch(e){
    console.error("Banco de dados não conectado:", e)
}
module.exports = {
    sequelize
}


