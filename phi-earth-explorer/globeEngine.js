const container = document.getElementById("globeContainer")

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
)

let renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(window.innerWidth,window.innerHeight)

container.appendChild(renderer.domElement)

let geometry = new THREE.SphereGeometry(5,64,64)

let texture = new THREE.TextureLoader().load("assets/earth_day.jpg")

let material = new THREE.MeshPhongMaterial({map:texture})

let earth = new THREE.Mesh(geometry,material)

scene.add(earth)

let light = new THREE.PointLight(0xffffff,1)

light.position.set(10,10,10)

scene.add(light)

camera.position.z=12

function animate(){

requestAnimationFrame(animate)

earth.rotation.y+=0.0007

renderer.render(scene,camera)

}

animate()
