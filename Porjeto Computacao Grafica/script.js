let mouseX = 0
let mouseY = 0

canvas.addEventListener("mousemove", (e)=>{
    mouseX = e.offsetX
    mouseY = e.offsetY
})

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const mapWidth = canvas.width
const mapHeight = canvas.height

const ROBOT_WIDTH = 60
const ROBOT_HEIGHT = 150

let robotX = 400
let robotY = 300

let velocityY = 0
const gravity = 0.35
const jumpForce = -8
let onGround = false

let keys = {}

let magnetX = 200
let magnetY = 420
let magnetAngle = 0

let walkTime = 0
let smokeOffset = 0

document.addEventListener("keydown",(e)=>{
keys[e.key.toLowerCase()] = true
})

document.addEventListener("keyup",(e)=>{
keys[e.key.toLowerCase()] = false
})

function clamp(v,min,max){
return Math.max(min,Math.min(max,v))
}

function updateMovement(){

const speed = 3
let moving = false

if(keys["a"]){
robotX -= speed
moving = true
}

if(keys["d"]){
robotX += speed
moving = true
}

if(keys["w"] && onGround){
velocityY = jumpForce
onGround = false
}

if(moving){
walkTime += 0.15
}

velocityY += gravity
robotY += velocityY

const ground = 480

if(robotY + ROBOT_HEIGHT/2 > ground){
robotY = ground - ROBOT_HEIGHT/2
velocityY = 0
onGround = true
}

robotX = clamp(robotX,ROBOT_WIDTH/2,mapWidth-ROBOT_WIDTH/2)

}

function updateMagnet(){

let dx = magnetX - robotX
let dy = magnetY - robotY

let dist = Math.sqrt(dx*dx + dy*dy)

const fearDistance = 140

if(dist < fearDistance){

let force = 2.5
magnetX += (dx/dist)*force
magnetY += (dy/dist)*force

}else{

let pull = 0.4
magnetX -= (dx/dist)*pull
magnetY -= (dy/dist)*pull

}

magnetX = clamp(magnetX,40,mapWidth-40)
magnetY = clamp(magnetY,300,mapHeight-40)

}

function drawApocalypseSky(){

ctx.fillStyle="rgba(120,20,20,0.25)"

ctx.beginPath()
ctx.arc(200,120,90,0,Math.PI*2)
ctx.arc(280,150,80,0,Math.PI*2)
ctx.arc(350,110,70,0,Math.PI*2)
ctx.fill()

ctx.beginPath()
ctx.arc(600,100,100,0,Math.PI*2)
ctx.arc(700,130,90,0,Math.PI*2)
ctx.fill()

ctx.fillStyle="rgba(255,120,0,0.15)"

ctx.beginPath()
ctx.arc(500,200,70,0,Math.PI*2)
ctx.fill()

ctx.beginPath()
ctx.arc(150,180,60,0,Math.PI*2)
ctx.fill()

ctx.strokeStyle="orange"
ctx.lineWidth=2

ctx.beginPath()
ctx.moveTo(100,50)
ctx.lineTo(150,80)

ctx.moveTo(400,30)
ctx.lineTo(450,70)

ctx.moveTo(700,60)
ctx.lineTo(740,90)

ctx.stroke()

}

function drawSmoke(x,y){

ctx.fillStyle="rgba(150,150,150,0.25)"

ctx.beginPath()
ctx.arc(x,y-smokeOffset,18,0,Math.PI*2)
ctx.arc(x+5,y-30-smokeOffset,22,0,Math.PI*2)
ctx.arc(x+10,y-60-smokeOffset,26,0,Math.PI*2)
ctx.fill()

}

function drawLamp(x){

ctx.fillStyle="#444"
ctx.fillRect(x,400,6,80)

ctx.fillStyle="#222"
ctx.fillRect(x-10,380,26,20)

ctx.fillStyle = Math.random()>0.96 ? "#ffff99" : "#444"
ctx.fillRect(x-6,382,18,10)

}

