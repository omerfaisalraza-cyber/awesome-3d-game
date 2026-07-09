import * as THREE from 'three';
import { createScene } from './scenes/mainScene.js';
import { Player } from './player/Player.js';
import { GameManager } from './managers/GameManager.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;
document.body.appendChild(renderer.domElement);

// Initialize game
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const gameManager = new GameManager(scene, camera, renderer);
const player = new Player(scene);

// Create main scene
createScene(scene);

// Handle window resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Game loop
function animate() {
  requestAnimationFrame(animate);

  // Update game logic
  gameManager.update();
  player.update();

  // Render scene
  renderer.render(scene, camera);
}

animate();

console.log('🎮 Game initialized! Welcome to Awesome 3D Game');
