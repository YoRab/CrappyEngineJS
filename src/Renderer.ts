import type Camera from './Camera'
import type Mesh from './model/Mesh'
import type Vec3 from './model/Vec3'

class Renderer {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
    this.width = canvas.width
    this.height = canvas.height
  }

  private project(point: Vec3, camera: Camera) {
    const x = point.x - camera.position.x
    const y = point.y - camera.position.y
    const z = point.z - camera.position.z

    if (z <= 0) return null

    return {
      x: (x / z) * camera.fov + this.width / 2,
      y: (y / z) * camera.fov + this.height / 2
    }
  }

  private drawCube(mesh: Mesh, camera: Camera) {
    const projected = mesh.vertices.map(v => this.project(v, camera)).filter(p => p !== null)

    this.ctx.strokeStyle = 'black'
    for (const face of mesh.faces) {
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
