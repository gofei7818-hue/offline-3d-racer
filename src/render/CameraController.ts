import * as THREE from 'three';

export class CameraController {
  constructor(private readonly camera: THREE.PerspectiveCamera) {}

  update(target: THREE.Vector3): void {
    this.camera.position.lerp(new THREE.Vector3(target.x, target.y + 8, target.z + 18), 0.08);
    this.camera.lookAt(target.x, target.y, target.z);
  }
}
