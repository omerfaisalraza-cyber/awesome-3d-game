# 📖 Best Practices & Clean Code Guide

## 1. Code Organization

### Folder Structure
```
src/
├── main.js                  # Entry point
├── scenes/                   # Scene managers
│   ├── mainScene.js
│   └── gameScene.js
├── player/                   # Player-related code
│   └── Player.js
├── enemies/                  # Enemy classes
│   ├── Enemy.js
│   └── Boss.js
├── systems/                  # Game systems
│   ├── GameManager.js
│   ├── AudioManager.js
│   ├── InputManager.js
│   └── CollisionManager.js
├── objects/                  # Reusable game objects
│   ├── Coin.js
│   ├── Projectile.js
│   └── PowerUp.js
├── utils/                    # Helper functions
│   ├── math.js
│   ├── physics.js
│   └── constants.js
├── ui/                      # UI components
│   ├── HUD.js
│   ├── Menu.js
│   └── Pause.js
└── config/                   # Configuration
    ├── settings.js
    └── colors.js
```

---

## 2. Design Patterns

### Singleton Pattern (for managers)
```javascript
class GameManager {
  static instance = null;
  
  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }
  
  constructor() {
    if (GameManager.instance) {
      throw new Error('Use GameManager.getInstance()');
    }
  }
}

// Usage
const gameManager = GameManager.getInstance();
```

### Factory Pattern (for creating objects)
```javascript
class EntityFactory {
  static createEnemy(type, position) {
    switch(type) {
      case 'zombie':
        return new Zombie(position);
      case 'goblin':
        return new Goblin(position);
      case 'boss':
        return new BossEnemy(position);
      default:
        throw new Error('Unknown enemy type');
    }
  }
}

// Usage
const enemy = EntityFactory.createEnemy('zombie', playerPos);
```

### Observer Pattern (for events)
```javascript
class EventSystem {
  constructor() {
    this.listeners = {};
  }
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  
  emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}

// Usage
const events = new EventSystem();
events.on('coinCollected', (coin) => {
  console.log('Collected:', coin);
});
events.emit('coinCollected', { value: 10 });
```

---

## 3. Naming Conventions

```javascript
// Classes: PascalCase
class PlayerCharacter { }
class EnemyAI { }

// Functions/Methods: camelCase
function updateGameState() { }
player.takeDamage(25);

// Constants: UPPER_SNAKE_CASE
const MAX_HEALTH = 100;
const PLAYER_SPEED = 5;
const GRAVITY_FORCE = 9.81;

// Private members: _leadingUnderscore
class Game {
  _secretValue = 42;  // Indicates private
  _privateMethod() { }
}

// Boolean methods: is/has prefix
function isPlayerAlive() { }
function hasEnoughMana() { }
function canAttack() { }
```

---

## 4. Code Comments

### Bad Comments (Don't do this)
```javascript
// Increment i
i++;

// Loop through array
for (const item of items) { }
```

### Good Comments
```javascript
// Calculate knockback direction to push enemy away from player
const knockbackDir = enemy.position.sub(player.position).normalize();

// Only process visible enemies to optimize performance
visibleEnemies.forEach(enemy => updateAI(enemy));

// TODO: Implement multiplayer synchronization
// FIXME: Camera jitter when moving diagonally
// NOTE: This is a workaround for Three.js shadow bug
```

---

## 5. Error Handling

```javascript
// Good error handling
function loadModel(path) {
  if (!path) {
    console.error('Model path is required');
    return null;
  }
  
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => resolve(gltf),
      undefined,
      (error) => {
        console.error(`Failed to load model: ${path}`, error);
        reject(error);
      }
    );
  });
}

// Usage
try {
  const model = await loadModel('./models/player.glb');
  scene.add(model.scene);
} catch (error) {
  console.error('Game initialization failed:', error);
}
```

---

## 6. Performance Optimization

