let overlays = [

"assets/gleason_1892.png",
"assets/piri_reis_1513.png"

]

let currentOverlay = 0

function toggleOverlay(){

currentOverlay++

if(currentOverlay>=overlays.length)
currentOverlay=0

document.body.style.backgroundImage=
"url("+overlays[currentOverlay]+")"

}
