import * as THREE from 'three';

export function createCarModel(): THREE.Group {
  const car = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe43b45, roughness: 0.5, metalness: 0.2 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x11151d, roughness: 0.75 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x31d4ff, emissive: 0x082030, roughness: 0.35 });

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.4, 3.7), bodyMat); chassis.position.y = 0.48; car.add(chassis);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.52, 1.45, 10), bodyMat); nose.rotation.x = Math.PI / 2; nose.position.set(0, 0.42, -2.4); car.add(nose);
  const cabinBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.35, 1.1), trimMat); cabinBase.position.set(0, 0.82, -0.25); car.add(cabinBase);
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.26, 0.8), new THREE.MeshStandardMaterial({ color: 0x6aa5ff, transparent: true, opacity: 0.7 })); canopy.position.set(0, 0.95, -0.2); car.add(canopy);
  const frontWing = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 0.42), trimMat); frontWing.position.set(0, 0.3, -2.8); car.add(frontWing);
  const rearWing = new THREE.Mesh(new THREE.BoxGeometry(2, 0.09, 0.45), trimMat); rearWing.position.set(0, 1.02, 2); car.add(rearWing);
  const rearPylon = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.2), trimMat); rearPylon.position.set(0, 0.77, 1.94); car.add(rearPylon);
  const sidePodL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.22, 1.8), bodyMat); sidePodL.position.set(-1.06, 0.5, 0.1); car.add(sidePodL);
  const sidePodR = sidePodL.clone(); sidePodR.position.x = 1.06; car.add(sidePodR);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 3.6), accentMat); stripe.position.set(0, 0.74, 0.05); car.add(stripe);

  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.9 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xd9dde8, roughness: 0.25, metalness: 0.65 });
  [[-1,0.32,-1.25],[1,0.32,-1.25],[-1,0.32,1.25],[1,0.32,1.25]].forEach(([x,y,z]) => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.36,0.36,0.3,14), wheelMat); wheel.rotation.z = Math.PI/2; wheel.position.set(x as number,y as number,z as number); car.add(wheel);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.18,0.31,10), rimMat); rim.rotation.z = Math.PI/2; rim.position.set(x as number,y as number,z as number); car.add(rim);
  });
  return car;
}
