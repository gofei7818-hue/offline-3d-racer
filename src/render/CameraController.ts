import * as THREE from 'three';

export class CameraController {
  private readonly desiredPos = new THREE.Vector3();

  constructor(private readonly camera: THREE.PerspectiveCamera) {}

  update(target: THREE.Vector3, heading: number, speed: number): void {
    const distance = 10 + Math.min(8, speed * 0.15);
    this.desiredPos.set(
      target.x - Math.sin(heading) * distance,
      target.y + 5.5,
      target.z + Math.cos(heading) * distance
    );
    this.camera.position.lerp(this.desiredPos, 0.1);
    this.camera.lookAt(target.x, target.y + 1.2, target.z);
  }
}
