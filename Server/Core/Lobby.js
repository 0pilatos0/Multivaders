const Player = require("../GameObjects/Player")
const Projectile = require("../GameObjects/Projectile")
const Vector2 = require("./Vector2")
const fs = require('fs')

module.exports = class Lobby{
    size = new Vector2(1400, 1600)
    
    static lobbies = []

    gameObjects = []

    players = []

    constructor(maxAmountOfPlayers) {
        Lobby.lobbies.push(this)
        this.id = Lobby.lobbies.indexOf(this) + 1
        this.maxPlayers = maxAmountOfPlayers
    }

    join(socket){
        if(this.players.length < this.maxPlayers){
            global.clients[socket.id].lobby = this
            let player = new Player(new Vector2(this.size.x / 2 - 32, this.size.y - 96), new Vector2(64, 64), socket.id)
            socket.emit('player', {
                sprite:`data:image/png;base64,${fs.readFileSync('./assets/player.png', 'base64')}`,
                position: player.position,
                size: player.size,
                id: player.id
            })
            this.gameObjects.push(player)
            socket.emit('sprites', [
                {name: "Projectile", src: `data:image/png;base64,${fs.readFileSync('./assets/projectile.png', 'base64')}`},
            ])
            socket.emit('size', this.size)
            this.players.push(global.clients[socket.id])
            socket.on('movement', (movement) => {
                // if(movement.w){
                //     player.position.y -= player.speed
                // }
                if(movement.a){
                    player.position.x -= player.speed //BUG uhm not sure but guess if client has more fps it will be faster
                }
                // if(movement.s){
                //     player.position.y += player.speed
                // }
                if(movement.d){
                    player.position.x += player.speed //BUG uhm not sure but guess if client has more fps it will be faster
                }
                if(movement[" "]){
                    if(!player.fireTimer || player.fireTimer <= 0){
                        player.fireTimer = 250
                        this.gameObjects.push(new Projectile(new Vector2(player.position.x + 24, player.position.y - 24), new Vector2(16, 32), socket.id))
                    }
                }
                if(player.position.y <= 0){
                    player.position.y = 0
                }
                if(player.position.y > this.size.y - player.size.y){
                    player.position.y = this.size.y - player.size.y
                }
                if(player.position.x <= 0){
                    player.position.x = 0
                }
                if(player.position.x > this.size.x - player.size.x){
                    player.position.x = this.size.x - player.size.x
                }
            })
            socket.emit('map', global.maps["level1"])
            socket.emit('joined')
        }
    }

    get full(){
        return !(this.players.length < this.maxPlayers)
    }

    leave(client){
        this.players.splice(this.players.indexOf(client), 1)
        this.gameObjects.splice(this.gameObjects.findIndex(gameObject => gameObject.id == client.socket.id), 1)
    }

    update(){
        this.gameObjects.map(gameObject => {
            if(gameObject.type == "Projectile"){
                if(gameObject.position.y < 0 - gameObject.size.y){
                    this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1)
                }
            }
            if(gameObject.type == "Player"){
                if(gameObject.fireTimer){
                    gameObject.fireTimer -= global.deltaTime
                }
            }
            gameObject.update()
        })
        this.players.map(player => {
            player.socket.emit('gameObjects', this.gameObjects)
        })
    }
}