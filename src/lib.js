window.$ = (selector, element, all) => {
    if (!selector) return null
    else {
        const t = all && all == true ? 'querySelectorAll' : 'querySelector'
        if (element && element.querySelector) {
            return element[t](selector)
        } else return document[t](selector)
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

export class Player {
    constructor () {
        this.element = document.createElement('div')
        this.element.id = 'player'
        this.element.innerHTML = `<span class="slot"></span>`
        this.position = { x: 0, y: 0 }
        this.slotDir = 'n'
    }
    update () {
        this.element.style.setProperty('top', this.position.y + 'px')
        this.element.style.setProperty('left', this.position.x + 'px')
        this.element.slot = this.slotDir
    }
}

export const keymap = {
    //  Primary key    Key press
    kG: ['space',      false],
    kN: ['arrowup',    false],
    kS: ['arrowdown',  false],
    kE: ['arrowright', false],
    kW: ['arrowleft',  false],
}