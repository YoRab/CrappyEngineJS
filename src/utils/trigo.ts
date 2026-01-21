import type { Camera, MeshFace, Vec3 } from '../types'
import { rotateCameraX, rotateCameraY } from './camera'

export const getAverageDistance = (face: MeshFace, vertices: Vec3[], camera: Camera) => {
  const distances = []
  for (const vertex of face.vertices) {
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
