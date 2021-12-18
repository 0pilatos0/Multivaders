const Player = require("../GameObjects/Player");
const fs = require('fs');
const Vector2 = require("../Core/Vector2");
const Projectile = require("../GameObjects/Projectile");
const Lobby = require("../Core/Lobby");

let width = 1400
let height = 1600

let deltaTime = 1000 / 30

let projectiles = []

let lobby = new Lobby(2)

module.exports = function HandlePlayer(socket){
    socket.on('join', (data) => {
        let player = new Player(new Vector2(width / 2 - 32, height - 96), new Vector2(64, 64), socket.id)
        global.clients[socket.id].player = player
        socket.emit('player', {
            sprite:`data:image/png;base64,${fs.readFileSync('./assets/player.png').toString('base64')}`,
            position: player.position,
            size: player.size,
            id: player.id
        })
        socket.emit('sprites', [
            {name: "Projectile", src: `data:image/png;base64,${fs.readFileSync('./assets/projectile.png').toString('base64')}`}
        ])
        socket.emit('size', new Vector2(width, height))
        lobby.join(socket.id)
    })

    socket.on('movement', (movement) => {
        let client = global.clients[socket.id]
        // if(movement.w){
        //     client.player.position.y -= 5
        // }
        if(movement.a){
            client.player.position.x -= 5 //BUG uhm not sure but guess if client has more fps it will be faster
        }
        // if(movement.s){
        //     client.player.position.y += 5
        // }
        if(movement.d){
            client.player.position.x += 5 //BUG uhm not sure but guess if client has more fps it will be faster
        }
        if(movement[" "]){
            if(!client.fireTimer || client.fireTimer <= 0){
                client.fireTimer = 250
                projectiles.push(new Projectile(new Vector2(client.player.position.x + 24, client.player.position.y - 24), new Vector2(16, 32), socket.id))
            }
        }
        if(client.player.position.y <= 0){
            client.player.position.y = 0
        }
        if(client.player.position.y > height - 64){
            client.player.position.y = height - 64
        }
        if(client.player.position.x <= 0){
            client.player.position.x = 0
        }
        if(client.player.position.x > width - 64){
            client.player.position.x = width - 64
        }
    })
}

setInterval(() => {
    let gameObjects = []
    projectiles.map(projectile => {
        projectile.position.y -= deltaTime
        if(projectile.position.y < 0 - projectile.size.y){
            projectiles.splice(projectiles.indexOf(projectile), 1)
        }
    })
    gameObjects = gameObjects.concat(projectiles)
    Object.keys(global.clients).map(id => {
        let client = global.clients[id]
        if(client.fireTimer){
            client.fireTimer -= deltaTime
        }
        if(client.player){
            gameObjects.push(client.player)
        }
    })
    Object.keys(global.clients).map(id => {
        let client = global.clients[id]
        if(client.player){
            client.socket.emit('gameObjects', gameObjects)
        }
    })
}, deltaTime);