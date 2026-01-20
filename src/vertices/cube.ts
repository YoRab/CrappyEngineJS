import Vec3 from '../model/Vec3'

export const cubeColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'brown', 'gray']
export const cubeFaces: [number, number, number, string][] = [
  [0, 1, 2, cubeColors[0]],
  [0, 2, 3, cubeColors[0]],
  [4, 5, 6, cubeColors[1]],
  [4, 6, 7, cubeColors[1]],
  [0, 1, 5, cubeColors[2]],
  [0, 5, 4, cubeColors[2]],
  [2, 3, 7, cubeColors[3]],
  [2, 7, 6, cubeColors[3]],
  [1, 2, 6, cubeColors[4]],
  [1, 6, 5, cubeColors[4]],
  [0, 3, 7, cubeColors[5]],
  [0, 7, 4, cubeColors[5]]
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
