import Vec3 from '../model/Vec3'

export const cubeFaces = [
  [0, 1, 2],
  [0, 2, 3],
  [4, 5, 6],
  [4, 6, 7],
  [0, 1, 5],
  [0, 5, 4],
  [2, 3, 7],
  [2, 7, 6],
  [1, 2, 6],
  [1, 6, 5],
  [0, 3, 7],
  [0, 7, 4]
]

export const cubeVertices = [
  new Vec3(0, 0, 0),
  new Vec3(1, 0, 0),
  new Vec3(1, 1, 0),
  new Vec3(0, 1, 0),
  new Vec3(0, 0, 1),
  new Vec3(1, 0, 1),
  new Vec3(1, 1, 1),
  new Vec3(0, 1, 1)
]