function drawCar(x){

ctx.fillStyle="#3b3b3b"
ctx.fillRect(x,500,80,30)

ctx.fillStyle="#222"
ctx.fillRect(x+10,485,50,20)

ctx.fillStyle="#000"
ctx.beginPath()
ctx.arc(x+15,532,8,0,Math.PI*2)
ctx.arc(x+65,532,8,0,Math.PI*2)
ctx.fill()

}

function drawRoad(){

ctx.fillStyle="#2b2b2b"
ctx.fillRect(0,480,mapWidth,120)

for(let i=0;i<mapWidth;i+=40){
ctx.fillStyle="#303030"
ctx.fillRect(i,480,20,120)
}

ctx.strokeStyle="#d4ac0d"
ctx.lineWidth=4
ctx.setLineDash([20,20])

ctx.beginPath()
ctx.moveTo(0,540)
ctx.lineTo(mapWidth,540)
ctx.stroke()

ctx.setLineDash([])

}

function drawBackground(){

let sky = ctx.createLinearGradient(0,0,0,600)
sky.addColorStop(0,"#1a1a1a")
sky.addColorStop(1,"#000")

ctx.fillStyle = sky
ctx.fillRect(0,0,mapWidth,mapHeight)

drawApocalypseSky()

ctx.fillStyle="#111"

ctx.fillRect(50,220,120,260)
ctx.fillRect(200,250,150,230)
ctx.fillRect(420,230,120,250)
ctx.fillRect(620,260,140,220)

for(let i=0;i<8;i++){

ctx.fillStyle = Math.random()>0.92 ? "#ffaa00" : "#332200"

ctx.fillRect(70,240+i*25,10,12)
ctx.fillRect(90,240+i*25,10,12)

ctx.fillRect(230,270+i*25,10,12)
ctx.fillRect(250,270+i*25,10,12)

ctx.fillRect(450,250+i*25,10,12)
ctx.fillRect(470,250+i*25,10,12)

}

for(let i=0;i<6;i++){

ctx.fillStyle = Math.random()>0.92 ? "#ffaa00" : "#332200"

ctx.fillRect(650,280+i*25,10,12)
ctx.fillRect(670,280+i*25,10,12)

}

ctx.fillStyle="#222"
ctx.fillRect(120,180,25,40)
ctx.fillRect(500,170,25,50)

drawSmoke(130,180)
drawSmoke(510,170)

drawRoad()

drawLamp(120)
drawLamp(320)
drawLamp(520)
drawLamp(720)

drawCar(250)
drawCar(600)

}

function drawMagnet(){

ctx.save()

ctx.translate(magnetX,magnetY)
ctx.rotate(magnetAngle)

ctx.lineWidth=16
ctx.strokeStyle="#c0392b"

ctx.beginPath()
ctx.arc(0,0,35,Math.PI,0)
ctx.stroke()

ctx.lineWidth=10
ctx.strokeStyle="#ecf0f1"

ctx.beginPath()
ctx.moveTo(-35,0)
ctx.lineTo(-35,18)

ctx.moveTo(35,0)
ctx.lineTo(35,18)
ctx.stroke()

ctx.fillStyle="white"
ctx.font="14px Arial"
ctx.fillText("N",-42,-5)
ctx.fillText("S",32,-5)

ctx.restore()

}

function drawRobot(){

drawBody()
drawHead()

drawArm(-50)
drawArm(30)

drawLeg(-15,"left")
drawLeg(5,"right")

}

function drawHead(){

    let dx = mouseX - robotX
    let dy = mouseY - robotY
    let ang = Math.atan2(dy, dx) * 0.3

    ctx.save()

    ctx.translate(0, -80)
    ctx.rotate(ang)
    ctx.translate(0, 80)

    ctx.fillStyle="#bdc3c7"
    ctx.fillRect(-24,-100,48,40)

    ctx.fillStyle="#00e5ff"
    ctx.fillRect(-16,-88,32,14)

    ctx.strokeStyle="black"
    ctx.beginPath()
    ctx.moveTo(0,-100)
    ctx.lineTo(0,-120)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(0,-122,4,0,Math.PI*2)
    ctx.fill()

    ctx.restore()
}

