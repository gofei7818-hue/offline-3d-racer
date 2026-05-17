import * as THREE from 'three';

export class CameraController {
  private readonly desiredPos = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();

  constructor(private readonly camera: THREE.PerspectiveCamera) {}

  update(target: THREE.Vector3, heading: number, speed: number): void {
    const back = 11 + Math.min(7, speed * 0.12);
    this.desiredPos.set(target.x - Math.sin(heading) * back, target.y + 5.8, target.z + Math.cos(heading) * back);
    this.lookTarget.set(target.x + Math.sin(heading) * 2.2, target.y + 1.4, target.z - Math.cos(heading) * 2.2);
    this.camera.position.lerp(this.desiredPos, 0.08);
    this.camera.lookAt(this.lookTarget);
  }
}
