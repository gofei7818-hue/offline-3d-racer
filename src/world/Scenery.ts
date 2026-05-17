import * as THREE from 'three';

export class Scenery {
  readonly group = new THREE.Group();

  constructor() {
    this.group.name = 'scenery-placeholder';
  }
}
