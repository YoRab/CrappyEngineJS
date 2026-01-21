export type Vec3 = {
  x: number
  y: number
  z: number
}

export type MeshFace = {
  vertices: [number, number, number]
  color: string
}

export type Shape = {
  type: 'cube' | 'sphere'
  position: Vec3
  vertices: Vec3[]
  faces: MeshFace[]
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
