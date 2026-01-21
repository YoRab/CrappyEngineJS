import type { Camera, Mesh, Vec3 } from './types'

export const getAverageDistance = (face: [number, number, number, string], vertices: Vec3[], camera: Camera) => {
  const distances = []
  for (const vertex of face.slice(0, 3) as number[]) {
    const point = vertices[vertex]
    const x = point.x - camera.position.x
    const y = point.y - camera.position.y
    const z = point.z - camera.position.z
    const distance = Math.sqrt(x * x + y * y + z * z)
    distances.push(distance)
  }
  if (!distances.length) return 0
  return distances.reduce((a, b) => a + b, 0) / distances.length
}

export const project = (point: Vec3, camera: Camera, width: number, height: number) => {
  let p = { x: point.x - camera.position.x, y: point.y - camera.position.y, z: point.z - camera.position.z }

  p = rotateCameraY(p, -camera.yaw)
  p = rotateCameraX(p, -camera.pitch)

  if (p.z <= 0) return null

  return {
    x: (p.x / p.z) * camera.fov + width / 2,
    y: (p.y / p.z) * camera.fov + height / 2
  }
}

export const rotateCameraY = (p: Vec3, angle: number) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos }
}

export const rotateCameraX = (p: Vec3, angle: number) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos }
}

export const drawCube = (ctx: CanvasRenderingContext2D, projected: { x: number; y: number }[], sortedFaces: [number, number, number, string][]) => {
  for (const face of sortedFaces) {
    ctx.beginPath()
    ctx.fillStyle = face[3]
    ctx.strokeStyle = face[3]

    const p0 = projected[face[0]]
    if (!p0) continue
    ctx.moveTo(p0.x, p0.y)
    for (let i = 1; i < 3; i++) {
      const p = projected[face[i] as number]
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
