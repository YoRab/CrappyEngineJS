import type Vec3 from './Vec3'

class Mesh {
  public position: Vec3
  public vertices: Vec3[]
  public faces: [number, number, number, string][]
  constructor(position: Vec3, vertices: Vec3[], faces: [number, number, number, string][]) {
    this.position = position
    this.vertices = vertices
    this.faces = faces
  }
}

export default Mesh
