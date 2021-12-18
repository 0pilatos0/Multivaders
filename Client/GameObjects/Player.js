import MultiplayerObject from "../Core/MultiplayerObject.js";
import Input from "../Core/Input.js";

export default class Player extends MultiplayerObject{
    #move
    
    constructor(position, size, sprite, move) {
        super(position, size, sprite, move)
        this.#move = move
    }

    update(){
        super.update()
        if(this.#move){
            let movement = {}
            // if(Input.Pressed("w")){
            //     movement["w"] = true
            // }
            if(Input.Pressed("a")){
                movement["a"] = true
            }
            // if(Input.Pressed("s")){
            //     movement["s"] = true
            // }
            if(Input.Pressed("d")){
                movement["d"] = true
            }
            if(Input.Pressed(" ")){
                movement[" "] = true
            }
            if(Object.keys(movement).length > 0){
                window.client.emit("movement", movement)
            }
        }
    }
}