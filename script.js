import { Joystick, ProcessManager } from "./lib.js"
class GameFarmwoo {
    constructor() {
        this.joystick = new Joystick('#joystick')
        this.processManager = new ProcessManager
        this.init()
        this.player = {
            position: {
                x: 0,
                y: 0
            },
            speed: 1
        }
        this.limit = [100, 100]
    }
    init () {
        this.fps()
        this.joystick.load()
        this.processManager.process.updateGame = () => {
            if (this.joystick.dragging && this.joystick.direction) {
                let direction = this.joystick.direction
                let velocity = this.joystick.velocity
                let speed = this.player.speed
                let p = this.player.position

                let currentSpeed = velocity[1] == 'run' ? speed : speed / 2

                if (direction == 'left')    p.x -= currentSpeed
                if (direction == 'right')   p.x += currentSpeed
                if (direction == 'top')     p.y -= currentSpeed
                if (direction == 'bottom')  p.y += currentSpeed

                p.x = p.x > 100 ? 100 : p.x < 0 ? 0 : p.x
                p.y = p.y > 100 ? 100 : p.y < 0 ? 0 : p.y
            }
            this.update()
        }
    }
    update () {
        document.querySelector('#player').style.setProperty('--x', this.player.position.x)
        document.querySelector('#player').style.setProperty('--y', this.player.position.y)
    }
    fps () {
        let fps = 0
        let count = true
        let elFps = document.querySelector('#status .fps i')
        setInterval(() => {
            elFps.innerHTML = fps
            count = false
            fps = 0
        }, 1000)
        this.processManager.process.setFps = () => {
            if (count) elFps.innerHTML = fps
            fps += 1
        }
    }
}
addEventListener('DOMContentLoaded', () => {
    window.gm = new GameFarmwoo
})