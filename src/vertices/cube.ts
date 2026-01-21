import type { Vec3 } from '../types'

export const faceColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']
export const cubeFaces: [number, number, number, string][] = [
  [0, 1, 2, faceColors[0]],
  [0, 2, 3, faceColors[0]],
  [4, 5, 6, faceColors[1]],
  [4, 6, 7, faceColors[1]],
  [0, 1, 5, faceColors[2]],
  [0, 5, 4, faceColors[2]],
  [2, 3, 7, faceColors[3]],
  [2, 7, 6, faceColors[3]],
  [1, 2, 6, faceColors[4]],
  [1, 6, 5, faceColors[4]],
  [0, 3, 7, faceColors[5]],
  [0, 7, 4, faceColors[5]]
]

export const cubeVertices: Vec3[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 1, y: 1, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 1, y: 0, z: 1 },
  { x: 1, y: 1, z: 1 },
  { x: 0, y: 1, z: 1 }
]
