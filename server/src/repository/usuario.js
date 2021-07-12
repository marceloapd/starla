const User = require('../databases/models').User

async function save(usuarios){
    return await User.create(usuarios)
}

async function get(filtro=null){
    let query = {}
    if(filtro){
       query = {where: filtro}  
    }
    let usuarios = await User.findAll(query)
    return usuarios
}

async function remove(filtro){
    let query = {where: filtro}  
    return await User.destroy(query)
}


module.exports = {
    save,
    get,
    remove
}