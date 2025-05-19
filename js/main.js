// Lighting – use both ambient + stronger point light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // soft global light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2.5); // strong spotlight
pointLight.position.set(0, 0, 0);
scene.add(pointLight);
