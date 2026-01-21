import { createCube } from './shapes/cube'

const cube = createCube({ x: 0, y: 0, z: 0 })
const cube2 = createCube({ x: 3, y: 2, z: 1 }, 2)
const cube3 = createCube({ x: -4, y: -2, z: -1 }, 3)
const shapes = [cube, cube2, cube3]

export default shapes
