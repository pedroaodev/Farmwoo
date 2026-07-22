export class Joystick {
    constructor (target) {
        this.controller = document.querySelector(target)
        this.indicator = this.controller.querySelector('.range')
        this.dragging = false
        this.start = { x: 0, y: 0 }
        this.lastDir = null
        this.maxDistance = 100
        this.velocity = [0, 'idle']
        this.directions = {
            'top': '.t',
            'left': '.l',
            'right': '.r',
            'bottom': '.b'
        }
    }
    setDirection (x, y) {
        this.direction = null
        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) this.direction = 'left'
            else if (x < 0) this.direction = 'right'
        } else {
            if (y > 0) this.direction = 'top'
            else if (y < 0) this.direction = 'bottom'
        }
        const d = this.directions
        if (this.lastDir && this.lastDir !== this.direction) {
            this.controller.querySelector(d[this.lastDir])?.classList.remove('active')
        }
        if (this.direction) {
            this.controller.querySelector(d[this.direction])?.classList.add('active')
            this.lastDir = this.direction
        }
    }
    startJoystick (e) {
        this.dragging = true
        const point = e.touches ? e.touches[0] : e
        this.start.x = point.clientX
        this.start.y = point.clientY

        // Joystick fixed
        // this.start.x = 130
        // this.start.y = 130

        this.controller.style.left = `${this.start.x}px`
        this.controller.style.top = `${this.start.y}px`
        this.controller.classList.add('show')
    }
    moveJoystick (e) {
        if (!this.dragging) return
        const point = e.touches ? e.touches[0] : e
        let x = this.start.x - point.clientX
        let y = this.start.y - point.clientY
        const distance = Math.sqrt(x * x + y * y)
        if (distance > this.maxDistance) {
            x = (x / distance) * this.maxDistance
            y = (y / distance) * this.maxDistance
        }
        this.indicator.style.transform = `translate(${-x}px, ${-y}px)`
        this.setDirection(x, y)
        if (distance > 5) {
            if (distance > 80) {
                this.velocity = [1, 'run']
                return
            }
            this.velocity = [0.5, 'walk']
            return
        }
        this.velocity = [0, 'idle']
    }
    stopJoystick = () => {
        this.dragging = false
        this.indicator.style.transform = 'translate(0,0)'
        if (this.lastDir) {
            document.querySelector(this.directions[this.lastDir])?.classList.remove('active')
        }
        this.lastDir = null
        this.controller.classList.remove('show')
        this.velocity = [0, 'idle']
    }
    load () {
        document.onmousedown = (e) => this.startJoystick(e)
        document.onmousemove = (e) => this.moveJoystick(e)
        document.onmouseup = (e) => this.stopJoystick(e)
        document.ontouchstart = (e) => this.startJoystick(e)
        document.ontouchmove = (e) => this.moveJoystick(e)
        document.ontouchend = (e) => this.stopJoystick(e)
        // document.addEventListener('mousedown', this.startJoystick)
        // document.addEventListener('mousemove', this.moveJoystick)
        // document.addEventListener('mouseup', this.stopJoystick)
        // document.addEventListener('touchstart', this.startJoystick)
        // document.addEventListener('touchmove', this.moveJoystick)
        // document.addEventListener('touchend', this.stopJoystick)
    }
}

export class ProcessManager {
    constructor () {
        this.process = {}
        const update = () => {
            Object.keys(this.process).forEach((process) => {
                const currentProcess = this.process[process]
                if (typeof currentProcess == 'function') {
                    currentProcess()
                }
            })
            window.requestAnimationFrame(update)
        }
        update()
    }
}

export class Sprite {

}

// export 