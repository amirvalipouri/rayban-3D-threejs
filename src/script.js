import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
// import { RGBMLoader } from 'three/examples/jsm/Addons.js'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

let sc = new THREE.Scene()
sc.background = new THREE.Color('#30302f')
let rayban = null;

let gltf = new GLTFLoader()
let draco = new DRACOLoader()
draco.setDecoderPath("/draco/")
gltf.setDRACOLoader(draco)
gltf.load("/models/gltf/rayban.gltf", (model) => {
    sc.add(model.scene)
    //3  0
    rayban = model.scene
    rayban.rotation.y = Math.PI * 2.5
    rayban.children[2].children[0].material.roughness = 0
    // rayban.children[2].children[2].visible=false
})

let aml = new THREE.AmbientLight('#FFFFFF', 1)
let dir = new THREE.DirectionalLight("#FFFFFFF", 1)
dir.position.set(0, 1, 0)
let dir1 = new THREE.DirectionalLight("#FFFFFFF", 1)
dir1.position.set(0, -1, 0)
let dir2 = new THREE.DirectionalLight("#FFFFFFF", 1)
dir2.position.set(1, 0, 0)
let dir3 = new THREE.DirectionalLight("#FFFFFFF", 1)
dir3.position.set(-1, 0, 0)
let dir4 = new THREE.DirectionalLight("#FFFFFFF", 1)
dir4.position.set(0, 0, -1)
sc.add(aml, dir, dir1, dir2, dir3, dir4)

let materialChange = {
    dasteRynak: "#0f8cfa",
    frame: "#f54251",
    shishe: "#d6f50c"
}
let gui = new GUI({
    title: "menu",
    width: 300
})
gui.addColor(materialChange, "dasteRynak").onChange(() => {
    rayban.children[0].children[1].material.color.set(materialChange.dasteRynak)
})
gui.addColor(materialChange, "frame").onChange(() => {
    rayban.children[2].children[0].material.color.set(materialChange.frame)
})
gui.addColor(materialChange, "shishe").onChange(() => {
    rayban.children[3].material.color.set(materialChange.shishe)
})

let size = {
    width: window.innerWidth,
    height: window.innerHeight
}

let camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 5
sc.add(camera)

window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})

let canvas = document.querySelector('.web')

let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
})



renderer.setSize(size.width, size.height)

let orbit = new OrbitControls(camera, canvas)
orbit.enableDamping = true
orbit.minDistance = 1
orbit.maxDistance = 5

const clock = new THREE.Clock()
let animation = () => {
    orbit.update()
    const elapstime = clock.getElapsedTime()
    if (rayban) {
        rayban.rotation.y = elapstime * 0.5
    }
    renderer.render(sc, camera)
    window.requestAnimationFrame(animation)
}
animation()