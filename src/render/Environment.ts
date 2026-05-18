import * as THREE from 'three';

function flatRing(inner: number, outer: number, color: number, y: number): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.RingGeometry(inner, outer, 96),
    new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide, roughness: 0.95 })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  return mesh;
}

export function createEnvironment(): THREE.Group {
  const root = new THREE.Group();

  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(320, 320),
    new THREE.MeshStandardMaterial({ color: 0x2f7d32, roughness: 1 })
  );
  grass.rotation.x = -Math.PI / 2;
  root.add(grass);

  root.add(flatRing(30, 46, 0x2c3038, 0.03));
  root.add(flatRing(37.85, 38.15, 0xf2f5f9, 0.035));
  root.add(flatRing(29.1, 30, 0xcb3b3b, 0.034));
  root.add(flatRing(46, 46.9, 0xf8f8f8, 0.034));

  const startLine = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 2),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  startLine.rotation.x = -Math.PI / 2;
  startLine.position.set(0, 0.05, 38);
  root.add(startLine);

  const checkpoint = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 1.6),
    new THREE.MeshStandardMaterial({ color: 0xffdf4d })
  );
  checkpoint.rotation.x = -Math.PI / 2;
  checkpoint.position.set(0, 0.05, -38);
  root.add(checkpoint);

  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    const arrow = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0xfff17a })
    );
    arrow.rotation.set(-Math.PI / 2, -a + Math.PI / 2, 0);
    arrow.position.set(Math.cos(a) * 38, 0.09, Math.sin(a) * 38);
    root.add(arrow);
  }

  for (let i = 0; i < 18; i += 1) {
    const a = (i / 18) * Math.PI * 2;
    const tire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.75, 10),
      new THREE.MeshStandardMaterial({ color: 0x1c1c1c })
    );
    tire.position.set(Math.cos(a) * 48, 0.38, Math.sin(a) * 48);
    root.add(tire);
  }

  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const sign = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2, 0.2), new THREE.MeshStandardMaterial({ color: 0x666666 }));
    pole.position.y = 1;
    const board = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshStandardMaterial({ color: 0x1a2338, side: THREE.DoubleSide }));
    board.position.y = 2;
    board.lookAt(0, 2, 0);
    sign.add(pole, board);
    sign.position.set(Math.cos(a) * 53, 0, Math.sin(a) * 53);
    root.add(sign);
  }

  return root;
}
