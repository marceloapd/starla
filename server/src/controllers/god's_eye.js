const endereco = async (client, message) =>{
    try{
        // Send location
        await client
        .sendLocation(message.from, '-20.064280818983697', '-44.54923036694464', 'RIO DE JANEIRO')
        .then((result) => {
        console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        });
        
    } catch (e) {
        console.log("Error: ", e)
        // messageError(e, message, client)
}

}

module.exports = {
    endereco: endereco
}
