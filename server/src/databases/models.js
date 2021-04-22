const sequelize = require("./config.js").sequelize
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
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
        defaultValue: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

// Atenção!! Só descomente se souber usar
// sequelize.sync({ force: true }).then(()=>{
//     console.log("Tabelas Criadas!")
// })

module.exports = {
    User,
    sequelize
}