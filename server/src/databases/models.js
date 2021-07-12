const sequelize = require("./config.js").sequelize
const { DataTypes } = require('sequelize')

let options = {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
  }

const User = sequelize.define('User', {
    numero: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, options)

// Atenção, não descomentar
// sequelize.sync({ force: true }).then(()=>{
//     console.log("Tabelas Criadas!")
// })
module.exports = {
    User,
}