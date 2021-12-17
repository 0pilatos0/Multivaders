import Canvas from "./Core/Canvas.js";
import JSONLoader from "./Core/Loaders/JSONLoader.js";
import ScriptLoader from "./Core/Loaders/ScriptLoader.js";
import Loader from "./Elements/Loader/Loader.js";
import HandlePlayer from "./Handlers/PlayerHandler.js";
import MainMenu from "./Elements/MainMenu/MainMenu.js";

let connectingLoader = new Loader("Connecting to server")
let mainMenu = new MainMenu()
let canvas = new Canvas()
canvas.remove()

JSONLoader.Load("config.json").then(config => {
    ScriptLoader.Load(`https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.0/socket.io.min.js`).then((data) => {
        eval(data)
    
        const client = io(`${config.SERVER_URL}`, {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})
    
        client.on('connect', () => {
            console.log("connected to server")
            connectingLoader.hide()
            mainMenu.show()

            //TODO init game
            canvas.add()
            client.emit('join')
        })

        HandlePlayer(client)
    
        client.on('disconnect', () => {
            console.log("disconnected from server")
            connectingLoader.show()
            canvas.remove()
        })
    })
})