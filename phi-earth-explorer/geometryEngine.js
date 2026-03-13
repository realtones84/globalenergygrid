const phi = 1.6180339887

function distance(a,b){

const R=6371

const dLat=(b.lat-a.lat)*Math.PI/180
const dLng=(b.lng-a.lng)*Math.PI/180

const s1=Math.sin(dLat/2)
const s2=Math.sin(dLng/2)

const c=
s1*s1+
Math.cos(a.lat*Math.PI/180)*
Math.cos(b.lat*Math.PI/180)*
s2*s2

return R*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))

}

function phiIndex(d){

return Math.log(d)/Math.log(phi)

}
