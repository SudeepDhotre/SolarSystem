import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import sunTexture from '/img/sun.jpg';
import mercuryTexture from '/img/mercury.jpg';
import venusTexture from '/img/venus.jpg';
import earthTexture from '/img/earth.jpg';
import marsTexture from '/img/mars.jpg';
import jupiterTexture from '/img/jupiter.jpg';
import saturnTexture from '/img/saturn.jpg';
import uranusTexture from '/img/uranus.jpg';
import neptuneTexture from '/img/neptune.jpg';
import plutoTexture from '/img/pluto.jpg';

// Planet data
const planetInfo = {
  sun: {
    name: "The Sun",
    type: "Star",
    diameter: "1,391,000 km",
    distance: "0 AU (Center of Solar System)",
    dayLength: "25-35 Earth days (varies by latitude)",
    yearLength: "N/A",
    description: "The Sun is the star at the center of our Solar System. It's a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field."
  },
  mercury: {
    name: "Mercury",
    type: "Terrestrial Planet",
    diameter: "4,880 km",
    distance: "0.39 AU from Sun",
    dayLength: "176 Earth days",
    yearLength: "88 Earth days",
    description: "Mercury is the smallest and innermost planet in the Solar System. It has a cratered surface similar to the Moon and has no atmosphere to retain heat."
  },
  venus: {
    name: "Venus",
    type: "Terrestrial Planet",
    diameter: "12,104 km",
    distance: "0.72 AU from Sun",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It has a thick atmosphere that traps heat, making it the hottest planet in our solar system."
  },
  earth: {
    name: "Earth",
    type: "Terrestrial Planet",
    diameter: "12,756 km",
    distance: "1 AU from Sun",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has one natural satellite, the Moon."
  },
  mars: {
    name: "Mars",
    type: "Terrestrial Planet",
    diameter: "6,792 km",
    distance: "1.52 AU from Sun",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    description: "Mars is the fourth planet from the Sun. Known as the Red Planet due to iron oxide on its surface, Mars has two small moons and features valleys, deserts, and polar ice caps."
  },
  jupiter: {
    name: "Jupiter",
    type: "Gas Giant",
    diameter: "139,820 km",
    distance: "5.2 AU from Sun",
    dayLength: "9.93 hours",
    yearLength: "11.86 Earth years",
    description: "Jupiter is the largest planet in our Solar System. It's a gas giant primarily composed of hydrogen and helium, with a strong magnetic field and dozens of moons."
  },
  saturn: {
    name: "Saturn",
    type: "Gas Giant",
    diameter: "116,460 km",
    distance: "9.5 AU from Sun",
    dayLength: "10.7 hours",
    yearLength: "29.5 Earth years",
    description: "Saturn is the sixth planet from the Sun and is famous for its spectacular ring system. Like Jupiter, it's a gas giant with many moons."
  },
  uranus: {
    name: "Uranus",
    type: "Ice Giant",
    diameter: "50,724 km",
    distance: "19.8 AU from Sun",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    description: "Uranus is the seventh planet from the Sun. It's an ice giant that rotates on its side, giving it extreme seasonal variations."
  },
  neptune: {
    name: "Neptune",
    type: "Ice Giant",
    diameter: "49,244 km",
    distance: "30.1 AU from Sun",
    dayLength: "16.1 hours",
    yearLength: "165 Earth years",
    description: "Neptune is the eighth and farthest known planet from the Sun. It's an ice giant with a dynamic atmosphere featuring visible weather patterns."
  }
};

const textureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Create planets with original materials and highlighted materials
function createPlanet(name, size, texture, position, parentObj) {
  const geometry = new THREE.SphereGeometry(size, 30, 30);
  const regularMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(texture)
  });
  const highlightMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(texture),
    emissive: new THREE.Color(0x555555),
    emissiveMap: textureLoader.load(texture)
  });
  
  const planet = new THREE.Mesh(geometry, regularMaterial);
  planet.position.x = position;
  planet.userData = {
    name: name,
    regularMaterial: regularMaterial,
    highlightMaterial: highlightMaterial,
    originalScale: new THREE.Vector3(1, 1, 1)
  };
  
  if (parentObj) {
    parentObj.add(planet);
  }
  
  return planet;
}

// Create planet objects
const sunObj = new THREE.Object3D();
scene.add(sunObj);
const sun = createPlanet('sun', 25, sunTexture, 0, sunObj);

const mercuryObj = new THREE.Object3D();
scene.add(mercuryObj);
const mercury = createPlanet('mercury', 2, mercuryTexture, 35, mercuryObj);

const venusObj = new THREE.Object3D();
scene.add(venusObj);
const venus = createPlanet('venus', 2, venusTexture, 40, venusObj);

const earthObj = new THREE.Object3D();
scene.add(earthObj);
const earth = createPlanet('earth', 3, earthTexture, 50, earthObj);

const marsObj = new THREE.Object3D();
scene.add(marsObj);
const mars = createPlanet('mars', 3.5, marsTexture, 60, marsObj);

const jupiterObj = new THREE.Object3D();
scene.add(jupiterObj);
const jupiter = createPlanet('jupiter', 10, jupiterTexture, 80, jupiterObj);

const saturnObj = new THREE.Object3D();
scene.add(saturnObj);
const saturn = createPlanet('saturn', 7, saturnTexture, 110, saturnObj);

