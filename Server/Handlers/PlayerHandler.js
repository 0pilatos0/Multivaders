const Player = require("../GameObjects/Player");
const fs = require('fs');
const Vector2 = require("../Core/Vector2");

let width = 1400
let height = 1600

module.exports = function HandlePlayer(socket){
    socket.on('join', (data) => {
        let player = new Player(new Vector2(width / 2 - 32, height / 2 - 32), new Vector2(64, 64));
        global.clients[socket.id].player = player
        socket.emit('player', {
            sprite:`data:image/png;base64,${fs.readFileSync('./assets/player.png').toString('base64')}`,
            position: player.position,
            size: player.size
        })
        socket.emit('size', new Vector2(width, height))
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