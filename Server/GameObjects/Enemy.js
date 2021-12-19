const GameObject = require("../Core/GameObject");

module.exports = class Enemy extends GameObject{
    direction = "left"

    constructor(position, size, id) {
        super(position, size, id)
        this.type = "Enemy"
    }

    update(){
        if(this.direction == "left"){
            this.position.x -= global.deltaTime
        }
        else if(this.direction == "right"){
            this.position.x += global.deltaTime
        }
    }
}