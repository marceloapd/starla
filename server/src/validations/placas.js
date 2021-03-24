// AAA0A00 AAA00A0 AAA0000

const validacao = [
    {
        "placa3": /([a-zA-Z])([a-zA-Z])([a-zA-Z])([0-9])([0-9])([0-9])([0-9])/
    },
    {
        "placa2": /([a-zA-Z])([a-zA-Z])([a-zA-Z])([0-9])([0-9])([a-zA-Z])([0-9])/
    },
    {
        "placa1": /([a-zA-Z])([a-zA-Z])([a-zA-Z])([0-9])([a-zA-Z])([0-9])([0-9])/
    }
]

module.exports = {
    validacao: validacao
}