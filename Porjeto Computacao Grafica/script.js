
// PEGAR CANVAS
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// VARIÁVEIS
let robotX = 400
let robotY = 300
let angle = 0


// LOOP
function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //AQUI O ROBÔ ENTRA
    ctx.save()
    ctx.translate(robotX, robotY)
    ctx.rotate(angle)

    drawRobot()

    ctx.restore()

    angle += 0.02

    requestAnimationFrame(draw)
}

// ROBÔ (TEMPORÁRIO)
function drawRobot() {
    drawBody()
    drawHead()
    drawArm(-45)   // braço esquerdo
    drawArm(45)    // braço direito
    drawLeg(-15)   // perna esquerda
    drawLeg(15)    // perna direita
}

function drawBody() {
    ctx.fillStyle = "gray"
    ctx.fillRect(-25, -50, 50, 100)
}

function drawHead() {
    ctx.fillStyle = "white"
    ctx.fillRect(-20, -100, 40, 40)

    // olhos
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.arc(-8, -80, 4, 0, Math.PI * 2)
    ctx.arc(8, -80, 4, 0, Math.PI * 2)
    ctx.fill()
}

function drawArm(x) {
    ctx.fillStyle = "silver"
    ctx.fillRect(x, -40, 20, 60)

    drawForearm(x)
}

function drawForearm(x) {
    ctx.fillStyle = "darkgray"
    ctx.fillRect(x, 20, 20, 40)
}

function drawLeg(x) {
    ctx.fillStyle = "silver"
    ctx.fillRect(x, 50, 15, 50)
}


// INICIAR
draw()
