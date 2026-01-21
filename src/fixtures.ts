import { cubeFaces, cubeVertices } from './shapes/cube'

const cube = { position: { x: 0, y: 0, z: 0 }, vertices: cubeVertices, faces: cubeFaces }
const cube2 = { position: { x: 2, y: 2, z: 1 }, vertices: cubeVertices, faces: cubeFaces }
const cube3 = { position: { x: -1, y: -1, z: 1 }, vertices: cubeVertices, faces: cubeFaces }
const shapes = [cube, cube2, cube3]

export default shapes
