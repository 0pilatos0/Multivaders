export default class MultiplayerObject{
    static MultiplayerObjects = []

    constructor(position, size, sprite) {
        this.position = position
        this.size = size
        this.sprite = sprite
        MultiplayerObject.MultiplayerObjects.push(this)
    }

    draw(ctx, scale, offset){
        ctx.drawImage(this.sprite, this.position.x * scale + offset.x, this.position.y * scale + offset.y, this.size.x * scale, this.size.y * scale)
    }

    update(){

    }
}