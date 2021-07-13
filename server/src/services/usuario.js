const userRepository = require('../repository/usuario')

async function salvarUsuarioGrupo(message){
    if(message.isGroupMsg){
        await salvarGrupo(message)
        await salvarUsuario(message)
    } else {
        await salvarUsuario(message)
    }
}

async function salvarGrupo(message){
    if(await alredyHasGrupo(message)){
        return
    }
    let grupo = {
        numero: message.from,
        nome: message.chat.name,
        tipo: 'grupo'
    }
    await userRepository.save(grupo)
}

async function salvarUsuario(message){
    let numero = message.isGroupMsg ? message.author : message.from
    let usuarioEncontrado = await userRepository.get({numero})
    if(usuarioEncontrado.length){
        return
    }

    let usuario = {
        numero,
        nome: message.sender.pushname || null, 
        tipo: 'usuario'
    }
    await userRepository.save(usuario)
}

async function alredyHasGrupo(message){
    let grupo_recebido_id = message.from.split('-')[1]
    let grupos = await userRepository.get({tipo: 'grupo'})
    let grupoAlredyExists = grupos.find(grupo => {
        let grupo_id = grupo.numero.split('-')[1]
        if(grupo_id ===  grupo_recebido_id){
            return grupo
        }
    })
    return grupoAlredyExists
}

module.exports = {
    salvarUsuarioGrupo
}



