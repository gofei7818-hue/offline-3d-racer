import * as THREE from 'three';

export function createEnvironment(): THREE.Group {
  const group = new THREE.Group();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshStandardMaterial({ color: 0x2f7a38, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; group.add(ground);

  const ring = new THREE.Mesh(new THREE.RingGeometry(30, 48, 80), new THREE.MeshStandardMaterial({ color: 0x262c36, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.03; group.add(ring);

  const curb = new THREE.Mesh(new THREE.RingGeometry(30, 31.2, 80), new THREE.MeshStandardMaterial({ color: 0xd2d2d2, side: THREE.DoubleSide }));
  curb.rotation.x = -Math.PI / 2; curb.position.y = 0.04; group.add(curb);
  const outerCurb = new THREE.Mesh(new THREE.RingGeometry(46.8, 48, 80), new THREE.MeshStandardMaterial({ color: 0xc94141, side: THREE.DoubleSide }));
  outerCurb.rotation.x = -Math.PI / 2; outerCurb.position.y = 0.04; group.add(outerCurb);

  const startLine = new THREE.Mesh(new THREE.PlaneGeometry(11, 1.8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  startLine.rotation.x = -Math.PI / 2; startLine.position.set(0, 0.06, 39); group.add(startLine);

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const tree = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3.5, 8), new THREE.MeshStandardMaterial({ color: 0x1f5423 }));
    tree.position.set(Math.cos(angle) * 62, 1.8, Math.sin(angle) * 62);
    group.add(tree);
  }
  return group;
}
