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

app.get("/", (req, res) => {
  res.send("Servidor Colyseus en funcionamiento");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);  // <-- Cambiar gameServer.listen a server.listen
console.log("Servidor corriendo en el puerto", PORT);