module.exports = class Lobby{
    static lobbies = []

    players = []

    constructor(maxAmountOfPlayers) {
        //TODO give it it owns gameobjects so it is lobby based instead of global
        Lobby.lobbies.push(this)
        this.maxPlayers = maxAmountOfPlayers
    }

    join(socketId){
        if(this.players.length < this.maxPlayers){
            this.players.push(socketId)
        }
    }
}