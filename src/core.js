import { Player, ProcessManager, keymap } from "./lib.js";

class Game {
    constructor () {
        this.pm = new ProcessManager
        this.player = new Player
        this.player.position = {x: 15, y: 20}
        this.init()
    }
    init () {
        document.onkeyup = (e) => this.onkey(e)
        document.onkeydown = (e) => this.onkey(e)
        this.pm.process.keyInspect = () => {
            if (keymap.kN[1]) this.player.position.y -= 1
            if (keymap.kS[1]) this.player.position.y += 1
            if (keymap.kE[1]) this.player.position.x += 1
            if (keymap.kW[1]) this.player.position.x -= 1
            
            let x = this.player.position.x
            let y = this.player.position.y

            this.player.position.x = x > 120 ? 120 : x < 0 ? 0 : x
            this.player.position.y = y > 120 ? 120 : y < 0 ? 0 : y

            this.player.update()
        }
        this.world()
    }
    world () {
        $('#map').append(this.player.element)
    }
    onkey (event) {
        Object.keys(keymap).forEach((key) => {
            const keyUser = event.code.toLowerCase()
            if (keyUser == keymap[key][0]) {
                const mode = event.type == 'keyup'
                keymap[key][1] = mode ? false : true

                if (event.type == 'keydown') {
                    const at = key.charAt(1).toLowerCase()
                    this.player.element.classList.remove(this.player.slotDir)
                    this.player.element.classList.remove('at')
                    this.player.slotDir = at
                }
            }
        })
    }
}

addEventListener('DOMContentLoaded', () => {
    window.world = new Game
})