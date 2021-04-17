const fs = require("fs")
let data = JSON.parse(fs.readFileSync("./comandos.json"))
console.log(data)