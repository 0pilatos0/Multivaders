import HTMLLoader from "../../Core/Loaders/HTMLLoader.js";
import Menu from "../../Core/Menu.js";

export default class Loader extends Menu{
    #changeCallback
    #intervalTime = 1000 / 5
    #interval
    constructor(info) {
        super()
        HTMLLoader.Load("Elements/Loader/index.html").then(html => {
            this.menu.insertAdjacentHTML("beforeend", html)

            let infoHolder = document.getElementById('loader-info')

            let text = []

            for (let i = 0; i <= 3; i++) {
                let dots = ""
                for (let x = 0; x < i; x++) {
                    dots += "."
                }
                text.push(info + dots)
            }

            let index = 0

            this.#changeCallback = () => {
                infoHolder.innerText = text[index]
                index++
                if(index == text.length){
                    text.reverse()
                    index = 0
                }
            }
            
            this.#changeCallback()

            this.#interval = setInterval(this.#changeCallback, this.#intervalTime)
        })
    }

    hide(){
        super.hide()
        clearInterval(this.#interval)
    }

    show(){
        super.show()
        this.#interval = setInterval(this.#changeCallback, this.#intervalTime)
    }

    remove(){
        super.remove()
        clearInterval(this.#interval)
    }

    add(){
        super.add()
        this.#interval = setInterval(this.#changeCallback, this.#intervalTime)
    }
}