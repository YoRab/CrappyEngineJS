import './style.css'
import crappyLogo from '/vite.svg'

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
