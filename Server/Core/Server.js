require('dotenv').config()
const http = require('http')
const io = require('socket.io')
const HandlePlayer = require('../Handlers/PlayerHandler')

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
        })

        this.#io.on('connection', (socket) => {
            console.log(`+${socket.id}`)  
            global.clients[socket.id] = {socket}

            socket.use((packet, next) => {
                //TODO use this as a middleware for security
                //console.log(packet, next)
                next()
            })

            HandlePlayer(socket)

            socket.on('disconnect', () => {
                console.log(`-${socket.id}`)
                delete global.clients[socket.id]
            })
        })
    }
}