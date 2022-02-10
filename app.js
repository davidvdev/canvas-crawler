// Register Canvas as an element
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
const cDim = {
    'x-center' : canvas.width/2,
    'y-center' : canvas.height/2 
}

// set up a class for player object
class Character {
    constructor(x=cDim["x-center"], y=cDim["y-center"]){
        this.x = x
        this.y = y
        this.speed = 1
    }

    move(dir){
        switch(dir){
            case ('up'):
                this.y -= this.speed
                updateCanvas({src: 'player', x: this.x, y:this.y})
                break;
            case ('down'):
                this.y += this.speed
                updateCanvas({src: 'player', x: this.x, y:this.y})
                break;
            case ('left'):
                this.x -= this.speed
                updateCanvas({src: 'plaxer', x: this.x, y:this.y})
                break;
            case ('right'):
                this.x += this.speed
                updateCanvas({src: 'player', x: this.x, y:this.y})
                break;
        }
    }

    spawn(){
        ctx.fillStyle = 'black'
        ctx.fillRect(player.x,10,player.y,10)
    }
}

const player = new Character()
player.spawn()

const updateCanvas = (updates) => {
    ctx.fillStyle = 'black'
    switch(updates.src){
        case('player'):
            ctx.fillRect(updates.x, updates.y, 10,10)
    }
    // ctx.fillRect(player.x, player.y, 10,10)
}



ctx.fillStyle = 'black'
ctx.fillRect(player.x, player.y, 10,10)
// ctx.fillRect(5, 5, 0,0)

// Set up Player controls
const playerControl = (key) => {
    switch (key.code) {
        case ('ArrowUp' || 'KeyW'):
            console.log('you move up')
            player.move('up')
            break;
        case ('ArrowDown' || 'KeyS'):
            console.log('you move down')
            break;
        case ('ArrowLeft' || 'KeyA'):
            console.log('you move left')
            break;
        case ('ArrowRight' || 'KeyD'):
            console.log('you move right')
            break;
        default:
            break;
    }
}

// event listeners & game logic
document.addEventListener('keydown', playerControl)