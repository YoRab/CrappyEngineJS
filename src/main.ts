import crappyLogo from '/vite.svg'
import { CAMERA_DEFAULT_POSITION, CAMERA_FOV } from './constants'
import shapes from './fixtures'
import './style.css'
import type { Camera, Renderer } from './types'
import { moveCameraAlongXAndZAxis, moveCameraAlongYAxis, moveCameraDirection } from './utils/camera'
import { render } from './utils/render'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1><img src="${crappyLogo}" class="logo" alt="Logo de CrappyEngineJs" />CrappyEngineJs</h1>
    <p class="subtitle">
      Crappy engine is a 3D engine built with vanilla JavaScript. It is an experiment with no purpose and no future.<br/>
      Use the <strong>arrow keys</strong> or <strong>ZQSD</strong> to move the camera, the <strong>mouse</strong> to look around and the <strong>wheel</strong> to move up and down.
    </p>
    <div class="canvas-container">
      <canvas class="canvas" width="1280" height="720"></canvas>
    </div>
`
const canvas = document.querySelector<HTMLCanvasElement>('.canvas')!
const renderer: Renderer = { ctx: canvas.getContext('2d')!, width: canvas.width, height: canvas.height }
const camera: Camera = { position: CAMERA_DEFAULT_POSITION, fov: CAMERA_FOV, yaw: 0, pitch: 0 }

document.addEventListener('keydown', e => moveCameraAlongXAndZAxis(e, camera))
document.addEventListener('wheel', e => moveCameraAlongYAxis(e, camera))
document.addEventListener('mousemove', e => moveCameraDirection(e, camera, canvas))

canvas.addEventListener('click', () => canvas.requestPointerLock())

const loop = () => {
  render(renderer.ctx, shapes, camera)
  requestAnimationFrame(loop)
}

window.addEventListener('load', () => {
  loop()
})
