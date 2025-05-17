const http = require("http");
const express = require("express");
const { Server } = require("colyseus");
const { GameRoom } = require("./GameRoom");

const app = express();
const server = http.createServer(app);

const gameServer = new Server({
  server,
});

gameServer.define("game", GameRoom);

const PORT = process.env.PORT || 3000;
gameServer.listen(PORT);
console.log("Servidor corriendo en el puerto", PORT);
