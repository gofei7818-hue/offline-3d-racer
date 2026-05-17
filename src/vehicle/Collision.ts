import * as THREE from 'three';

export class CollisionSystem {
  isOffTrack(_position: THREE.Vector3): boolean {
    return false;
  }
}
