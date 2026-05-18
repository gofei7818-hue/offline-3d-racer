import * as THREE from 'three';

function makeMat(color: number, roughness = 0.86): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });
}

function makeFlatRing(innerRadius: number, outerRadius: number, color: number, y: number): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.RingGeometry(innerRadius, outerRadius, 128),
    new THREE.MeshStandardMaterial({ color, roughness: 0.92, side: THREE.DoubleSide })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  return mesh;
}

function makeDirectionArrow(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 3.6);
  shape.lineTo(2.1, 0.35);
  shape.lineTo(0.82, 0.35);
  shape.lineTo(0.82, -3.0);
  shape.lineTo(-0.82, -3.0);
  shape.lineTo(-0.82, 0.35);
  shape.lineTo(-2.1, 0.35);
  shape.lineTo(0, 3.6);
  return new THREE.ShapeGeometry(shape);
}

function addDirectionArrow(parent: THREE.Group, angle: number, radius: number): void {
  const group = new THREE.Group();
  const arrow = new THREE.Mesh(makeDirectionArrow(), makeMat(0xffd84d, 0.72));
  arrow.rotation.x = -Math.PI / 2;
  arrow.position.y = 0.1;
  group.add(arrow);
  group.position.set(Math.cos(angle) * radius, 0.02, Math.sin(angle) * radius);
  group.rotation.y = angle;
  parent.add(group);
}

function addTireWall(parent: THREE.Group, angle: number, radius: number): void {
  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.7, 16),
    makeMat(0x10131a, 0.7)
  );
  tire.position.set(Math.cos(angle) * radius, 0.35, Math.sin(angle) * radius);
  parent.add(tire);
}

function addSmallTree(parent: THREE.Group, angle: number, radius: number): void {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.4, 8), makeMat(0x6f4423));
  trunk.position.y = 0.7;
  const crown = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.2, 10), makeMat(0x1f6b2b));
  crown.position.y = 2.2;
  tree.add(trunk, crown);
  tree.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  parent.add(tree);
}

function addStartLine(parent: THREE.Group): void {
  const startLine = new THREE.Mesh(new THREE.PlaneGeometry(13, 1.7), makeMat(0xffffff, 0.65));
  startLine.rotation.x = -Math.PI / 2;
  startLine.position.set(0, 0.12, 39);
  parent.add(startLine);

  const leftStripe = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.7), makeMat(0x111111, 0.65));
  leftStripe.rotation.x = -Math.PI / 2;
  leftStripe.position.set(-2.4, 0.13, 39);
  const rightStripe = leftStripe.clone();
  rightStripe.position.x = 2.4;
  parent.add(leftStripe, rightStripe);

  const postMat = makeMat(0xf2f7ff, 0.6);
  const postA = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.8, 0.45), postMat);
  postA.position.set(-7.5, 1.9, 39);
  const postB = postA.clone();
  postB.position.x = 7.5;
  const banner = new THREE.Mesh(new THREE.BoxGeometry(15.5, 0.7, 0.35), makeMat(0x1f2937, 0.75));
  banner.position.set(0, 3.9, 39);
  parent.add(postA, postB, banner);
}

export function createEnvironment(): THREE.Group {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(360, 360), makeMat(0x2f7a38, 1));
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  // All racing surfaces are deliberately flat on the XZ plane.
  group.add(makeFlatRing(30, 48, 0x262c36, 0.035));
  group.add(makeFlatRing(29.3, 30.2, 0xf2f2f2, 0.055));
  group.add(makeFlatRing(47.5, 49.1, 0xbfd2e8, 0.055));
  group.add(makeFlatRing(49.1, 50.8, 0xc94141, 0.052));

  addStartLine(group);

  for (let i = 0; i < 12; i += 1) addDirectionArrow(group, (i / 12) * Math.PI * 2, 39);
  for (let i = 0; i < 28; i += 1) {
    const angle = (i / 28) * Math.PI * 2;
    addTireWall(group, angle, 27.8);
    if (i % 2 === 0) addTireWall(group, angle + 0.06, 52.2);
  }
  for (let i = 0; i < 18; i += 1) addSmallTree(group, (i / 18) * Math.PI * 2 + 0.1, 72 + (i % 3) * 7);

  return group;
}
