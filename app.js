// Register Canvas as an element
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
ctx.canvas.width = 500
ctx.canvas.height = 500

const updateCanvas = () => {
    // clears canvas
    ctx.clearRect(0,0, canvas.width, canvas.height)

    // draws and updates player position
    ctx.fillStyle = 'black'
    ctx.fillRect(player.x,player.y,10,10)
}

// set up a class for player object
class Character {
    constructor(x=(canvas.width/2), y=(canvas.height/2)){
        this.x = x
        this.y = y
        this.speed = 10
    }
    
    move(dir){
        switch(dir){
            case ('up'):
                this.y -= this.speed
                if (this.y < 1) this.y = canvas.height - this.speed
                break;
            case ('down'):
                this.y += this.speed
                if (this.y > canvas.height - 1) this.y = 0 
                break;
            case ('left'):
                this.x -= this.speed
                if (this.x < 1) this.x = canvas.width - this.speed
                break;
            case ('right'):
                this.x += this.speed
                if (this.x > canvas.width - 1) this.x = 0 
                break;
        }
    }

    spawn(){
        ctx.fillStyle = 'black'
        ctx.fillRect(player.x,player.y,10,10)
    }
}
const player = new Character()


window.onload = () => player.spawn()

// Set up Player controls
const playerControl = (event) => {
    const controls = {
        'up' : 'ArrowUp',
        'upAlt': 'w',
        'down' : 'ArrowDown',
        'downAlt': 's',
        'left': 'ArrowLeft',
        'leftAlt': 'a',
        'right': 'ArrowRight',
        'rightAlt': 'd'

    }

    switch (event.key) {
        case (controls.up):
        case (controls.upAlt):
            player.move('up')
            break;
        case (controls.down):
        case (controls.downAlt):
            player.move('down')
            break;
        case (controls.left):
        case (controls.leftAlt):
            player.move('left')
            break;
        case (controls.right):
        case (controls.rightAlt):
            player.move('right')
            break;
        default:
            break;
    }
}

// event listeners & game logic
document.addEventListener('keydown', playerControl)
setInterval(updateCanvas, 100/30)