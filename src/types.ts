export type Vec3 = {
  x: number
  y: number
  z: number
}

export type Mesh = {
  position: Vec3
  vertices: Vec3[]
  faces: [number, number, number, string][]
}

export type Camera = {
  position: Vec3
  fov: number
  yaw: number
  pitch: number
}

export type Renderer = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}
