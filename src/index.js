require("dotenv").config();
const keepAlive = require("./server");
const client = require("./bot");

client.login(process.env.TOKEN);

// Ajout de la fonction keepAlive
keepAlive();
