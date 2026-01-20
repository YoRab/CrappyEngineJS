import type Camera from './Camera'
import type Vec3 from './model/Vec3'

export const getAverageDistance = (face: number[], vertices: Vec3[], camera: Camera) => {
  const distances = []
  for (const vertex of face) {
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
  const x = point.x - camera.position.x
  const y = point.y - camera.position.y
  const z = point.z - camera.position.z

  if (z <= 0) return null

  return {
    x: (x / z) * camera.fov + width / 2,
    y: (y / z) * camera.fov + height / 2
  }
}
