# 📖 Tutorial: Build Your First 3D Game Step-By-Step

## Project: Simple Exploration Game

**What you'll build**: A 3D world where you can walk around, collect coins, and enjoy the scenery.

**Time**: 30-45 minutes

---

## Step 1: Start with Clean Code (5 min)

Update `src/main.js`:

```javascript
import * as THREE from 'three';
import { createGameScene } from './scenes/gameScene.js';
import { Player } from './player/Player.js';
import { CoinCollector } from './systems/CoinCollector.js';

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
document.body.appendChild(renderer.domElement);

// Initialize game
camera.position.set(0, 5, 10);
const player = new Player(scene);
const coinCollector = new CoinCollector(scene);

createGameScene(scene);

// Game loop
function animate() {
  requestAnimationFrame(animate);
  player.update();
  coinCollector.update(player.mesh.position);
  renderer.render(scene, camera);
}

animate();
console.log('🎮 Game started!');
```

---

## Step 2: Create the Game Scene (5 min)

Create `src/scenes/gameScene.js`:

```javascript
import * as THREE from 'three';

export function createGameScene(scene) {
  // Sky
  scene.background = new THREE.Color(0x87ceeb);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  
  const sun = new THREE.DirectionalLight(0xffffff, 0.8);
  sun.position.set(20, 30, 10);
  sun.castShadow = true;
  scene.add(sun);
  
  // Ground
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d5016,
    roughness: 1
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  
  // Trees (obstacles)
  for (let i = 0; i < 10; i++) {
    const tree = createTree();
    tree.position.set(
      (Math.random() - 0.5) * 80,
      0,
      (Math.random() - 0.5) * 80
    );
    scene.add(tree);
  }
}

function createTree() {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.7, 5, 8),
    new THREE.MeshStandardMaterial({ color: 0x8b4513 })
  );
  
  const foliage = new THREE.Mesh(
    new THREE.SphereGeometry(3, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x228b22 })
  );
  foliage.position.y = 4;
  
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  foliage.castShadow = true;
  foliage.receiveShadow = true;
  
  trunk.add(foliage);
  return trunk;
}
```

---

## Step 3: Create Coin System (5 min)

Create `src/systems/CoinCollector.js`:

```javascript
import * as THREE from 'three';

export class CoinCollector {
  constructor(scene) {
    this.scene = scene;
    this.coins = [];
    this.score = 0;
    
    // Create UI
    this.scoreUI = document.createElement('div');
    this.scoreUI.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      color: white;
      font-size: 32px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
    `;
    document.body.appendChild(this.scoreUI);
    
    // Spawn coins
    this.spawnCoins(15);
  }
  
  spawnCoins(count) {
    for (let i = 0; i < count; i++) {
      const coin = this.createCoin();
      coin.position.set(
        (Math.random() - 0.5) * 80,
        1,
        (Math.random() - 0.5) * 80
      );
      this.scene.add(coin);
      this.coins.push(coin);
    }
  }
  
  createCoin() {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2
    });
    const coin = new THREE.Mesh(geometry, material);
    coin.castShadow = true;
    coin.collected = false;
    return coin;
  }
  
  update(playerPosition) {
    for (let i = this.coins.length - 1; i >= 0; i--) {
      const coin = this.coins[i];
      
      // Rotate coin
      coin.rotation.y += 0.05;
      coin.position.y += Math.sin(Date.now() * 0.005) * 0.01;
      
      // Check collision
      if (playerPosition.distanceTo(coin.position) < 2) {
        this.collectCoin(i);
      }
    }
    
    this.scoreUI.textContent = `Coins: ${this.score}`;
  }
  
  collectCoin(index) {
    this.scene.remove(this.coins[index]);
    this.coins.splice(index, 1);
    this.score++;
    console.log('Coin collected! Total:', this.score);
  }
}
```

---

## Step 4: Enhance Player Controller (5 min)

Update `src/player/Player.js`:

```javascript
import * as THREE from 'three';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.position = new THREE.Vector3(0, 1, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.keys = {};
    
    // Create player mesh
    const geometry = new THREE.CapsuleGeometry(0.5, 2, 4, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      roughness: 0.5,
      metalness: 0.3
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.position.copy(this.position);
    scene.add(this.mesh);
    
    // Input handling
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
    
    // Physics
    this.speed = 0.15;
    this.jumpForce = 0.4;
    this.gravity = 0.015;
    this.isGrounded = true;
  }
  
  update() {
    // Movement
    const direction = new THREE.Vector3(0, 0, 0);
    if (this.keys['w']) direction.z -= 1;
    if (this.keys['s']) direction.z += 1;
    if (this.keys['a']) direction.x -= 1;
    if (this.keys['d']) direction.x += 1;
    
    if (direction.length() > 0) {
      direction.normalize();
      this.position.x += direction.x * this.speed;
      this.position.z += direction.z * this.speed;
      
      // Bounds checking
      this.position.x = Math.max(-45, Math.min(45, this.position.x));
      this.position.z = Math.max(-45, Math.min(45, this.position.z));
    }
    
    // Jump
    if (this.keys[' '] && this.isGrounded) {
      this.velocity.y = this.jumpForce;
      this.isGrounded = false;
    }
    
    // Gravity
    this.velocity.y -= this.gravity;
    this.position.y += this.velocity.y;
    
    // Ground collision
    if (this.position.y <= 1) {
      this.position.y = 1;
      this.velocity.y = 0;
      this.isGrounded = true;
    }
    
    this.mesh.position.copy(this.position);
  }
}
```

---

## Step 5: Test & Run (5 min)

```bash
npm install
npm run dev
```

**What you should see**:
- Green ground
- Blue player character
- 10 trees scattered around
- 15 golden coins spinning
- Coin counter in top-left

**Controls**:
- WASD to move
- SPACE to jump
- Walk into coins to collect

---

## Step 6: Challenges (10-15 min)

### Challenge 1: Add Sound Effect on Coin Collect

```javascript
// In CoinCollector.js, add:
this.collectSound = new Audio('./assets/audio/coin.mp3');

// In collectCoin():
this.collectSound.currentTime = 0;
this.collectSound.play();
```

### Challenge 2: Add Enemy

```javascript
// Create src/enemies/SimpleEnemy.js
export class SimpleEnemy {
  constructor(scene, position) {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    scene.add(this.mesh);
    
    this.direction = 1;
  }
  
  update() {
    this.mesh.position.x += this.direction * 0.03;
    if (Math.abs(this.mesh.position.x) > 20) {
      this.direction *= -1;
    }
  }
}
```

### Challenge 3: Add Game Over When Hit by Enemy

```javascript
// Check distance to enemy
if (player.position.distanceTo(enemy.position) < 1.5) {
  alert('Game Over! You were caught!');
  location.reload();
}
```

---

## Step 7: Deploy (5 min)

```bash
# Build
npm run build

# Deploy to Netlify (drag dist/ folder)
# Or deploy to Vercel (auto from GitHub)
```

**Share your game URL with friends!**

---

## Next Ideas

- Add more coins at random locations
- Add NPCs that talk
- Add power-ups
- Add puzzles
- Add different levels
- Add leaderboard
- Add multiplayer

---

**Congratulations! You've built your first 3D game! 🎉🎮**
