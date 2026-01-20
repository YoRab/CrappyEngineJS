import type Camera from './Camera'
import Vec3 from './model/Vec3'

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
  let p = new Vec3(point.x - camera.position.x, point.y - camera.position.y, point.z - camera.position.z)

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

  return new Vec3(p.x * cos - p.z * sin, p.y, p.x * sin + p.z * cos)
}

export const rotateCameraX = (p: Vec3, angle: number) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  return new Vec3(p.x, p.y * cos - p.z * sin, p.y * sin + p.z * cos)
}
