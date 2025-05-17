const { Room } = require("colyseus");

class GameRoom extends Room {
  onCreate() {
    this.players = {};

    this.onMessage("move", (client, data) => {
      const player = this.players[client.sessionId];
      if (player) {
        player.x = data.x;
        player.y = data.y;
        this.broadcast("update", this.players);
      }
    });
  }

  onJoin(client) {
    this.players[client.sessionId] = { x: 400, y: 300 };
    this.send(client, "players", this.players);
    this.broadcast("update", this.players);
  }

  onLeave(client) {
    delete this.players[client.sessionId];
    this.broadcast("update", this.players);
  }
}

module.exports = { GameRoom };
