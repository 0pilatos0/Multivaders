import MultiplayerObject from "./MultiplayerObject.js"

export default class GameWindow{
    gameObjects = []

    constructor(position, size) {
        this.position = position
        this.size = size
    }

    draw(ctx, scale){
        ctx.beginPath()
        ctx.moveTo(this.position.x, this.position.y)
        ctx.lineTo(this.position.x + this.size.x, this.position.y)
        ctx.moveTo(this.position.x + this.size.x, this.position.y)
        ctx.lineTo(this.position.x + this.size.x, this.position.y + this.size.y)
        ctx.moveTo(this.position.x + this.size.x, this.position.y + this.size.y)
        ctx.lineTo(this.position.x, this.position.y + this.size.y)
        ctx.moveTo(this.position.x, this.position.y + this.size.y)
        ctx.lineTo(this.position.x, this.position.y)
        ctx.stroke()
        let offset = this.position
        this.gameObjects.map(gameObject => {
            gameObject.draw(ctx, scale, offset)
        })
    }

    update(){
        this.gameObjects.map(gameObject => {
            gameObject.update()
        })
    }
}