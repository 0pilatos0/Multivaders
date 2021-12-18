import GameWindow from "./GameWindow.js"
import Menu from "./Menu.js"
import MultiplayerObject from "./MultiplayerObject.js"
import Vector2 from "./Vector2.js"

export default class Canvas extends Menu{
    #mainWindow
    #opponentWindow
    #resizeListener = () => { this.resize() }
    #fps = 0
    #serverSize = new Vector2(0, 0)

    constructor() {
        super()
        this.remove()
        this.menu = document.createElement('canvas')
        this.ctx = this.menu.getContext('2d')
        this.ctx.imageSmoothingEnabled = false
        this.resize()
        window.client.on('size', (size) => {
            this.#serverSize = size
            this.resize()
        })
        window.requestAnimationFrame(this.update.bind(this))
    }

    resize(){
        //TODO make this a PVP type canvas

        let width = window.innerWidth
        let height = window.innerHeight

        let gameWidth = width / 2
        let gameHeight = gameWidth * (8 / 7)

        if(gameHeight > window.innerHeight){
            gameHeight = height
            gameWidth = gameHeight * (7 / 8)
        }

        let offsetX = 0

        if(window.innerWidth !== gameWidth * 2){
            offsetX = (window.innerWidth - gameWidth * 2) / 4
        }

        this.menu.width = width
        this.menu.height = height

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.#mainWindow = new GameWindow(new Vector2(offsetX, 0), new Vector2(this.gameWidth, this.gameHeight))
        this.#opponentWindow = new GameWindow(new Vector2(this.size.x / 2 + offsetX, 0), new Vector2(this.gameWidth, this.gameHeight))

        this.scale = Math.min(gameHeight / this.#serverSize.y, gameWidth / this.#serverSize.x)
    }

    get size(){
        return new Vector2(this.menu.width, this.menu.height)
    }

    clear(){
        if(!this.ctx) return
        this.ctx.fillStyle = "#000"
        this.ctx.clearRect(0, 0, this.size.x, this.size.y)
        this.ctx.fillRect(0, 0, this.size.x, this.size.y)
    }

    add(){
        super.add()
        this.resize()
        this.clear()
        window.addEventListener('resize', this.#resizeListener)
    }

    remove(){
        super.remove()
        this.clear()
        window.removeEventListener('resize', this.#resizeListener)
    }

    update(){
        const t0 = Date.now()
        window.requestAnimationFrame(this.update.bind(this))
        if(!this.visible) return
        this.clear()
        this.ctx.fillStyle = "#fff"
        this.ctx.strokeStyle = "#fff"
        this.#mainWindow.gameObjects = []
        this.#opponentWindow.gameObjects = []
        MultiplayerObject.MultiplayerObjects.map(gameObject => {
            if(gameObject.own == true){
                this.#mainWindow.gameObjects.push(gameObject)
            }
            else{
                this.#opponentWindow.gameObjects.push(gameObject)
            }
        })
        this.#mainWindow.draw(this.ctx, this.scale)
        this.#opponentWindow.draw(this.ctx, this.scale)
        this.#mainWindow.update()
        this.#opponentWindow.update()
        const t1 = Date.now()
        let deltaTime = (t1 - t0) / 1000
        let fps = Math.round(1 / deltaTime)
        if(fps != Infinity) {
            this.#fps = Math.round(1 / deltaTime)
        }
        else{
            fps = this.#fps
        }
        this.ctx.font = "20px Gunplay"
        this.ctx.fillText(`${fps} FPS`, 0, 15)
    }
}