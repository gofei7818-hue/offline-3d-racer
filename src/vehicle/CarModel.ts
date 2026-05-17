import * as THREE from 'three';

export function createCarModel(): THREE.Group {
  const car = new THREE.Group();
  car.name = 'player-car-placeholder';

  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.55 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.8 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 4.2), bodyMaterial);
  body.position.y = 0.55;
  car.add(body);

  const cockpit = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.55, 1.45), darkMaterial);
  cockpit.position.set(0, 0.98, -0.25);
  car.add(cockpit);

  const wheelGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.32, 18);
  const wheelPositions: Array<[number, number, number]> = [
    [-1.15, 0.34, -1.35],
    [1.15, 0.34, -1.35],
    [-1.15, 0.34, 1.35],
    [1.15, 0.34, 1.35]
  ];

  for (const [x, y, z] of wheelPositions) {
    const wheel = new THREE.Mesh(wheelGeometry, darkMaterial);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, y, z);
    car.add(wheel);
  }

  return car;
}
