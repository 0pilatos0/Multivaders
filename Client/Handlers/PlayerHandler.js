import MultiplayerObject from "../Core/MultiplayerObject.js"


export default function HandlePlayer(client){
    client.on('player', (data) => {
        window.playerImg = new Image()
        playerImg.onload = () => {
            new MultiplayerObject(data.position, data.size, window.playerImg)
        }
        window.playerImg.src = data.sprite
    })

    client.on('players', (data) => {
        MultiplayerObject.MultiplayerObjects = []
        data.map(player => {
            new MultiplayerObject(player.position, player.size, window.playerImg)
        })
        
        // console.log(data)
    })
}