import * as THREE from 'three';

export function createLighting(): THREE.Group {
  const group = new THREE.Group();
  const sun = new THREE.DirectionalLight(0xffffff, 1.15);
  sun.position.set(12, 18, 10);
  group.add(sun);
  group.add(new THREE.AmbientLight(0x9fb3ff, 0.55));
  return group;
}
