/**
 * Verifica a validacao de um comando e padroniza o comando.
 * @param {object} message Objeto da mensagem do cliente 
 * @returns Um código validado que será usado para chamar o comando correto
 */
function verificarValidacao(message){
    let resultado = {}
    if(message.isGroupMsg === false){
        resultado = validarConverterComandoPrivado(message)
    }else{
        resultado = validarComandoGrupo(getComandoByTipo(message))
    }
    return resultado
}

/**
 * Verifica o tipo correto da mensagem que foi enviada
 * @param {object} message Objeto da mensagem do cliente 
 * @returns retorna o tipo correto da mensagem que foi recebida
 */
function getComandoByTipo(message){
    tipos = ['caption', 'reply']
    for(tipo of tipos){
        if(message[tipo]){
            return message[tipo]
        }
    }
    return message.body
}

/**
 * Valida um comando
 * @param {string} comandoRecebido Comando recebido 
 * @returns um objeto com o comando validado
 */
function validarComandoGrupo(comandoRecebido){
    comandoRecebido = removerAcentos(comandoRecebido.toLowerCase())
    let comandoPrimario = comandoRecebido.split(" ")[0].toLowerCase()
    let comandos = getComandos()
    comandos.forEach((item, index, array)=>{
        array[index] = item.comando 
    })

    let response = {}
    for(let comando of comandos){
        if (comandoPrimario.startsWith(comando.substring(0, 4))){
            if(comandoPrimario == comando){
                return {'message': comandoRecebido }
            }
            throw({'status': 'talvez', 'message': comando})
        }
    }
    
    throw({'status': 'invalido'})
}

/**
 * @returns os comandos cadastrados no json
 */
function getComandos(){
    const fs = require('fs')
    return  JSON.parse(fs.readFileSync("./helpers/comandos.json"))
}

/**
 * Remove os acentos
 * @param {string} newStringComAcento String com acento 
 * @returns string sem acentos
 */
function removerAcentos( newStringComAcento ) {
    var string = newStringComAcento;
        var mapaAcentosHex 	= {
            a : /[\xE0-\xE6]/g,
            e : /[\xE8-\xEB]/g,
            i : /[\xEC-\xEF]/g,
            o : /[\xF2-\xF6]/g,
            u : /[\xF9-\xFC]/g,
            c : /\xE7/g,
            n : /\xF1/g
        };

        for ( let letra in mapaAcentosHex ) {
            let expressaoRegular = mapaAcentosHex[letra];
            string = string.replace( expressaoRegular, letra );
        }

        return string;
  }
  
/**
 * Valida e converte o comando do privado para um formato correto
 * @param {object} message  Objeto da mensagem do cliente 
 * @returns retorna um objeto com o comando que será usado
 */
function validarConverterComandoPrivado(message){
    let tipos_validos_privado = [
        'image',
        'video'
    ]
    
    for(tipo of tipos_validos_privado){
        if(message.type == tipo){
            return {'message':'#figurinha'}
        }
    }
    if(message.type == 'chat'){
        let comandoRecebido = message.body.split(' ')[0]
        let comandoCompleto = message.body
        let comandos = getComandos()
        for(let comando of comandos){
            if(comandoRecebido.startsWith(comando.comando.substring(0,4))){
                if(comandoRecebido === comando.comando){
                    return {'message': comandoCompleto}
                }
                throw({'status': 'talvez', 'message': comando.comando})
            }
        }
        throw({'status': 'invalido', 'message': comandoRecebido})
    }
    return {'message':'#figurinha'}
}


module.exports = {verificarValidacao}