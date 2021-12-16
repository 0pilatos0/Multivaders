import GameObject from "./GameObject.js"
import Menu from "./Menu.js"
import MultiplayerObject from "./MultiplayerObject.js"
import Vector2 from "./Vector2.js"

export default class Canvas extends Menu{
    #resizeListener = () => { this.resize() }
    #fps = 0

    constructor() {
        super()
        this.remove()
        this.menu = document.createElement('canvas')
        this.ctx = this.menu.getContext('2d')
        this.ctx.imageSmoothingEnabled = false
        this.resize()
        window.requestAnimationFrame(this.update.bind(this))
    }

    resize(){
        let height = window.innerHeight
        let width = height * (16 / 9)
        if(width > window.innerWidth){
            width = window.innerWidth
            height = width * (9 / 16)
        }

        this.scale = Math.max(height / 1080, width / 1920)
        
        this.menu.width = width
        this.menu.height = height
    }

    get size(){
        return new Vector2(window.innerWidth, window.innerHeight)
    }

    clear(){
        if(!this.ctx) return
        this.ctx.fillStyle = "#000"
        this.ctx.clearRect(0, 0, this.size.x, this.size.y)
        this.ctx.fillRect(0, 0, this.size.x, this.size.y)
    }

    add(){
        super.add()
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
        // this.ctx.strokeStyle = "#fff"
        // this.ctx.beginPath()
        // this.ctx.moveTo(this.size.x / 2, 0)
        // this.ctx.lineTo(this.size.x / 2, this.size.y)
        // this.ctx.stroke()
        // GameObject.GameObjects.map(gameObject => {
        //     gameObject.draw(this.ctx, this.scale)
        // })
        MultiplayerObject.MultiplayerObjects.map(gameObject => {
            gameObject.draw(this.ctx, this.scale)
        })
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