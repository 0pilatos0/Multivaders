import LobbiesMenu from "../Elements/LobbiesMenu/LobbiesMenu.js"

export default function HandleLobbies(client){
    client.on('lobbies', lobbies => {
        window.lobbiesMenu = new LobbiesMenu()
        window.lobbies = lobbies
    })
}