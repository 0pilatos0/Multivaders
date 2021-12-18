const GameObject = require("../Core/GameObject");

module.exports = class Projectile extends GameObject{
    constructor(position, size, id) {
        super(position, size, id)
        this.type = "Projectile"
    }
}