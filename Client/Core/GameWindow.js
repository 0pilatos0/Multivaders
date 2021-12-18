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
        // this.gameObjects.map(gameObject => {
        //     gameObject.draw(ctx)
        // })
        let offset = this.position
        MultiplayerObject.MultiplayerObjects.map(gameObject => {
            // console.log(gameObject.position.x * scale, gameObject.position.y * scale)
            // console.log(gameObject.position)
            // console.log(this.position)
            
            gameObject.draw(ctx, scale, offset)
        })
    }

    update(){

    }
}