import Canvas from "./Core/Canvas.js";
import JSONLoader from "./Core/Loaders/JSONLoader.js";
import ScriptLoader from "./Core/Loaders/ScriptLoader.js";
import Loader from "./Elements/Loader/Loader.js";
import HandlePlayer from "./Handlers/PlayerHandler.js";

import MainMenu from "./Elements/MainMenu/MainMenu.js";
import OptionsMenu from "./Elements/OptionsMenu/OptionsMenu.js";
import HandleLobbies from "./Handlers/LobbiesHandler.js";
import HTMLLoader from "./Core/Loaders/HTMLLoader.js";
import HandleMap from "./Handlers/MapHandler.js";

let connectingLoader = new Loader("Connecting to server")
window.mainMenu = new MainMenu()
window.optionsMenu = new OptionsMenu()

window.HTMLLoader = HTMLLoader

JSONLoader.Load("config.json").then(config => {
    ScriptLoader.Load(`https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.0/socket.io.min.js`).then((data) => {
        eval(data)
    
        window.client = io(`${config.SERVER_URL}`, {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

        window.canvas = new Canvas()
        window.canvas.remove()
    
        window.client.on('connect', () => {
            console.log("connected to server")
            connectingLoader.hide()
            window.mainMenu.show()
        })

        HandlePlayer(client)
        HandleLobbies(client)
        HandleMap(client)
    
        window.client.on('disconnect', () => {
            console.log("disconnected from server")
            connectingLoader.show()
            window.canvas.remove()
        })
    })
})