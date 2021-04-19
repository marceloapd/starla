const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './databases/storage.sqlite',
    logging: false
})
try{
    sequelize.authenticate().then((_)=>{
        console.log("Banco de dados conectado!")
    })
}catch(e){
    console.error("Banco de dados não conectado:",e)
}
module.exports = {
    sequelize
}


