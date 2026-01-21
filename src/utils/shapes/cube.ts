import type { Shape, MeshFace, Vec3 } from '../../types'

const faceColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']

const faces: Shape['faces'] = [
  { vertices: [0, 1, 2], color: faceColors[0] },
  { vertices: [0, 2, 3], color: faceColors[0] },
  { vertices: [4, 5, 6], color: faceColors[1] },
  { vertices: [4, 6, 7], color: faceColors[1] },
  { vertices: [0, 1, 5], color: faceColors[2] },
  { vertices: [0, 5, 4], color: faceColors[2] },
  { vertices: [2, 3, 7], color: faceColors[3] },
  { vertices: [2, 7, 6], color: faceColors[3] },
  { vertices: [1, 2, 6], color: faceColors[4] },
  { vertices: [1, 6, 5], color: faceColors[4] },
  { vertices: [0, 3, 7], color: faceColors[5] },
  { vertices: [0, 7, 4], color: faceColors[5] }
]

const vertices: Shape['vertices'] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 1, y: 1, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 1, y: 0, z: 1 },
  { x: 1, y: 1, z: 1 },
  { x: 0, y: 1, z: 1 }
]

export const createCube = (position: Vec3, size = 1): Shape => {
  return {
    type: 'cube',
    position,
    vertices: vertices.map(v => ({ x: v.x * size, y: v.y * size, z: v.z * size })),
    faces: faces
  }
}
