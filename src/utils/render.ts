import type { Camera, Mesh, MeshFace } from '../types'
import { getAverageDistance, project } from './trigo'

export const drawCube = (ctx: CanvasRenderingContext2D, projected: { x: number; y: number }[], sortedFaces: MeshFace[]) => {
  for (const face of sortedFaces) {
    ctx.beginPath()
    ctx.fillStyle = face.color
    ctx.strokeStyle = face.color

    const p0 = projected[face.vertices[0]]
    if (!p0) continue
    ctx.moveTo(p0.x, p0.y)
    for (let i = 1; i < 3; i++) {
      const p = projected[face.vertices[i]]
      if (!p) break
      ctx.lineTo(p.x, p.y)
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}

export const getMeshesData = (ctx: CanvasRenderingContext2D, meshes: Mesh[], camera: Camera) => {
  const meshesData = []
  for (const mesh of meshes) {
    const vertices = mesh.vertices.map(v => ({ x: v.x + mesh.position.x, y: v.y + mesh.position.y, z: v.z + mesh.position.z }))
    const projected = vertices.map(v => project(v, camera, ctx.canvas.width, ctx.canvas.height)).filter(p => p !== null)
    const faceDistances = mesh.faces.map(f => ({ ...f, distance: getAverageDistance(f, vertices, camera) }))
    const sortedFaces = faceDistances.toSorted((f1, f2) => f2.distance - f1.distance)
    meshesData.push({ projected, sortedFaces, avgDistance: faceDistances.reduce((a, b) => a + b.distance, 0) / faceDistances.length })
  }
  return meshesData
}

export const render = (ctx: CanvasRenderingContext2D, meshes: Mesh[], camera: Camera) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const meshesData = getMeshesData(ctx, meshes, camera)
  const sortedMeshesData = meshesData.toSorted((a, b) => b.avgDistance - a.avgDistance)
  for (const meshData of sortedMeshesData) {
    drawCube(ctx, meshData.projected, meshData.sortedFaces)
  }
}
