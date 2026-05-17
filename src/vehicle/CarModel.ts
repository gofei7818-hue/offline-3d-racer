import * as THREE from 'three';

export function createCarModel(): THREE.Group {
  const car = new THREE.Group();
  const red = new THREE.MeshStandardMaterial({ color: 0xd90429, metalness: 0.25, roughness: 0.45 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x101116, roughness: 0.8 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
  car.add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 4.5), red)).position.set(0,0.6,0);
  car.add(new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.45, 1.3), dark)).position.set(0,0.95,-0.6);
  car.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 0.45), accent)).position.set(0,0.48,-2.35);
  car.add(new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.3, 10), red)).position.set(0,0.55,-2.7);
  car.children[car.children.length-1].rotation.x = Math.PI/2;
  car.add(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.15, 0.5), red)).position.set(0,1.0,2.2);
  const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.12,0.35,0.12), dark); post1.position.set(-0.65,0.82,2.2); car.add(post1);
  const post2 = post1.clone(); post2.position.x = 0.65; car.add(post2);
  const wGeo = new THREE.CylinderGeometry(0.34,0.34,0.3,14);
  [[-0.95,0.33,-1.6],[0.95,0.33,-1.6],[-0.95,0.33,1.6],[0.95,0.33,1.6]].forEach(([x,y,z])=>{const w=new THREE.Mesh(wGeo,dark);w.rotation.z=Math.PI/2;w.position.set(x as number,y as number,z as number);car.add(w);});
  return car;
}
