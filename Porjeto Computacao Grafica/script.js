
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
    // corpo
    ctx.fillStyle = "gray"
    ctx.fillRect(-25, -50, 50, 100)

    // cabeça
    ctx.fillStyle = "white"
    ctx.fillRect(-20, -90, 40, 40)

    // braço esquerdo
    ctx.fillRect(-50, -40, 20, 60)

    // braço direito
    ctx.fillRect(30, -40, 20, 60)
}
// INICIAR
draw()