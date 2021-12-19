import HTMLLoader from "../../Core/Loaders/HTMLLoader.js"
import Menu from "../../Core/Menu.js"

export default class LobbiesMenu extends Menu{
    constructor() {
        super()
        HTMLLoader.Load("Elements/LobbiesMenu/index.html").then(html => {
            // this.menu.insertAdjacentHTML('beforeend', html)
            this.menu.innerHTML += html
            // eval(html)
        })
    }
}