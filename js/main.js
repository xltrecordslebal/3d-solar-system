// Planet data
const planetsData = [
  { name: "Mercury", size: 0.38, distance: 4, speed: 0.02, color: 0xaaaaaa },
  { name: "Venus", size: 0.95, distance: 7, speed: 0.015, color: 0xffcc66 },
  { name: "Earth", size: 1, distance: 10, speed: 0.01, color: 0x3399ff },
  { name: "Mars", size: 0.53, distance: 13, speed: 0.008, color: 0xff6633 },
  { name: "Jupiter", size: 11.2, distance: 17, speed: 0.005, color: 0xffcc99 },
  { name: "Saturn", size: 9.45, distance: 22, speed: 0.003, color: 0xffddaa },
  { name: "Uranus", size: 4.01, distance: 26, speed: 0.002, color: 0x66ccff },
  { name: "Neptune", size: 3.88, distance: 30, speed: 0.001, color: 0x3366cc }
];

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(0, 0, 0);
scene.add(light);

// Sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create planets
const planets = [];

planetsData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = data.distance;
  scene.add(mesh);
  planets.push({ mesh, ...data, angle: 0 });
});

camera.position.z = 50;

// Animate
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.001;

  planets.forEach(p => {
    p.angle += p.speed;
    p.mesh.position.x = Math.cos(p.angle) * p.distance;
    p.mesh.position.z = Math.sin(p.angle) * p.distance;
    p.mesh.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
