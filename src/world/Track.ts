import * as THREE from 'three';
import { createTrackGeometry } from './TrackGeometry';

export class Track {
  readonly mesh: THREE.Mesh;

  constructor() {
    this.mesh = new THREE.Mesh(
      createTrackGeometry(),
      new THREE.MeshStandardMaterial({ color: 0x202632, roughness: 0.9 })
    );
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = 0.04;
  }
}