const uranusObj = new THREE.Object3D();
scene.add(uranusObj);
const uranus = createPlanet('uranus', 4, uranusTexture, 125, uranusObj);

const neptuneObj = new THREE.Object3D();
scene.add(neptuneObj);
const neptune = createPlanet('neptune', 3, neptuneTexture, 135, neptuneObj);

// Create a list of all planets for raycasting
const planets = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
const planetObjs = [sunObj, mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj, uranusObj, neptuneObj];

camera.position.set(0, 0, 150);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.05;

// Create info panel
const infoPanel = document.createElement('div');
infoPanel.style.position = 'absolute';
infoPanel.style.bottom = '20px';
infoPanel.style.left = '20px';
infoPanel.style.width = '300px';
infoPanel.style.padding = '15px';
infoPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
infoPanel.style.color = 'white';
infoPanel.style.borderRadius = '10px';
infoPanel.style.fontFamily = 'Arial, sans-serif';
infoPanel.style.display = 'none';
infoPanel.style.zIndex = '1000';
infoPanel.style.backdropFilter = 'blur(5px)';
infoPanel.style.boxShadow = '0 4px 8px rgba(0, 0, 255, 0.3)';
document.body.appendChild(infoPanel);

// Close button for info panel
const closeButton = document.createElement('button');
closeButton.textContent = 'X';
closeButton.style.position = 'absolute';
closeButton.style.right = '10px';
closeButton.style.top = '10px';
closeButton.style.background = 'transparent';
closeButton.style.border = 'none';
closeButton.style.color = 'white';
closeButton.style.cursor = 'pointer';
closeButton.style.fontSize = '16px';
closeButton.style.fontWeight = 'bold';
closeButton.addEventListener('click', () => {
  infoPanel.style.display = 'none';
});
infoPanel.appendChild(closeButton);

// Set up raycaster for mouse interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredPlanet = null;
let selectedPlanet = null;

function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Reset previously hovered planet
  if (hoveredPlanet && hoveredPlanet !== selectedPlanet) {
    hoveredPlanet.material = hoveredPlanet.userData.regularMaterial;
    hoveredPlanet.scale.copy(hoveredPlanet.userData.originalScale);
  }
  
  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);
  
  // Find intersections with planets
  const intersects = raycaster.intersectObjects(planets);
  
  if (intersects.length > 0) {
    hoveredPlanet = intersects[0].object;
    
    // Only highlight if it's not the selected planet
    if (hoveredPlanet !== selectedPlanet) {
      hoveredPlanet.material = hoveredPlanet.userData.highlightMaterial;
      // Scale up slightly to indicate hover
      hoveredPlanet.scale.set(1.05, 1.05, 1.05);
    }
    document.body.style.cursor = 'pointer';
  } else {
    hoveredPlanet = null;
    document.body.style.cursor = 'auto';
  }
}

function onClick(event) {
  // Reset previously selected planet
  if (selectedPlanet) {
    selectedPlanet.material = selectedPlanet.userData.regularMaterial;
    selectedPlanet.scale.copy(selectedPlanet.userData.originalScale);
  }
  
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Find intersections with planets
  const intersects = raycaster.intersectObjects(planets);
  
  if (intersects.length > 0) {
    selectedPlanet = intersects[0].object;
    selectedPlanet.material = selectedPlanet.userData.highlightMaterial;
    // Scale up to indicate selection
    selectedPlanet.scale.set(1.1, 1.1, 1.1);
    
    // Display information panel
    const planetName = selectedPlanet.userData.name;
    const info = planetInfo[planetName];
    
    infoPanel.innerHTML = `
      <button style="position: absolute; right: 10px; top: 10px; background: transparent; border: none; color: white; cursor: pointer; font-size: 16px; font-weight: bold;">X</button>
      <h2 style="margin-top: 0; color: #4da6ff;">${info.name}</h2>
      <p><strong>Type:</strong> ${info.type}</p>
      <p><strong>Diameter:</strong> ${info.diameter}</p>
      <p><strong>Distance:</strong> ${info.distance}</p>
      <p><strong>Day Length:</strong> ${info.dayLength}</p>
      <p><strong>Year Length:</strong> ${info.yearLength}</p>
      <p>${info.description}</p>
    `;
    
    // Re-add the event listener to the new close button
    infoPanel.querySelector('button').addEventListener('click', () => {
      infoPanel.style.display = 'none';
      if (selectedPlanet) {
        selectedPlanet.material = selectedPlanet.userData.regularMaterial;
        selectedPlanet.scale.copy(selectedPlanet.userData.originalScale);
        selectedPlanet = null;
      }
    });
    
    infoPanel.style.display = 'block';
  } else {
    selectedPlanet = null;
    infoPanel.style.display = 'none';
  }
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add event listeners
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onClick, false);
window.addEventListener('resize', onWindowResize, false);

function animate() {
  // Rotate planets around the sun
  sun.rotation.z += 0.01;
  mercuryObj.rotation.z += 0.002;
  venusObj.rotation.z += 0.003;
  earthObj.rotation.z += 0.0025;
  marsObj.rotation.z += 0.0022;
  jupiterObj.rotation.z += 0.0005;
  saturnObj.rotation.z += 0.0008;
  uranusObj.rotation.z += 0.0007;
  neptuneObj.rotation.z += 0.0005;
  
  // Also rotate planets on their axes
  planets.forEach(planet => {
    planet.rotation.y += 0.01;
  });
  
  orbit.update();
  renderer.render(scene, camera);
}