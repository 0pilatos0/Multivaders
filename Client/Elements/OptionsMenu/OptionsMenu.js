import HTMLLoader from "../../Core/Loaders/HTMLLoader.js";
import Menu from "../../Core/Menu.js";

export default class OptionsMenu extends Menu{
    constructor() {
        super()
        HTMLLoader.Load("Elements/OptionsMenu/index.html").then(html => {
            // this.menu.insertAdjacentElement("beforeend", html)
            this.menu.innerHTML += html
            super.hide()
            this.menuHolder = document.getElementById('options-menu') 
            this.controlsButton = document.getElementById('controls')
            this.keyMappingButton = document.getElementById('key-mapping')
            this.videoButton = document.getElementById('video')
            this.graphicsButton = document.getElementById('graphics')
            this.audioButton = document.getElementById('audio')
            this.backButton = document.getElementById('back')

            this.currentMenuActive = this.controlsButton
            this.currentMenuActive.classList.add('active')

            this.controlsButton.addEventListener('click', () => {
                this.currentMenuActive.classList.remove('active')
                this.currentMenuActive = this.controlsButton
                this.currentMenuActive.classList.add('active')
            })

            this.keyMappingButton.addEventListener('click', () => {
                this.currentMenuActive.classList.remove('active')
                this.currentMenuActive = this.keyMappingButton
                this.currentMenuActive.classList.add('active')
            })

            this.videoButton.addEventListener('click', () => {
                this.currentMenuActive.classList.remove('active')
                this.currentMenuActive = this.videoButton
                this.currentMenuActive.classList.add('active')
            })

            this.graphicsButton.addEventListener('click', () => {
                this.currentMenuActive.classList.remove('active')
                this.currentMenuActive = this.graphicsButton
                this.currentMenuActive.classList.add('active')
            })

            this.audioButton.addEventListener('click', () => {
                this.currentMenuActive.classList.remove('active')
                this.currentMenuActive = this.audioButton
                this.currentMenuActive.classList.add('active')
            })

            this.backButton.addEventListener('click', () => {
                this.hide()
                window.mainMenu.show()
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