// Register Canvas as an element
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
ctx.canvas.width = 500
ctx.canvas.height = 500
const cDim = {
    'x-center' : canvas.width/2,
    'y-center' : canvas.height/2 
}

const updateCanvas = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
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
                break;
            case ('down'):
                this.y += this.speed
                break;
            case ('left'):
                this.x -= this.speed
                break;
            case ('right'):
                this.x += this.speed
                break;
        }
        updateCanvas()
    }

    spawn(){
        ctx.fillStyle = 'black'
        ctx.fillRect(player.x,player.y,10,10)
    }
}
const player = new Character()


window.onload = () => player.spawn()

// Set up Player controls
const playerControl = (key) => {
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

    switch (key.key) {
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