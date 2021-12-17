import HTMLLoader from "../../Core/Loaders/HTMLLoader.js";
import Menu from "../../Core/Menu.js";

export default class MainMenu extends Menu{
    constructor() {
        super()
        HTMLLoader.Load("Elements/MainMenu/index.html").then(html => {
            this.menu.insertAdjacentHTML("beforeend", html)
            super.hide()
            this.menuHolder = document.getElementById('main-menu')

            //play button logic
            this.playButton = document.getElementById('play')
            this.playButton.addEventListener('click', () => {
                this.hide()
                window.canvas.add()
                window.client.emit('join')
            })

            //settings button logic
            this.settingsButton = document.getElementById('options')
            this.settingsButton.addEventListener('click', () => {
                // this.hide()
            })
            
            //credits button logic
            this.creditsButton = document.getElementById('credits')
            this.creditsButton.addEventListener('click', () => {
                // this.hide()
            })

            //exit button logic
            this.exitButton = document.getElementById('exit')
            this.exitButton.addEventListener('click', () => {
                this.hide()
            })


            

        })
    }

    hide(){
        super.hide()
    }

    show(){
        super.show()
    }
}