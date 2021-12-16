export default class GameObject{
    static GameObjects = []

    constructor(position, size, sprite) {
        this.position = position
        this.size = size
        this.sprite = sprite
        GameObject.GameObjects.push(this)
    }

    draw(ctx, scale){
        ctx.drawImage(this.sprite, this.position.x * scale, this.position.y * scale, this.size.x * scale, this.size.y * scale)
    }

    update(){

    }
}