import * as THREE from 'three';

export function createCarModel(): THREE.Group {
  const car = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xdc143c, roughness: 0.55 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x08090c, roughness: 0.85 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 3.8), bodyMaterial); body.position.y = 0.5; car.add(body);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.2, 12), bodyMaterial); nose.rotation.x = Math.PI / 2; nose.position.set(0, 0.5, -2.25); car.add(nose);
  const cockpit = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.45, 1.1), darkMaterial); cockpit.position.set(0, 0.88, -0.15); car.add(cockpit);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.16, 0.36), bodyMaterial); wing.position.set(0, 0.95, 1.95); car.add(wing);

  const lightMat = new THREE.MeshStandardMaterial({ color: 0xfff4a3, emissive: 0x443300 });
  const headL = new THREE.Mesh(new THREE.BoxGeometry(0.18,0.12,0.08), lightMat); headL.position.set(-0.35,0.55,-2.75); car.add(headL);
  const headR = headL.clone(); headR.position.x = 0.35; car.add(headR);

  const wheelGeometry = new THREE.CylinderGeometry(0.34, 0.34, 0.28, 16);
  [[-1,0.3,-1.2],[1,0.3,-1.2],[-1,0.3,1.2],[1,0.3,1.2]].forEach(([x,y,z]) => { const w = new THREE.Mesh(wheelGeometry, darkMaterial); w.rotation.z = Math.PI / 2; w.position.set(x as number,y as number,z as number); car.add(w); });
  return car;
}
