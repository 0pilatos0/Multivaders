export default class Input{
    static pressedKeys = []
}

window.addEventListener('keydown', (e) => {
    if(!Input.pressedKeys.includes(e.key)){
        Input.pressedKeys.push(e.key)
    }
})

window.addEventListener('keyup', (e) => {
    Input.pressedKeys.splice(Input.pressedKeys.indexOf(e.key), 1)
})