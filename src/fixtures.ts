import { createCube } from './utils/shapes/cube'
import { createSphere } from './utils/shapes/sphere'

const cube = createCube({ x: 0, y: 0, z: 0 })
const cube2 = createCube({ x: 3, y: 2, z: 1 }, 2)
const cube3 = createCube({ x: -4, y: -2, z: -1 }, 3)

const sphere = createSphere({ x: 0, y: -5, z: 0 }, 1.5)
const shapes = [cube, cube2, cube3, sphere]

export default shapes
