import type Camera from './Camera'
import type Mesh from './model/Mesh'
import { getAverageDistance, project } from './utils'

class Renderer {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
    this.width = canvas.width
    this.height = canvas.height
  }

  private drawCube(mesh: Mesh, camera: Camera) {
    const projected = mesh.vertices.map(v => project(v, camera, this.width, this.height)).filter(p => p !== null)

    this.ctx.strokeStyle = 'black'
    this.ctx.fillStyle = 'orange'

    const sortedFaces = mesh.faces.toSorted((f1, f2) => getAverageDistance(f2, mesh.vertices, camera) - getAverageDistance(f1, mesh.vertices, camera))
    for (const face of sortedFaces) {
      this.ctx.beginPath()
      const p0 = projected[face[0]]
      if (!p0) continue
      this.ctx.moveTo(p0.x, p0.y)
      for (let i = 1; i < face.length; i++) {
        const p = projected[face[i]]
        if (!p) continue
        this.ctx.lineTo(p.x, p.y)
      }
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  public render(mesh: Mesh, camera: Camera) {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.drawCube(mesh, camera)
  }
}

export default Renderer
