import { SPHERE_STEPS } from '../../constants'
import type { MeshFace, Shape, Vec3 } from '../../types'

export const createSphere = (position: Vec3, size = 1): Shape => {
  const vertices: Vec3[] = []
  const faces: MeshFace[] = []

  for (let lat = 0; lat <= SPHERE_STEPS; lat++) {
    const theta = (lat * Math.PI) / SPHERE_STEPS
    const sinT = Math.sin(theta)
    const cosT = Math.cos(theta)

    for (let lon = 0; lon <= SPHERE_STEPS; lon++) {
      const phi = (lon * 2 * Math.PI) / SPHERE_STEPS
      const sinP = Math.sin(phi)
      const cosP = Math.cos(phi)

      vertices.push({
        x: size * sinT * cosP,
        y: size * cosT,
        z: size * sinT * sinP
      })
    }
  }

  const row = SPHERE_STEPS + 1

  for (let lat = 0; lat < SPHERE_STEPS; lat++) {
    for (let lon = 0; lon < SPHERE_STEPS; lon++) {
      const a = lat * row + lon
      const b = a + row

      faces.push({ vertices: [a, a + 1, b], color: '#ccc' })
      faces.push({ vertices: [b, a + 1, b + 1], color: '#aaa' })
    }
  }

  return {
    position,
    type: 'sphere',
    vertices,
    faces
  }
}
