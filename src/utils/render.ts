import type { Camera, MeshFace, Shape, Vec3 } from '../types'
import { getAverageDistance, project } from './trigo'

/**
 * Calculate the cross product of two 3D vectors
 */
const cross = (a: Vec3, b: Vec3): Vec3 => {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  }
}

/**
 * Calculate the dot product of two 3D vectors
 */
const dot = (a: Vec3, b: Vec3): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

/**
 * Normalize a 3D vector
 */
const normalize = (v: Vec3): Vec3 => {
  const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
  if (length === 0) return { x: 0, y: 0, z: 0 }
  return { x: v.x / length, y: v.y / length, z: v.z / length }
}

/**
 * Check if a face is front-facing (visible from the camera)
 * Returns true if the face should be rendered, false if it should be culled
 */
const isFrontFacing = (face: MeshFace, vertices: Vec3[], camera: Camera): boolean => {
  const v0 = vertices[face.vertices[0]]
  const v1 = vertices[face.vertices[1]]
  const v2 = vertices[face.vertices[2]]

  // Calculate two edge vectors
  const edge1: Vec3 = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z }
  const edge2: Vec3 = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z }

  // Calculate face normal (cross product of edges)
  const normal = normalize(cross(edge1, edge2))

  // Calculate face center
  const faceCenter: Vec3 = {
    x: (v0.x + v1.x + v2.x) / 3,
    y: (v0.y + v1.y + v2.y) / 3,
    z: (v0.z + v1.z + v2.z) / 3
  }

  // Calculate view vector from face center to camera
  const viewVector: Vec3 = {
    x: camera.position.x - faceCenter.x,
    y: camera.position.y - faceCenter.y,
    z: camera.position.z - faceCenter.z
  }
  const normalizedViewVector = normalize(viewVector)

  // If dot product > 0, face is front-facing (normal and view vector point in similar direction)
  return dot(normal, normalizedViewVector) > 0
}

export const getShapesData = (ctx: CanvasRenderingContext2D, shapes: Shape[], camera: Camera) => {
  const shapesData = []
  for (const shape of shapes) {
    const vertices = shape.vertices.map(v => ({ x: v.x + shape.position.x, y: v.y + shape.position.y, z: v.z + shape.position.z }))
    const projected = vertices.map(v => project(v, camera, ctx.canvas.width, ctx.canvas.height)).filter(p => p !== null)

    const frontFacingFaces = shape.faces.filter(f => isFrontFacing(f, vertices, camera)) // back face culling filter

    const sortedFaces = frontFacingFaces
      .map(f => ({ ...f, distance: getAverageDistance(f, vertices, camera) }))
      .toSorted((f1, f2) => f2.distance - f1.distance)
    shapesData.push({
      type: shape.type,
      projected,
      sortedFaces,
      avgDistance: sortedFaces.length > 0 ? sortedFaces.reduce((a, b) => a + b.distance, 0) / sortedFaces.length : 0
    })
  }
  return shapesData
}

export const drawShape = (ctx: CanvasRenderingContext2D, projected: { x: number; y: number }[], sortedFaces: Shape['faces']) => {
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

export const render = (ctx: CanvasRenderingContext2D, shapes: Shape[], camera: Camera) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const shapesData = getShapesData(ctx, shapes, camera)
  const sortedShapesData = shapesData.toSorted((a, b) => b.avgDistance - a.avgDistance)
  for (const shapeData of sortedShapesData) {
    drawShape(ctx, shapeData.projected, shapeData.sortedFaces)
  }
}
