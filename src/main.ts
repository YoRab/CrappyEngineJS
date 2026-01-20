import Camera from './Camera'
import Mesh from './model/Mesh'
import Renderer from './Renderer'
import { cubeVertices, cubeFaces } from './vertices/cube'
import crappyLogo from '/vite.svg'
import './style.css'
import Vec3 from './model/Vec3'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1><img src="${crappyLogo}" class="logo" alt="Logo de CrappyEngineJs" />CrappyEngineJs</h1>
    <p class="subtitle">
      Crappy engine is a 3D engine built with vanilla JavaScript. It is an experiment with no purpose and no future.
    </p>
    <div class="canvas-container">
      <canvas class="canvas" width="1280" height="720"></canvas>
    </div>
`
const canvas = document.querySelector<HTMLCanvasElement>('.canvas')!

const renderer = new Renderer(canvas)
const camera = new Camera()
const cube = new Mesh(cubeVertices, cubeFaces)

const loop = () => {
  renderer.render(cube, camera)
  requestAnimationFrame(loop)
}

const moveCamera = (e: KeyboardEvent) => {
  const speed = 0.2

  const forward = new Vec3(-Math.sin(camera.yaw), 0, Math.cos(camera.yaw))

  const right = new Vec3(Math.cos(camera.yaw), 0, Math.sin(camera.yaw))

  if (['z', 'ArrowUp'].includes(e.key)) {
    camera.position.x += forward.x * speed
    camera.position.z += forward.z * speed
  }
  if (['s', 'ArrowDown'].includes(e.key)) {
    camera.position.x -= forward.x * speed
    camera.position.z -= forward.z * speed
  }
  if (['q', 'ArrowLeft'].includes(e.key)) {
    camera.position.x -= right.x * speed
    camera.position.z -= right.z * speed
  }
  if (['d', 'ArrowRight'].includes(e.key)) {
    camera.position.x += right.x * speed
    camera.position.z += right.z * speed
  }
}

const moveCameraAlongYAxis = (e: WheelEvent) => {
  if (e.deltaY > 0) camera.position.y += 0.2
  if (e.deltaY < 0) camera.position.y -= 0.2
}

window.addEventListener('keydown', moveCamera)
window.addEventListener('wheel', moveCameraAlongYAxis)

canvas.addEventListener('click', () => {
  canvas.requestPointerLock()
})

const sensitivity = 0.002

document.addEventListener('mousemove', e => {
  if (document.pointerLockElement !== canvas) return

  camera.yaw -= e.movementX * sensitivity
  camera.pitch -= e.movementY * sensitivity

  const limit = Math.PI / 2 - 0.01
  camera.pitch = Math.max(-limit, Math.min(limit, camera.pitch))
})

window.addEventListener('load', () => {
  loop()
})
