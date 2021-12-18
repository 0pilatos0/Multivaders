import GameObject from "./GameObject.js"
import GameWindow from "./GameWindow.js"
import Menu from "./Menu.js"
import MultiplayerObject from "./MultiplayerObject.js"
import Vector2 from "./Vector2.js"

export default class Canvas extends Menu{
    #mainWindow
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
        let width = window.innerWidth
        let height = window.innerHeight

        let gameWidth = width - 200
        let gameHeight = gameWidth * (8 / 7)

        if(gameHeight > gameWidth){
            gameHeight = height - 400
            gameWidth = gameHeight * (7 / 8)
        }

        this.menu.width = width
        this.menu.height = height

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.#mainWindow = new GameWindow(new Vector2(this.size.x / 2 - this.gameWidth / 2, this.size.y / 2 - this.gameHeight / 2), new Vector2(this.gameWidth, this.gameHeight))

        this.scale = Math.max(gameHeight / this.#serverSize.y, gameWidth / this.#serverSize.x)
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
        window.requestAnimationFrame(this.update.bind(this))
        const t0 = performance.now()
        if(!this.visible) return
        this.clear()
        this.ctx.fillStyle = "#fff"
        this.ctx.strokeStyle = "#fff"
        this.#mainWindow.draw(this.ctx, this.scale)
        // GameObject.GameObjects.map(gameObject => {
        //     gameObject.draw(this.ctx, this.scale)
        // })
        // MultiplayerObject.MultiplayerObjects.map(gameObject => {
        //     gameObject.draw(this.ctx, this.scale)
        // })
        const t1 = performance.now()
        let deltaTime = (t1 - t0)
        let fps = Math.round(10/deltaTime)
        if(fps != Infinity) {
            this.#fps = Math.round(10 / deltaTime)
        }
        else{
            fps = this.#fps
        }
        this.ctx.font = "20px Gunplay"
        this.ctx.fillText(`${fps} FPS`, 0, 15)
    }
}