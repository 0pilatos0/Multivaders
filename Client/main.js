// const client = io()
import JSONLoader from "./Core/Loaders/JSONLoader.js";

JSONLoader.Load("config.json").then(config => {
    const client = io(config.SERVER_URL, {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

    client.on('connect', () => {
        console.log("connected to server")
        //TODO init game
    })

    client.on('disconnect', () => {
        console.log("disconnected from server")
    })
})