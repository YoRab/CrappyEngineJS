import type Vec3 from './Vec3'

class Mesh {
  public vertices: Vec3[]
  public faces: number[][]
  constructor(vertices: Vec3[], faces: number[][]) {
    this.vertices = vertices
    this.faces = faces
  }
}

export default Mesh
