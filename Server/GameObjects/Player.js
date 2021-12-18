const GameObject = require("../Core/GameObject");

module.exports = class Player extends GameObject{
    constructor(position, size, id) {
        super(position, size, id)
        this.type = "Player"
    }
}