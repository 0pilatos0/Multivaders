import GameObject from "../Core/GameObject.js"


export default function HandleMap(client){
    client.on('map', (data) => {
        window.sprites = []
        let requiredSprites = 0

        data.tilesets.map(tileset => {
            requiredSprites += tileset.columns * tileset.rows
        })

        data.tilesets.map(tileset => {
            let img = new Image()
            img.onload = () => {
                for (let y = 0; y < tileset.rows; y++) {
                    for (let x = 0; x < tileset.columns; x++) {
                        let canvas = document.createElement('canvas')
                        canvas.width = tileset.tileSize.x
                        canvas.height = tileset.tileSize.y
                        let ctx = canvas.getContext('2d')
                        ctx.imageSmoothingEnabled = false
                        ctx.drawImage(img, x * tileset.tileSize.x, y * tileset.tileSize.y, tileset.tileSize.x, tileset.tileSize.y, 0, 0, tileset.tileSize.x, tileset.tileSize.y)
                        let sprite = new Image()
                        sprite.onload = () => {
                            window.sprites.push(sprite)
                            if(window.sprites.length == requiredSprites){
                                data.gameObjects.map(gameObject => {
                                    new GameObject(gameObject.position, gameObject.size, window.sprites[gameObject.spriteIndex])
                                })
                            }
                        }
                        sprite.src = canvas.toDataURL('base64')
                    }
                }
            }
            img.src = tileset.img
        })
    })
}