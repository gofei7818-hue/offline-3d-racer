import * as THREE from 'three';

export function createEnvironment(): THREE.Group {
  const group = new THREE.Group();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), new THREE.MeshStandardMaterial({ color: 0x1c6a32, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const ring = new THREE.Mesh(new THREE.RingGeometry(32, 46, 64), new THREE.MeshStandardMaterial({ color: 0x2b2f3a, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  group.add(ring);

  const startLine = new THREE.Mesh(new THREE.PlaneGeometry(10, 1.2), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  startLine.rotation.x = -Math.PI / 2;
  startLine.position.set(0, 0.04, 39);
  group.add(startLine);
  return group;
}
