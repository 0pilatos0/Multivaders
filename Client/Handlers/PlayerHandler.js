import MultiplayerObject from "../Core/MultiplayerObject.js"
import Player from "../GameObjects/Player.js"

let playerId

window.sprites = {}

export default function HandlePlayer(client){
    client.on('player', (data) => {
        playerId = data.id
        window.playerImg = new Image()
        playerImg.onload = () => {
            new Player(data.position, data.size, window.playerImg, true)
        }
        window.playerImg.src = data.sprite
    })

    client.on('sprites', (data) => {
        data.map(spriteObject => {
            let sprite = new Image()
            sprite.onload = () => {
                window.sprites[spriteObject.name] = sprite
            }
            sprite.src = spriteObject.src
        })
    })

    client.on('gameObjects', (data) => {
        MultiplayerObject.MultiplayerObjects = []
        data.map(gameObject => {
            if(gameObject.type == "Player"){
                let move = false
                if(playerId == gameObject.id){
                    move = true
                }
                new Player(gameObject.position, gameObject.size, window.playerImg, move)
            }
            else{
                let own = false
                if(playerId == gameObject.id){
                    own = true
                }
                new MultiplayerObject(gameObject.position, gameObject.size, window.sprites[gameObject.type], own)   
            }
        })
    })
}