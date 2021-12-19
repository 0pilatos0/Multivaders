const fs = require('fs')
const Vector2 = require('./Vector2')

module.exports = class Map{
    static Load(path){
        let gameObjects = []
        let data = JSON.parse(fs.readFileSync(path, 'utf-8'))
        let tilesets = []
        data.tilesets.map(tileset => {
            path = path.substr(0, path.lastIndexOf('/'))
            let img = fs.readFileSync(`${path}/${tileset.image}`, 'base64')
            tilesets.push({
                columns: tileset.columns,
                rows: tileset.imageheight / tileset.tileheight,
                index: tileset.firstgid,
                tileSize: new Vector2(tileset.tilewidth, tileset.tileheight),
                img: `data:image/png;base64,${img}`
            })
        })
        data.layers.map(layer => {
            if(layer.type == "tilelayer"){
                let y = -1
                layer.data.map((tile, index) => {
                    if(index % layer.width == 1){
                        y++
                    }
                    if(tile != 0){
                        let tileX = (index % layer.width) * data.tilewidth
                        let tileY = y * data.tileheight
                        let size = new Vector2(data.tilewidth * 4, data.tileheight * 4)
                        let position = new Vector2(tileX * 4, tileY * 4)
                        gameObjects.push({
                            position,
                            size,
                            spriteIndex: tile - 1,
                        })
                    }
                })
            }
        })
        return { gameObjects, tilesets }
    }
}