function drawBody(){

ctx.fillStyle="#7f8c8d"
ctx.fillRect(-30,-50,60,100)

ctx.fillStyle="#2c3e50"
ctx.fillRect(-15,-25,30,50)

ctx.fillStyle="#00e5ff"
ctx.fillRect(-8,-10,16,6)

ctx.fillStyle="#e74c3c"
ctx.fillRect(-8,5,16,6)

drawBolt(-22,-45)
drawBolt(22,-45)
drawBolt(-22,45)
drawBolt(22,45)

}

function drawArm(x){

    let dx = mouseX - robotX
    let dy = mouseY - robotY
    let ang = Math.atan2(dy, dx)

    ctx.save()
    ctx.translate(x+10,-40)
    ctx.rotate(ang)

    ctx.fillStyle="#95a5a6"
    ctx.fillRect(0,0,20,40)

    ctx.translate(20,40)

    ctx.rotate(Math.sin(walkTime)*0.5)

    ctx.fillStyle="#7f8c8d"
    ctx.fillRect(0,0,18,30)

    ctx.fillStyle="#2c3e50"
    ctx.fillRect(-2,30,22,8)

    ctx.restore()
}

function drawLeg(x,side){

let swing=Math.sin(walkTime)*10
if(side==="right") swing=-swing

ctx.save()

ctx.translate(x,50)
ctx.rotate(swing*Math.PI/180)

ctx.fillStyle="#95a5a6"
ctx.fillRect(-7,0,15,45)

ctx.fillStyle="#2c3e50"
ctx.fillRect(-12,45,25,10)

ctx.restore()

}

function drawBolt(x,y){

ctx.fillStyle="#2c3e50"

ctx.beginPath()
ctx.arc(x,y,3,0,Math.PI*2)
ctx.fill()

}

function draw(){

ctx.setTransform(1,0,0,1,0,0)
ctx.clearRect(0,0,mapWidth,mapHeight)

let zoom = 1.1

ctx.setTransform(
    zoom, 0,
    0, zoom,
    mapWidth/2 - robotX*zoom,
    mapHeight/2 - robotY*zoom
)

smokeOffset += 0.4
if(smokeOffset > 80) smokeOffset = 0

drawBackground()

ctx.save()

ctx.translate(robotX, 480)
ctx.scale(1.2, 0.3)

ctx.fillStyle="rgba(0,0,0,0.3)"
ctx.beginPath()
ctx.arc(0,0,40,0,Math.PI*2)
ctx.fill()

ctx.restore()

updateMovement()
updateMagnet()

ctx.save()

ctx.translate(robotX,robotY)

let bounce = 1 + Math.sin(walkTime)*0.04
ctx.scale(bounce,1/bounce)

drawRobot()

ctx.restore()

drawMagnet()

function drawMagnet(){

    ctx.save()

    ctx.translate(magnetX,magnetY)
    ctx.rotate(magnetAngle)

    for(let i=0;i<4;i++){
        ctx.beginPath()
        ctx.arc(0,0,45 + i*12 + Math.sin(walkTime+i)*5,0,Math.PI*2)
        ctx.strokeStyle="rgba(0,200,255,0.2)"
        ctx.lineWidth = 2
        ctx.stroke()
    }

    ctx.lineWidth=16
    ctx.strokeStyle="#c0392b"

    ctx.beginPath()
    ctx.arc(0,0,35,Math.PI,0)
    ctx.stroke()

    ctx.lineWidth=10
    ctx.strokeStyle="#ecf0f1"

    ctx.beginPath()
    ctx.moveTo(-35,0)
    ctx.lineTo(-35,18)

    ctx.moveTo(35,0)
    ctx.lineTo(35,18)
    ctx.stroke()

    ctx.fillStyle="white"
    ctx.font="14px Arial"
    ctx.fillText("N",-42,-5)
    ctx.fillText("S",32,-5)

    ctx.restore()
}

magnetAngle += 0.03

requestAnimationFrame(draw)

}

draw()
