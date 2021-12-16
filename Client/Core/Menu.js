export default class Menu{
    constructor() {
        this.menu = document.createElement('div')
        document.body.appendChild(this.menu)
    }

    show(){
        this.menu.style.display = "block"
    }

    hide(){
        this.menu.style.display = "none"
    }

    remove(){
        this.menu.remove()
    }

    add(){
        document.body.appendChild(this.menu)
    }
}