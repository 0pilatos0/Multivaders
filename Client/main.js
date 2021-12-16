import JSONLoader from "./Core/Loaders/JSONLoader.js";
import ScriptLoader from "./Core/Loaders/ScriptLoader.js";

JSONLoader.Load("config.json").then(config => {
    ScriptLoader.Load(`${config.SERVER_URL}/socket.io/socket.io.js`).then((data) => {
        eval(data)
    
        const client = io(`${config.SERVER_URL}`, {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})
    
        client.on('connect', () => {
            console.log("connected to server")
            //TODO init game
        })
    
        client.on('disconnect', () => {
            console.log("disconnected from server")
        })
    })
})