import type Camera from './Camera'
import type Mesh from './model/Mesh'
import Vec3 from './model/Vec3'
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

  private getMeshesData(meshes: Mesh[], camera: Camera) {
    const meshesData = []
    for (const mesh of meshes) {
      const vertices = mesh.vertices.map(v => new Vec3(v.x + mesh.position.x, v.y + mesh.position.y, v.z + mesh.position.z))
      const projected = vertices.map(v => project(v, camera, this.width, this.height)).filter(p => p !== null)
      const faceDistances = mesh.faces.map(f => ({ ...f, distance: getAverageDistance(f, vertices, camera) }))
      const sortedFaces = faceDistances.toSorted((f1, f2) => f2.distance - f1.distance)
      meshesData.push({ projected, sortedFaces, avgDistance: faceDistances.reduce((a, b) => a + b.distance, 0) / faceDistances.length })
    }
    return meshesData
  }

  private drawCube(projected: { x: number; y: number }[], sortedFaces: [number, number, number, string][]) {
    for (const face of sortedFaces) {
      this.ctx.beginPath()
      this.ctx.fillStyle = face[3]
      this.ctx.strokeStyle = face[3]

      const p0 = projected[face[0]]
      if (!p0) continue
      this.ctx.moveTo(p0.x, p0.y)
      for (let i = 1; i < 3; i++) {
        const p = projected[face[i] as number]
        if (!p) break
        this.ctx.lineTo(p.x, p.y)
      }
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  public render(meshes: Mesh[], camera: Camera) {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, this.width, this.height)

    const meshesData = this.getMeshesData(meshes, camera)
    const sortedMeshesData = meshesData.toSorted((a, b) => b.avgDistance - a.avgDistance)
    for (const meshData of sortedMeshesData) {
      this.drawCube(meshData.projected, meshData.sortedFaces)
    }
  }
}

export default Renderer
