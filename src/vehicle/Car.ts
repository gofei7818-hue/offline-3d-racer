import * as THREE from 'three';
import { createCarModel } from './CarModel';

export class Car {
  readonly mesh: THREE.Group;
  readonly position = new THREE.Vector3(0, 0, 0);
  readonly velocity = new THREE.Vector3(0, 0, 0);
  speed = 0;
  heading = 0;
  steer = 0;

  constructor() { this.mesh = createCarModel(); }

  update(deltaSeconds: number): void {
    const forward = new THREE.Vector3(Math.sin(this.heading), 0, -Math.cos(this.heading));
    this.velocity.lerp(forward.multiplyScalar(this.speed), Math.min(1, deltaSeconds * 7));
    this.position.addScaledVector(this.velocity, deltaSeconds);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.heading;
  }

  reset(): void { this.position.set(0, 0, 38); this.velocity.set(0,0,0); this.speed = 0; this.heading = Math.PI; this.steer = 0; }
}
