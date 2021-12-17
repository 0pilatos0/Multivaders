const Player = require("../GameObjects/Player");
const fs = require('fs');
const Vector2 = require("../Core/Vector2");

module.exports = function HandlePlayer(socket){
    socket.on('join', (data) => {
        global.clients[socket.id].player = new Player(new Vector2(1920 / 2 - 32, 1080 - 64), new Vector2(64, 64));
        socket.emit('player', {
            sprite:`data:image/png;base64,${fs.readFileSync('./assets/player.png').toString('base64')}`,
            position: new Vector2(100, 500),
            size: new Vector2(64, 64)
        })
    })
}

setInterval(() => {
    let players = []
    Object.keys(global.clients).map(id => {
        let client = global.clients[id]
        if(client.player){
            players.push(client.player)
        }
    })
    Object.keys(global.clients).map(id => {
        let client = global.clients[id]
        if(client.player){
            client.socket.emit('players', players)
        }
    })
}, 1000 / 30);