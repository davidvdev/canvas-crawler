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
    // establish shorthand for mover dimensions
    const md = {
        x : mover.x,
        xM : mover.x + mover.size,
        y : mover.y,
        yM : mover.y - mover.size
    }
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
        if ((md.x >= od.x && od.xM >= md.x ) || (md.y <= od.y && od.yM <= md.y)){
            collision = true
            console.log('md: ', md)
            console.log('od: ', od)
            return collision
        }

        // when is a collision true (point by point)
        /*  moving up
            (md.x >= od.x && od.xM >= md.x ) ||  (md.y <= od.y && od.yM <= md.y)
        */



        // then check for collision on y-axis
        // if ((md.yM < od.y) || (md.y > od.yM)) {
        //     collision = false
        // }
        // condition to break the loop early in case of a non-collision
        // if (collision === false) return
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
        switch(dir){
            // case (direction):
            //  CHECK for collision
            //  coord change adjusted by speed
            //  CHECK for edge of map
            case ('up'):
                if (!checkCollision(this)){
                    this.y -= this.speed
                } else {
                    console.log('bump')
                }
                if (this.y < this.size) {
                    this.y = canvas.height - this.size
                    genLevel()
                }
                break;
            case ('down'):
                this.y += this.speed
                if (this.y > canvas.height - this.size) {
                    this.y = 0 
                    genLevel()
                }
                break;
            case ('left'):
                this.x -= this.speed
                if (this.x < this.size) {
                    this.x = canvas.width - this.size
                    genLevel()
                }
                break;
            case ('right'):
                this.x += this.speed
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