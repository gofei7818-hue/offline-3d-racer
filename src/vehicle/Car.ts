import * as THREE from 'three';
import { createCarModel } from './CarModel';

export class Car {
  readonly mesh: THREE.Group;
  readonly position = new THREE.Vector3(0, 0, 0);
  speed = 0;
  heading = 0;

  constructor() {
    this.mesh = createCarModel();
    this.mesh.position.copy(this.position);
  }

  update(deltaSeconds: number): void {
    const forward = new THREE.Vector3(Math.sin(this.heading), 0, -Math.cos(this.heading));
    this.position.addScaledVector(forward, this.speed * deltaSeconds);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.heading;
  }

  reset(): void {
    this.position.set(0, 0, 22);
    this.speed = 0;
    this.heading = 0;
    this.mesh.position.copy(this.position);
    this.mesh.rotation.set(0, 0, 0);
  }
}
