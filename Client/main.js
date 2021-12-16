import Canvas from "./Core/Canvas.js";
import JSONLoader from "./Core/Loaders/JSONLoader.js";
import ScriptLoader from "./Core/Loaders/ScriptLoader.js";
import Loader from "./Elements/Loader/Loader.js";

let connectingLoader = new Loader("Connecting to server")

JSONLoader.Load("config.json").then(config => {
    ScriptLoader.Load(`https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.0/socket.io.min.js`).then((data) => {
        eval(data)
    
        const client = io(`${config.SERVER_URL}`, {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})
    
        client.on('connect', () => {
            console.log("connected to server")
            connectingLoader.hide()
            //TODO init game
        })
    
        client.on('disconnect', () => {
            console.log("disconnected from server")
            connectingLoader.show()
        })
    })
})