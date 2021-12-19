const GameObject = require("../Core/GameObject");

module.exports = class Player extends GameObject{
    speed = 5

    constructor(position, size, id) {
        super(position, size, id)
        this.type = "Player"
    }
}