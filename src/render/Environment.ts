import * as THREE from 'three';

export function createEnvironment(): THREE.Group {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.MeshStandardMaterial({ color: 0x12351f, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 80),
    new THREE.MeshStandardMaterial({ color: 0x202632, roughness: 0.9 })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.y = 0.02;
  group.add(road);

  return group;
}
