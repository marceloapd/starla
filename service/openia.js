const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_KEY,
});

const getDavinciResponse = async (clientText) => {

    const openai = new OpenAIApi(configuration);
    
    const options = {
        model: "text-davinci-003", // Modelo GPT a ser usado
        prompt: clientText, // Texto enviado pelo usuário
        temperature: 1, // Nível de variação das respostas geradas, 1 é o máximo
        max_tokens: 1024, // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
        best_of: 3,
        frequency_penalty: 0.3
    }

    try {
        const response = await openai.createCompletion(options)
        let botResponse = ""
        response.data.choices.forEach(({ text }) => {
            botResponse += text
        })
        return `${botResponse.trim()}`
    } catch (e) {
        return `❌ OpenAI Response Error: ${e.response.data.error.message}`
    }
}

module.exports = {
    async chatgpt(client, message){
        if (message.isGroupMsg == true && message.body.toLowerCase().startsWith('starla')){
            message.body = message.body.toLowerCase().replace("starla", "").trim()
            davinciResponse = await getDavinciResponse(message.body)
            client.sendText(message.from, davinciResponse)
        } else if (message.isGroupMsg == false){
            davinciResponse = await getDavinciResponse(message.body)
            client.sendText(message.from, davinciResponse)
        }
    },

    async getDalleResponse(clientText){
        
        const openai = new OpenAIApi(configuration);

        const options = {
            prompt: clientText, // Descrição da imagem
            n: 1, // Número de imagens a serem geradas
            size: "1024x1024", // Tamanho da imagem
        }
    
        try {
            const response = await openai.createImage(options);
            return response.data.data[0].url
        } catch (e) {
            return `❌ OpenAI Response Error: ${e.response.data.error.message}`
        }
    }
}