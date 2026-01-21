import type { Camera, Renderer } from './types'
import { cubeVertices, cubeFaces } from './vertices/cube'
import crappyLogo from '/vite.svg'
import './style.css'
import { CAMERA_DEFAULT_POSITION, CAMERA_FOV } from './constants'
import { render } from './utils'

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

const renderer: Renderer = { ctx: canvas.getContext('2d')!, width: canvas.width, height: canvas.height }
const camera: Camera = { position: CAMERA_DEFAULT_POSITION, fov: CAMERA_FOV, yaw: 0, pitch: 0 }
const cube = { position: { x: 0, y: 0, z: 0 }, vertices: cubeVertices, faces: cubeFaces }
const cube2 = { position: { x: 2, y: 2, z: 1 }, vertices: cubeVertices, faces: cubeFaces }
const cube3 = { position: { x: -1, y: -1, z: 1 }, vertices: cubeVertices, faces: cubeFaces }
const shapes = [cube, cube2, cube3]

const loop = () => {
  render(renderer.ctx, shapes, camera)
  requestAnimationFrame(loop)
}

const moveCamera = (e: KeyboardEvent) => {
  const forwardSpeed = 0.2
  const sideSpeed = 0.1

  const forward = { x: -Math.sin(camera.yaw) * Math.cos(camera.pitch), y: -Math.sin(camera.pitch), z: Math.cos(camera.yaw) * Math.cos(camera.pitch) }

  const right = { x: Math.cos(camera.yaw), y: 0, z: Math.sin(camera.yaw) }

  if (['z', 'ArrowUp'].includes(e.key)) {
    camera.position.x += forward.x * forwardSpeed
    camera.position.y += forward.y * forwardSpeed
    camera.position.z += forward.z * forwardSpeed
  }
  if (['s', 'ArrowDown'].includes(e.key)) {
    camera.position.x -= forward.x * forwardSpeed
    camera.position.y -= forward.y * forwardSpeed
    camera.position.z -= forward.z * forwardSpeed
  }
  if (['q', 'ArrowLeft'].includes(e.key)) {
    camera.position.x -= right.x * sideSpeed
    camera.position.z -= right.z * sideSpeed
  }
  if (['d', 'ArrowRight'].includes(e.key)) {
    camera.position.x += right.x * sideSpeed
    camera.position.z += right.z * sideSpeed
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
