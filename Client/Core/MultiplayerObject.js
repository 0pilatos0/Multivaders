export default class MultiplayerObject{
    static MultiplayerObjects = []

    constructor(position, size, sprite) {
        this.position = position
        this.size = size
        this.sprite = sprite
        MultiplayerObject.MultiplayerObjects.push(this)
    }

    draw(ctx, scale){
        ctx.drawImage(this.sprite, this.position.x * scale, this.position.y * scale, this.size.x * scale, this.size.y * scale)
    }

    update(){

    }
}