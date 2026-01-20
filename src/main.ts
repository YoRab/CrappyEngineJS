import Camera from './Camera'
import crappyLogo from '/vite.svg'
import './style.css'

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

const camera = new Camera()

const moveCamera = (e: KeyboardEvent) => {
  if (['z', 'ArrowUp'].includes(e.key)) camera.position.z += 0.2
  if (['s', 'ArrowDown'].includes(e.key)) camera.position.z -= 0.2
  if (['q', 'ArrowLeft'].includes(e.key)) camera.position.x -= 0.2
  if (['d', 'ArrowRight'].includes(e.key)) camera.position.x += 0.2
}

window.addEventListener('keydown', moveCamera)
