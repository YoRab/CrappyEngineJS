import Vec3 from './model/Vec3'

class Camera {
  public position: Vec3
  public fov: number
  constructor() {
    this.position = new Vec3(0, -0.5, -5)
    this.fov = 400
  }
}

export default Camera