### Cache Objects
```javascript
// Bad: Creates new vector every frame
function update() {
  const direction = new THREE.Vector3(0, 0, 1);
  player.position.add(direction);
}

// Good: Reuse vector
class Player {
  constructor() {
    this.moveDirection = new THREE.Vector3(0, 0, 0);
  }
  
  update() {
    this.moveDirection.set(0, 0, 1);
    this.position.add(this.moveDirection);
  }
}
```

### Avoid Unnecessary Calculations
```javascript
// Bad: Distance calculated every frame
for (const enemy of enemies) {
  if (player.position.distanceTo(enemy.position) < 5) {
    // Attack
  }
}

// Good: Cache squared distance
for (const enemy of enemies) {
  const distSq = player.position.distanceToSquared(enemy.position);
  if (distSq < 25) {  // 5^2 = 25
    // Attack
  }
}
```

### Use Object Pooling
```javascript
class BulletPool {
  constructor(size = 100) {
    this.available = [];
    this.inUse = [];
    
    for (let i = 0; i < size; i++) {
      this.available.push(new Bullet());
    }
  }
  
  get() {
    const bullet = this.available.pop() || new Bullet();
    this.inUse.push(bullet);
    return bullet;
  }
  
  release(bullet) {
    const index = this.inUse.indexOf(bullet);
    if (index > -1) {
      this.inUse.splice(index, 1);
      this.available.push(bullet);
    }
  }
}
```

---

## 7. Testing

```bash
npm install --save-dev vitest
```

```javascript
// player.test.js
import { describe, it, expect } from 'vitest';
import { Player } from './Player.js';

describe('Player', () => {
  it('should move forward', () => {
    const player = new Player();
    const initialZ = player.position.z;
    player.moveForward();
    expect(player.position.z).toBeLessThan(initialZ);
  });
  
  it('should take damage', () => {
    const player = new Player();
    const initialHealth = player.health;
    player.takeDamage(10);
    expect(player.health).toBe(initialHealth - 10);
  });
  
  it('should die when health <= 0', () => {
    const player = new Player();
    player.takeDamage(200);
    expect(player.isDead()).toBe(true);
  });
});
```

---

## 8. Documentation

```javascript
/**
 * Player class for controlling the main character
 * @class Player
 */
class Player {
  /**
   * Create a new player
   * @param {THREE.Scene} scene - The game scene
   * @param {THREE.Vector3} position - Starting position
   */
  constructor(scene, position) { }
  
  /**
   * Move player in the given direction
   * @param {THREE.Vector3} direction - Movement direction
   * @param {number} speed - Movement speed
   * @returns {void}
   */
  move(direction, speed) { }
  
  /**
   * Apply damage to the player
   * @param {number} amount - Damage amount
   * @throws {Error} If amount is negative
   */
  takeDamage(amount) {
    if (amount < 0) {
      throw new Error('Damage amount cannot be negative');
    }
  }
}
```

---

## 9. Debugging Tips

```javascript
// Log with context
console.log('[GameManager]', 'Level started:', level);
console.warn('[Physics]', 'Collision detected:', object1, object2);
console.error('[Player]', 'Health below 0:', player.health);

// Use debugger
function complexCalculation() {
  debugger;  // Execution pauses here when DevTools open
  // Your code
}

// Conditional breakpoints
if (suspect > 100) {
  debugger;  // Only pauses if condition is true
}

// Performance monitoring
const start = performance.now();
// Heavy operation
const end = performance.now();
console.log(`Operation took ${end - start}ms`);
```

---

## 10. Version Control Best Practices

```bash
# Write meaningful commit messages
git commit -m "feat: add enemy AI system"
git commit -m "fix: resolve player collision with terrain"
git commit -m "refactor: reorganize folder structure"
git commit -m "docs: update README with setup instructions"

# Use branches for features
git checkout -b feature/coin-system
git commit -m "feat: implement coin collection"
git push origin feature/coin-system
# Create PR, review, merge

# Keep main stable
git checkout main
git pull
```

---

**Write clean, maintainable code! 📚✨**
