import { CAMERA_DEFAULT_FORWARD_SPEED, CAMERA_DEFAULT_SENSITIVITY, CAMERA_DEFAULT_SIDE_SPEED } from '../constants'
import type { Camera, Vec3 } from '../types'

export const rotateCameraY = (p: Vec3, angle: number) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos }
}

export const rotateCameraX = (p: Vec3, angle: number) => {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos }
}

export const moveCameraAlongXAndZAxis = (e: KeyboardEvent, camera: Camera) => {
  const forward = { x: -Math.sin(camera.yaw) * Math.cos(camera.pitch), y: -Math.sin(camera.pitch), z: Math.cos(camera.yaw) * Math.cos(camera.pitch) }

  const right = { x: Math.cos(camera.yaw), y: 0, z: Math.sin(camera.yaw) }

  if (['z', 'ArrowUp'].includes(e.key)) {
    camera.position.x += forward.x * CAMERA_DEFAULT_FORWARD_SPEED
    camera.position.y += forward.y * CAMERA_DEFAULT_FORWARD_SPEED
    camera.position.z += forward.z * CAMERA_DEFAULT_FORWARD_SPEED
  }
  if (['s', 'ArrowDown'].includes(e.key)) {
    camera.position.x -= forward.x * CAMERA_DEFAULT_FORWARD_SPEED
    camera.position.y -= forward.y * CAMERA_DEFAULT_FORWARD_SPEED
    camera.position.z -= forward.z * CAMERA_DEFAULT_FORWARD_SPEED
  }
  if (['q', 'ArrowLeft'].includes(e.key)) {
    camera.position.x -= right.x * CAMERA_DEFAULT_SIDE_SPEED
    camera.position.z -= right.z * CAMERA_DEFAULT_SIDE_SPEED
  }
  if (['d', 'ArrowRight'].includes(e.key)) {
    camera.position.x += right.x * CAMERA_DEFAULT_SIDE_SPEED
    camera.position.z += right.z * CAMERA_DEFAULT_SIDE_SPEED
  }
}

export const moveCameraAlongYAxis = (e: WheelEvent, camera: Camera) => {
  if (e.deltaY > 0) camera.position.y += CAMERA_DEFAULT_FORWARD_SPEED
  if (e.deltaY < 0) camera.position.y -= CAMERA_DEFAULT_FORWARD_SPEED
}

export const moveCameraDirection = (e: MouseEvent, camera: Camera, canvas: HTMLCanvasElement) => {
  if (document.pointerLockElement !== canvas) return

  camera.yaw -= e.movementX * CAMERA_DEFAULT_SENSITIVITY
  camera.pitch -= e.movementY * CAMERA_DEFAULT_SENSITIVITY

  const limit = Math.PI / 2 - 0.01
  camera.pitch = Math.max(-limit, Math.min(limit, camera.pitch))
}
