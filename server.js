// server.js (Colyseus server)
const colyseus = require("colyseus");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

class GameRoom extends colyseus.Room {
  onCreate() {
    this.setState({
      players: {}, // Store player data (id, x, y, name)
    });

    this.onMessage("move", (client, movement) => {
      // Update player position
      this.state.players[client.sessionId].x = movement.x;
      this.state.players[client.sessionId].y = movement.y;
    });
  }

  onJoin(client, options) {
    console.log(`${options.name} joined!`);
    // Initialize player with starting position and name
    this.state.players[client.sessionId] = {
      x: 400,
      y: 300,
      name: options.name,
    };
  }

  onLeave(client) {
    console.log(`${client.sessionId} left!`);
    delete this.state.players[client.sessionId];
  }
}

gameServer.define("game", GameRoom);
gameServer.listen(2567);
console.log("Server running on port 2567");