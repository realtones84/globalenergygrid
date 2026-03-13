const canvas=document.getElementById("map")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let scale=1
let offsetX=0
let offsetY=0

let projection="polar"
let showGrid=true
let showPhi=true

function project(lat,lng){

const latRad=lat*Math.PI/180
const lngRad=lng*Math.PI/180

if(projection==="polar"){

const r=(Math.PI/2-latRad)

return{

x:canvas.width/2+r*Math.sin(lngRad)*320*scale+offsetX,
y:canvas.height/2-r*Math.cos(lngRad)*320*scale+offsetY

}

}else{

return{

x:(lng+180)/360*canvas.width*scale+offsetX,
y:(90-lat)/180*canvas.height*scale+offsetY

}

}

}

function drawNodes(){

phiNodes.forEach(n=>{

const p=project(n.lat,n.lng)

ctx.fillStyle="#ffd700"

ctx.beginPath()
ctx.arc(p.x,p.y,6*scale,0,Math.PI*2)
ctx.fill()

ctx.fillStyle="#fff"
ctx.font=`${12*scale}px monospace`
ctx.fillText(n.name,p.x,p.y+14)

})

}

function drawPhiLines(){

for(let i=0;i<phiNodes.length;i++){

for(let j=i+1;j<phiNodes.length;j++){

const d=distance(phiNodes[i],phiNodes[j])

const p=phiRelation(d)

if(Math.abs(p-Math.round(p))<0.1){

const a=project(phiNodes[i].lat,phiNodes[i].lng)
const b=project(phiNodes[j].lat,phiNodes[j].lng)

ctx.strokeStyle="#ffcc0066"

ctx.beginPath()
ctx.moveTo(a.x,a.y)
ctx.lineTo(b.x,b.y)
ctx.stroke()

}

}

}

}

canvas.onclick=async function(e){

const x=e.clientX
const y=e.clientY

for(let n of phiNodes){

const p=project(n.lat,n.lng)

if(Math.hypot(p.x-x,p.y-y)<10){

const data=await loadWiki(n.name)

let html="<b>"+n.name+"</b><br>"

if(data){

html+=data.desc

if(data.image)
html+="<br><img src='"+data.image+"' width=260>"

}

document.getElementById("nodePanel").innerHTML=html

}

}

}

function render(){

ctx.clearRect(0,0,canvas.width,canvas.height)

if(showPhi) drawPhiLines()

drawNodes()

requestAnimationFrame(render)

}

render()

function toggleProjection(){

projection = projection==="polar" ? "globe" : "polar"

}

function toggleGrid(){

showGrid=!showGrid

}

function togglePhi(){

showPhi=!showPhi

}

function exportDataset(){

const data=JSON.stringify(phiNodes,null,2)

const a=document.createElement("a")

a.href="data:text/json;charset=utf-8,"+encodeURIComponent(data)

a.download="phi_nodes.json"

a.click()

}
