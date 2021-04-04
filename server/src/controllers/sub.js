
let observadores = []

function notificarTodos(comando, message, client){
    for (func in observadores){
        observadores[func](comando, message, client)
    }   
}

function inscrever(func){
    observadores.push(func)
}

function deletar(func){

}

module.exports = {
    notificarTodos,
    inscrever,
    deletar
}