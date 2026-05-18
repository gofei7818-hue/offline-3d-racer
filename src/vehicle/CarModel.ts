import * as THREE from 'three';

const red = new THREE.MeshStandardMaterial({ color: 0xd71930, roughness: 0.45, metalness: 0.16 });
const black = new THREE.MeshStandardMaterial({ color: 0x090b10, roughness: 0.8 });
const wing = new THREE.MeshStandardMaterial({ color: 0x111722, roughness: 0.55, metalness: 0.12 });
const blue = new THREE.MeshStandardMaterial({ color: 0x12c8ff, emissive: 0x031b22, roughness: 0.32 });
const glass = new THREE.MeshStandardMaterial({ color: 0x78aaff, transparent: true, opacity: 0.72, roughness: 0.18 });
const tire = new THREE.MeshStandardMaterial({ color: 0x08090c, roughness: 0.9 });
const rim = new THREE.MeshStandardMaterial({ color: 0xc2ccd8, roughness: 0.25, metalness: 0.65 });

function block(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

function makeWheel(x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.36, 20), tire);
  t.rotation.z = Math.PI / 2;
  const r = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.38, 14), rim);
  r.rotation.z = Math.PI / 2;
  g.add(t, r);
  g.position.set(x, 0.42, z);
  return g;
}

export function createCarModel(): THREE.Group {
  const car = new THREE.Group();
  car.name = 'open-wheel-racer';

  car.add(block(0.72, 0.32, 4.05, red, 0, 0.56, -0.2));
  car.add(block(1.35, 0.42, 1.18, red, 0, 0.58, 1.15));
  car.add(block(0.38, 0.32, 1.55, red, -0.84, 0.52, 0.38));
  car.add(block(0.38, 0.32, 1.55, red, 0.84, 0.52, 0.38));

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.32, 1.85, 16), red);
  nose.rotation.x = Math.PI / 2;
  nose.scale.x = 0.62;
  nose.position.set(0, 0.51, -2.75);
  car.add(nose);

  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 10), glass);
  canopy.scale.set(1.0, 0.45, 1.35);
  canopy.position.set(0, 1.05, -0.45);
  car.add(block(0.78, 0.32, 0.82, black, 0, 0.88, -0.32), canopy);

  car.add(block(2.55, 0.08, 0.36, wing, 0, 0.28, -3.26));
  car.add(block(2.18, 0.06, 0.22, wing, 0, 0.42, -3.12));
  car.add(block(2.24, 0.12, 0.42, wing, 0, 1.2, 2.12));
  car.add(block(1.76, 0.08, 0.32, wing, 0, 0.98, 1.93));
  car.add(block(0.09, 0.62, 0.18, wing, -0.42, 0.88, 1.94));
  car.add(block(0.09, 0.62, 0.18, wing, 0.42, 0.88, 1.94));

  car.add(block(0.18, 0.055, 4.25, blue, 0, 0.82, -0.12));
  car.add(block(0.06, 0.05, 2.1, blue, -0.42, 0.78, 0.1));
  car.add(block(0.06, 0.05, 2.1, blue, 0.42, 0.78, 0.1));

  [[-1, -1.24], [1, -1.24], [-1, 1.24], [1, 1.24]].forEach(([side, z]) => car.add(block(0.82, 0.055, 0.08, black, side * 0.64, 0.5, z)));
  car.add(makeWheel(-1.18, -1.34), makeWheel(1.18, -1.34), makeWheel(-1.16, 1.28), makeWheel(1.16, 1.28));

  car.scale.setScalar(1.05);
  return car;
}
