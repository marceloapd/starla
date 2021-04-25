let status = ['talvez', 'invalido', 'privado']

function verificarValidacao(message, callback){
    let comando
    if(message.isGroupMsg == false){
        comando = validarConverterComandoPrivado(message)
    }else{
        comando = validarComandoGrupo(getComandoByTipo(message))
    }
    if (status.includes(comando.status)){
        return callback(comando)
    }      
    callback(null, comando.comandoCompleto)
}

function getComandoByTipo(message){
    tipos = ['caption', 'reply']
    for(index in tipos){
        if(message[tipos[index]]){
            return message[tipos[index]]
        }
    }
    return message.body
}
 
function validarComandoGrupo(comandoRecebido){
    comandoRecebido = removerAcentos(comandoRecebido.toLowerCase())
    let comandoPrimario = comandoRecebido.split(" ")[0].toLowerCase()
    let comandos = getComandos()
    comandos.forEach((item, index, array)=>{
        array[index] = item.comando 
    })
    let response = {}
    for(index in comandos){
        if (comandoPrimario.startsWith(comandos[index].substring(0, 4))){
            [response['message'], response['status']] = [comandos[index], "talvez"]
            if(comandoPrimario == comandos[index]){
                [response['status'], response['comandoCompleto']] = ["valido", comandoRecebido]
                return response
            }
            return response
        }
    }
    response['status'] = 'invalido'
    return response
}

function getComandos(){
    const fs = require('fs')
    return  JSON.parse(fs.readFileSync("./helpers/comandos.json"))
}


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
  
      for ( var letra in mapaAcentosHex ) {
          var expressaoRegular = mapaAcentosHex[letra];
          string = string.replace( expressaoRegular, letra );
      }
  
      return string;
  }

  function validarConverterComandoPrivado(message){
    let tipos_validos_privado = [
        'image',
        'video'
    ]
    for(index in tipos_validos_privado){
        if(message.type == tipos_validos_privado[index]){
            return {
                'status':'valido',
                'comandoCompleto':'#figurinha',
            }
        }
    }
    return {
        'status':'privado',
        'message':'#figurinha'
    }
  }


module.exports = {verificarValidacao}