const sequelize = require("./config.js").sequelize
const { DataTypes } = require('sequelize')

const Horoscopo = sequelize.define('Horoscopo', {
    numero: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    signo:{
        type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    isCadastrado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
    }
})

//Atenção!! Só descomente se souber usar
// sequelize.sync({ force: true }).then(()=>{
//     console.log("Tabelas Criadas!")
// })

module.exports = {
    Horoscopo
}