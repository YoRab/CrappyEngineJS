import Vec3 from './model/Vec3'

class Camera {
  public position: Vec3
  public fov: number
  public yaw: number
  public pitch: number
  constructor() {
    this.position = new Vec3(0, -0.5, -5)
    this.fov = 600
    this.yaw = 0 // left / right
    this.pitch = 0 // up / down
  }
}

export default Camera
