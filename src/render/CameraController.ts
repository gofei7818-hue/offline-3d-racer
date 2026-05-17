import * as THREE from 'three';
export class CameraController {
  private readonly desiredPos = new THREE.Vector3();
  private readonly targetLook = new THREE.Vector3();
  constructor(private readonly camera: THREE.PerspectiveCamera) {}
  update(target: THREE.Vector3, heading: number, speed: number): void {
    const speedRatio = Math.min(1, speed / 44);
    const distance = 9 + speedRatio * 6;
    const height = 4.6 + speedRatio * 2;
    this.desiredPos.set(target.x - Math.sin(heading) * distance, target.y + height, target.z + Math.cos(heading) * distance);
    this.targetLook.set(target.x + Math.sin(heading) * (2 + speedRatio * 2), target.y + 1.1, target.z - Math.cos(heading) * (2 + speedRatio * 2));
    this.camera.position.lerp(this.desiredPos, 0.085);
    this.camera.lookAt(this.targetLook);
  }
}
