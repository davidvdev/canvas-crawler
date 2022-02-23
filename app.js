// Register Canvas as an element
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
ctx.canvas.width = 500
ctx.canvas.height = 500

const collidables = []

const updateCanvas = () => {
    // clears canvas
    ctx.clearRect(0,0, canvas.width, canvas.height)

    // draws and updates player position
    ctx.fillStyle = 'black'
    ctx.fillRect(player.x,player.y,player.size,player.size)

    // check the level
    // draw the level elements
    ctx.fillStyle = "green"
    collidables.forEach((obj,index) => {
        index === 0 ? ctx.fillStyle = 'black' : ctx.fillStyle = 'green'
        ctx.fillRect(obj.x,obj.y, obj.size,obj.size)
    })
}

class Obstacle {
    constructor(
        x=Math.floor(Math.random()*canvas.width),
        y=Math.floor(Math.random()*canvas.height),
        size=30)
        {
            this.x = x
            this.y = y
            this.size = size
            collidables.push(this)
    }
}

const genLevel = () => {
    collidables.splice(1,collidables.length - 1)
    const quantity = Math.ceil(Math.random() * 10)
    for (let i = 0; i <= quantity; i++) {
        new Obstacle
    }
}

const checkCollision = (mover) => {
    let collision = false
    const hit = () => {
        collision = true
        return collision
    }
    // establish shorthand for mover dimensions
    const md = {
        x : mover.x,
        xM : mover.x + mover.size,
        y : mover.y,
        yM : mover.y - mover.size
    }
    // establish which objects are in range of mover
    // if the od.x + mover.size * 1.5 && od.y + mover.size * 1.5

    for (let i = 1; i < collidables.length; i++) {
        const obj = collidables[i];
        // establish shorthand for object dimensions
        const od = {
            x : obj.x,
            xM : obj.x + obj.size,
            y : obj.y,
            yM : obj.y - obj.size
        }
        // check for collision on x-axis
        if ( md.x > od.x && md.x < od.xM ){
            hit()
        } else if ( md.xM > od.x && md.xM < od.xM ){
            hit()
        } else if ( md.y > od.yM && md.y < od.y ){
            hit()
        } else if ( md.yM > od.yM && md.yM < od.y ){
            hit()
        } else {
            collision = false
        }
        // when is a collision true (point by point)
        /*  moving up
            // (md.x >= od.x && od.xM >= md.x ) ||  (md.y <= od.y && od.yM <= md.y)
            ( md.x > od.x && md.x < od.xM )
            ( md.xM > od.x && md.xM < od.xM )
            ( md.y > od.yM && md.y < od.y )
            ( md.yM > od.yM && md.yM < od.y )
        */
    }
    console.log(collision)
    return collision
}

// set up a class for player object
class Character {
    constructor(x=(canvas.width/2), y=(canvas.height/2)){
        this.x = x
        this.y = y
        this.size = 30
        this.speed = 1
        collidables.push(this)
    }
    
    move(dir){
        console.log(dir)
        switch(dir){
            // case (direction):
            //  CHECK for collision
            //  coord change adjusted by speed
            //  CHECK for edge of map
            case ('up'):
                if (!checkCollision(this)){
                    this.y -= this.speed
                } else {
                    console.log('up bump')
                }
                if (this.y < this.size) {
                    this.y = canvas.height - this.size
                    genLevel()
                }
                break;
            case ('down'):
                if (!checkCollision(this)){
                    this.y += this.speed
                } else {
                    console.log('down bump')
                }
                if (this.y > canvas.height - this.size) {
                    this.y = 0 
                    genLevel()
                }
                break;
            case ('left'):
                if (!checkCollision(this)){
                    this.x -= this.speed
                } else {
                    console.log('left bump')
                }
                if (this.x < this.size) {
                    this.x = canvas.width - this.size
                    genLevel()
                }
                break;
            case ('right'):
                if (!checkCollision(this)){
                    this.x += this.speed
                } else {
                    console.log('right bump')
                }
                if (this.x > canvas.width - this.size) {
                    this.x = 0
                    genLevel() 
                }
                break;
        }
    }

    spawn(){
        ctx.fillStyle = 'black'
        ctx.fillRect(player.x,player.y,10,10)
    }
}
const player = new Character()
console.log(collidables)


window.onload = () => {
    player.spawn()
    genLevel()
}

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