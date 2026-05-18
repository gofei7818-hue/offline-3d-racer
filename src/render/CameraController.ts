import * as THREE from 'three';

export class CameraController {
  private readonly desiredPos = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();
  private readonly forward = new THREE.Vector3();

  constructor(private readonly camera: THREE.PerspectiveCamera) {}

  update(target: THREE.Vector3, heading: number, speed: number): void {
    this.forward.set(Math.sin(heading), 0, -Math.cos(heading));
    const followDistance = 10 + Math.min(6, speed * 0.11);
    this.desiredPos.copy(target).addScaledVector(this.forward, -followDistance).add(new THREE.Vector3(0, 5.5, 0));
    this.lookTarget.copy(target).addScaledVector(this.forward, 8).add(new THREE.Vector3(0, 1.2, 0));
    this.camera.position.lerp(this.desiredPos, 0.12);
    this.camera.lookAt(this.lookTarget);
  }
}
