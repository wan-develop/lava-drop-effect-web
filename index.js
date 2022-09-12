
// HEADER LETTERS SEPARATOR
const titleText = Array.from("Lava Drop Effect")
const headerText = document.querySelector("#header-text")


titleText.forEach( char => {
    let span = document.createElement("span")
    span.classList.add("animated-char")
    span.innerText = char

    headerText.append(span)

})

// DROP EFFECT WITH CANVAS
const canvas = document.querySelector("#canvas1")
const ctx = canvas.getContext("2d")

const random = (min,max)=>Math.round(Math.random()*(min+max)+min)





//set the canvas width/height to window's
canvas.width = window.innerWidth
canvas.height = window.innerHeight


class Ball {

    constructor(x, y) {

        this.minRadius = 10
        this.maxRadius = 15

        this.x = x
        this.y = y
        this.radius = random(this.minRadius, this.maxRadius)
        this.color = "hsl(35deg, 50%, 50%)"
        
        this.vel = random(6, 12) / (this.radius / 2)

        this.sinX = 0
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        ctx.fill()
    }

    update() {
        
        this.y += this.vel

        // using Math.sin() to reproduce a smooth horizontal movement
        this.x += Math.sin(this.sinX * 4000)
        this.sinX += random( 20, 100)

        if (this.sinX > 4000) this.sinX = 0

        if( this.y >= random(0, (canvas.height / 2))) {
            this.vel *= 1.04
        }

    }
}

class Screen {

    /* Screen is the area where all
       objects is rendered */
    constructor() {
        this.balls = []
        this.timeLapsed = 0
    }

    //creates a ball in random screen x/y
    createBall() {
        this.balls.push(
            new Ball( random(-100,canvas.width), 0)
        )
    }

    update(){
        
        this.timeLapsed = this.timeLapsed < 5 ? this.timeLapsed : 0
        this.timeLapsed += 1

        if( this.timeLapsed === 2) this.createBall();

        this.balls = this.balls.filter( ball => ball.y < canvas.height + ball.radius)

        this.balls.forEach( ball => ball.update())

    }
    draw() {
        this.balls.forEach( ball => ball.draw())
    }
    

}
const screen = new Screen()

function animate() {

    //Alpha creates an effect of trail
    ctx.fillStyle = "rgba(10, 10 ,10, 0.05)" 
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    

    screen.update()
    screen.draw()

    requestAnimationFrame(animate)
}

animate()

//keep the canvas responsive
window.addEventListener( "resize", ()=>{

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

})
