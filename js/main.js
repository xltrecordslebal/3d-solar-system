// Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 50, 150);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Add Sun
const sunTexture = textureLoader.load("textures/sun.jpg");
const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planet data
const planetsData = [
  { name: "Mercury", size: 0.38, distance: 15, speed: 0.04, texture: "mercury.jpg" },
  { name: "Venus", size: 0.95, distance: 22, speed: 0.015, texture: "venus.jpg" },
  { name: "Earth", size: 1, distance: 30, speed: 0.01, texture: "earth.jpg" },
  { name: "Mars", size: 0.53, distance: 38, speed: 0.008, texture: "mars.jpg" },
  { name: "Jupiter", size: 11.2, distance: 52, speed: 0.002, texture: "jupiter.jpg" },
  { name: "Saturn", size: 9.45, distance: 65, speed: 0.0018, texture: "saturn.jpg" },
  { name: "Uranus", size: 4.0, distance: 78, speed: 0.001, texture: "uranus.jpg" },
  { name: "Neptune", size: 3.88, distance: 90, speed: 0.0008, texture: "neptune.jpg" }
];

// Store planet objects
const planets = [];

planetsData.forEach(data => {
  const texture = textureLoader.load(`textures/${data.texture}`);
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = data.distance;
  scene.add(mesh);
  planets.push({ mesh, ...data, angle: Math.random() * Math.PI * 2 });
});

// Animation loop
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
