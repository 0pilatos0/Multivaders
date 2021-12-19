const Lobby = require("../Core/Lobby");

global.deltaTime = 1000 / 30

module.exports = function HandlePlayer(socket){
    socket.on('lobbies', (data) => {
        let lobbies = []
        if(Lobby.lobbies.length == 0){
            new Lobby(2)
        }
        if(Lobby.lobbies.every(lobby => lobby.full)){
            new Lobby(2)
        }
        Lobby.lobbies.map(lobby => {
            if(!lobby.full){
                lobbies.push({
                    id: lobby.id,
                    type: "PvP",
                    players: lobby.players.length,
                    maxPlayers: lobby.maxPlayers
                })
            }
        })
        socket.emit('lobbies', lobbies)
    })
    
    socket.on('join', (data) => {
        let lobby = Lobby.lobbies.find(lobby => lobby.id == data)
        lobby.join(socket)
        // let lobby = Lobby.lobbies.find(lobby => {
        //     return lobby.full
        // })
        // if(lobby == undefined){
        //     lobby = new Lobby(2)
        // }
        // lobby.join(socket)
        // console.log(Lobby.lobbies)
    })
}

setInterval(() => {
    Lobby.lobbies.map(lobby => {
        lobby.update()
    })
}, global.deltaTime);