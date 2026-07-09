# 🌟 Advanced Three.js & Game Dev Concepts

## 1. Physics Engine Integration

### Cannon.js Integration (already in package.json)

```javascript
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

// Create physics world
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.defaultContactMaterial.friction = 0.4;

// Create physics body for player
const playerShape = new CANNON.Sphere(0.5);
const playerBody = new CANNON.Body({ mass: 1, shape: playerShape });
playerBody.position.copy(player.position);
world.addBody(playerBody);

// Update in game loop
function updatePhysics() {
  world.step(1 / 60);  // 60 FPS
  player.position.copy(playerBody.position);
}
```

### Raycasting for Interactions

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  if (intersects.length > 0) {
    console.log('Clicked on:', intersects[0].object.name);
  }
});
```

---

## 2. Advanced Lighting

### Shadow Mapping for Better Realism

```javascript
// Directional light with shadows
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
light.castShadow = true;

// Shadow map configuration
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.bias = -0.0001;

scene.add(light);

// Enable shadows on renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;

// Objects must opt-in
mesh.castShadow = true;
mesh.receiveShadow = true;
```

### Point Lights (e.g., torches, lamps)

```javascript
const pointLight = new THREE.PointLight(0xff6b6b, 1, 100);
pointLight.position.set(5, 3, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// Pulsing effect
function pulseLights() {
  pointLight.intensity = 0.8 + Math.sin(Date.now() * 0.001) * 0.2;
}
```

---

## 3. Post-Processing Effects

### Bloom Effect (glowing objects)

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,  // strength
  0.4,  // radius
  0.85  // threshold
);
composer.addPass(bloomPass);

// In game loop:
// composer.render() instead of renderer.render()
```

### Screen Space Ambient Occlusion (SSAO)

```javascript
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';

const ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
ssaoPass.kernelRadius = 16;
composer.addPass(ssaoPass);
```

---

## 4. Particle Systems

### Custom Particle Emitter

```javascript
class ParticleSystem {
  constructor(position, count = 100) {
    this.particles = [];
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true
    });
    
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.mesh = new THREE.Points(this.geometry, this.material);
    this.mesh.position.copy(position);
  }
  
  update(deltaTime) {
    // Move particles up (rise effect)
    const positions = this.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += 0.05;  // Rise
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}

// Usage
const particles = new ParticleSystem(new THREE.Vector3(0, 0, 0));
scene.add(particles.mesh);
```

---

## 5. Animation System

### Model Animation Control

```javascript
const mixer = new THREE.AnimationMixer(model);
const actions = {};

// Store all animations
model.animations.forEach((clip) => {
  actions[clip.name] = mixer.clipAction(clip);
});

// Play animation
function playAnimation(name) {
  Object.values(actions).forEach(action => action.stop());
  actions[name].play();
}

// Update in game loop
const clock = new THREE.Clock();
function updateAnimations() {
  mixer.update(clock.getDelta());
}

// Usage
playAnimation('Walk');
```

### Keyframe Animation (custom)

```javascript
class KeyframeAnimation {
  constructor(object, keyframes, duration) {
    this.object = object;
    this.keyframes = keyframes;
    this.duration = duration;
    this.elapsed = 0;
  }
  
  update(deltaTime) {
    this.elapsed += deltaTime;
    const progress = this.elapsed / this.duration;
    
    if (progress >= 1) {
      this.object.position.copy(this.keyframes[this.keyframes.length - 1]);
      return;
    }
    
    // Linear interpolation between keyframes
    const frameIndex = Math.floor(progress * (this.keyframes.length - 1));
    const nextIndex = Math.min(frameIndex + 1, this.keyframes.length - 1);
    const t = (progress * (this.keyframes.length - 1)) - frameIndex;
    
    this.object.position.lerpVectors(
      this.keyframes[frameIndex],
      this.keyframes[nextIndex],
      t
    );
  }
}
```

---

## 6. LOD (Level of Detail) System

### Optimize Performance for Distant Objects

```javascript
const lod = new THREE.LOD();

// High detail (close)
const highPolyGeometry = new THREE.IcosahedronGeometry(1, 5);
const highPolyMesh = new THREE.Mesh(highPolyGeometry, material);
lod.addLevel(highPolyMesh, 0);

// Medium detail (medium distance)
const mediumPolyGeometry = new THREE.IcosahedronGeometry(1, 3);
const mediumPolyMesh = new THREE.Mesh(mediumPolyGeometry, material);
lod.addLevel(mediumPolyMesh, 50);

// Low detail (far)
const lowPolyGeometry = new THREE.IcosahedronGeometry(1, 1);
const lowPolyMesh = new THREE.Mesh(lowPolyGeometry, material);
lod.addLevel(lowPolyMesh, 100);

scene.add(lod);
```

---

## 7. Skybox & Environment Maps

### Skybox (360° background)

```javascript
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({
  color: 0x87ceeb,
  side: THREE.BackSide
});
const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skyMesh);
```

### Cubemap Skybox

```javascript
const cubeTextureLoader = new THREE.CubeTextureLoader();
const texture = cubeTextureLoader.load([
  'textures/posx.jpg',
  'textures/negx.jpg',
  'textures/posy.jpg',
  'textures/negy.jpg',
  'textures/posz.jpg',
  'textures/negz.jpg'
]);
scene.background = texture;
```

---

## 8. Fog Effects

```javascript
// Linear fog
const fog = new THREE.Fog(0x87ceeb, 0, 100);
scene.fog = fog;

// Exponential fog
const expFog = new THREE.FogExp2(0x87ceeb, 0.002);
scene.fog = expFog;
```

---

## 9. Sound Spatializer

```javascript
class SoundManager {
  constructor(listener) {
    this.listener = listener;
    this.sounds = {};
  }
  
  addSound(name, url, isLoop = false) {
    const audio = new THREE.Audio(this.listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(url, (buffer) => {
      audio.setBuffer(buffer);
      audio.setLoop(isLoop);
      audio.setVolume(0.5);
    });
    this.sounds[name] = audio;
    return audio;
  }
  
  play(name) {
    if (this.sounds[name]) {
      this.sounds[name].play();
    }
  }
  
  stop(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }
  
  setVolume(name, volume) {
    if (this.sounds[name]) {
      this.sounds[name].setVolume(volume);
    }
  }
}
```

---

## 10. Networking (Multiplayer Basics)

### Using Socket.io for Real-Time Data

```bash
npm install socket.io-client
```

```javascript
import io from 'socket.io-client';

const socket = io('https://your-server.com');

// Send player position
socket.emit('playerMove', {
  x: player.position.x,
  y: player.position.y,
  z: player.position.z
});

// Receive other players' positions
socket.on('playerUpdate', (data) => {
  otherPlayer.position.set(data.x, data.y, data.z);
});
```

---

## 11. Save/Load System

```javascript
class GameState {
  static save() {
    const gameData = {
      playerPos: {
        x: player.position.x,
        y: player.position.y,
        z: player.position.z
      },
      score: gameManager.score,
      health: player.health,
      level: currentLevel
    };
    localStorage.setItem('gameState', JSON.stringify(gameData));
  }
  
  static load() {
    const gameData = JSON.parse(localStorage.getItem('gameState'));
    if (gameData) {
      player.position.set(gameData.playerPos.x, gameData.playerPos.y, gameData.playerPos.z);
      gameManager.score = gameData.score;
      player.health = gameData.health;
      currentLevel = gameData.level;
    }
  }
}

// Usage
GameState.save();  // Save on pause
GameState.load();  // Load on resume
```

---

## 12. Performance Profiling

```javascript
class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.frameCount = 0;
    this.lastTime = Date.now();
  }
  
  update() {
    this.frameCount++;
    const now = Date.now();
    if (now >= this.lastTime + 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
      console.log('FPS:', this.fps);
    }
  }
}

const perfMonitor = new PerformanceMonitor();
// Call in game loop: perfMonitor.update();
```

---

**Advanced concepts to level up your game! 🚀**
