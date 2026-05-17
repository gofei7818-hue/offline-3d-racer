import * as THREE from 'three';

export function createEnvironment(): THREE.Group {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.PlaneGeometry(320, 320), new THREE.MeshStandardMaterial({ color: 0x2f7d32, roughness: 1 }))).rotation.x = -Math.PI/2;
  const track = new THREE.Mesh(new THREE.RingGeometry(30, 46, 80), new THREE.MeshStandardMaterial({ color: 0x282c34, side: THREE.DoubleSide })); track.rotation.x=-Math.PI/2; track.position.y=0.03; g.add(track);
  const lane1 = new THREE.Mesh(new THREE.RingGeometry(37.7, 38.3, 80), new THREE.MeshStandardMaterial({ color: 0xdfe6ee, side: THREE.DoubleSide })); lane1.rotation.x=-Math.PI/2; lane1.position.y=0.04; g.add(lane1);
  const curbIn = new THREE.Mesh(new THREE.RingGeometry(29, 30, 80), new THREE.MeshStandardMaterial({ color: 0xca3c3c, side: THREE.DoubleSide })); curbIn.rotation.x=-Math.PI/2; curbIn.position.y=0.035; g.add(curbIn);
  const curbOut = new THREE.Mesh(new THREE.RingGeometry(46, 47, 80), new THREE.MeshStandardMaterial({ color: 0xf8f8f8, side: THREE.DoubleSide })); curbOut.rotation.x=-Math.PI/2; curbOut.position.y=0.035; g.add(curbOut);
  const start = new THREE.Mesh(new THREE.PlaneGeometry(16,1.8), new THREE.MeshStandardMaterial({color:0xffffff})); start.rotation.x=-Math.PI/2; start.position.set(0,0.06,38); g.add(start);
  for(let i=0;i<16;i++){ const a=(i/16)*Math.PI*2; const t=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.55,0.8,10), new THREE.MeshStandardMaterial({color:0x1d1d1d})); t.position.set(Math.cos(a)*48,0.42,Math.sin(a)*48); g.add(t); }
  return g;
}
