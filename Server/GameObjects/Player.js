const GameObject = require("../Core/GameObject");

module.exports = class Player extends GameObject{
    constructor(position, size) {
        super(position, size)
        this.type = "Player"
    }
}