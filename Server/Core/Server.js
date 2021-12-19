require('dotenv').config()
const http = require('http')
const io = require('socket.io')
const HandlePlayer = require('../Handlers/PlayerHandler')
const Logger = require('../Core/Logger')

global.clients = {}

module.exports = class Server{
    #http = http.createServer()
    #io = io().attach(this.#http, {
        // pingInterval: 60000,
        // pingTimeout: 60000,
        cookie: false,
        cors: {
            origin: '*'
        }
    })

    constructor() {
        this.#http.listen(process.env.PORT, () => {
            console.log(`Server listening on http://localhost:${this.#http.address().port}`)
            Logger.Log("Server started", "Server has been started succesful", "no futher actions needed", "3066993")
        })

        this.#io.on('connection', (socket) => {
            Logger.Log("Client connected", `Client has connected succesful using socket id: ${socket.id}`, "no futher actions needed", "12370112")
            console.log(`+${socket.id}`)  
            global.clients[socket.id] = {socket}

            socket.use((packet, next) => {
                //TODO use this as a middleware for security
                //console.log(packet, next)
                next()
            })

            HandlePlayer(socket)

            socket.on('disconnect', () => {
                Logger.Log("Client disconnected", `Client has disconnected succesful using socket id: ${socket.id}`, "no futher actions needed", "9936031")
                console.log(`-${socket.id}`)
                let client = global.clients[socket.id]
                if(client.lobby){
                    client.lobby.leave(client)
                }
                delete global.clients[socket.id]
            })
        })
    }
}