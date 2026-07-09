# 💻 Game AI & Enemy Behavior

## 1. Basic Enemy AI

### Patrol & Chase System

```javascript
class Enemy {
  constructor(scene, position) {
    // Create mesh
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.mesh.castShadow = true;
    scene.add(this.mesh);
    
    // AI properties
    this.speed = 0.05;
    this.detectionRange = 20;
    this.state = 'patrol';  // patrol, chase, attack
    this.patrolPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(10, 0, 0),
      new THREE.Vector3(10, 0, 10),
      new THREE.Vector3(0, 0, 10)
    ];
    this.currentPatrolIndex = 0;
  }
  
  update(playerPosition) {
    const distanceToPlayer = this.mesh.position.distanceTo(playerPosition);
    
    if (distanceToPlayer < this.detectionRange) {
      this.state = 'chase';
      this.chase(playerPosition);
    } else {
      this.state = 'patrol';
      this.patrol();
    }
  }
  
  patrol() {
    const target = this.patrolPoints[this.currentPatrolIndex];
    const direction = target.clone().sub(this.mesh.position).normalize();
    this.mesh.position.addScaledVector(direction, this.speed);
    
    if (this.mesh.position.distanceTo(target) < 1) {
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
    }
  }
  
  chase(playerPosition) {
    const direction = playerPosition.clone().sub(this.mesh.position).normalize();
    this.mesh.position.addScaledVector(direction, this.speed * 1.5);
  }
}
```

---

## 2. Pathfinding (A* Algorithm Simplified)

```javascript
class Node {
  constructor(x, y, walkable = true) {
    this.x = x;
    this.y = y;
    this.walkable = walkable;
    this.g = 0;  // Cost from start
    this.h = 0;  // Heuristic to goal
    this.f = 0;  // Total cost
    this.parent = null;
  }
  
  get cost() {
    return this.g + this.h;
  }
}

class Pathfinder {
  constructor(gridWidth, gridHeight) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.grid = this.createGrid();
  }
  
  createGrid() {
    const grid = [];
    for (let x = 0; x < this.gridWidth; x++) {
      grid[x] = [];
      for (let y = 0; y < this.gridHeight; y++) {
        grid[x][y] = new Node(x, y);
      }
    }
    return grid;
  }
  
  findPath(start, goal) {
    const openSet = [start];
    const closedSet = [];
    
    while (openSet.length > 0) {
      let current = openSet[0];
      let currentIndex = 0;
      
      // Find node with lowest f cost
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < current.f) {
          current = openSet[i];
          currentIndex = i;
        }
      }
      
      if (current === goal) {
        return this.reconstructPath(current);
      }
      
      openSet.splice(currentIndex, 1);
      closedSet.push(current);
      
      // Check neighbors
      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        if (closedSet.includes(neighbor) || !neighbor.walkable) continue;
        
        const tentativeG = current.g + 1;
        let newNode = false;
        
        if (!openSet.includes(neighbor)) {
          newNode = true;
        } else if (tentativeG >= neighbor.g) {
          continue;
        }
        
        neighbor.parent = current;
        neighbor.g = tentativeG;
        neighbor.h = this.heuristic(neighbor, goal);
        neighbor.f = neighbor.g + neighbor.h;
        
        if (newNode) {
          openSet.push(neighbor);
        }
      }
    }
    
    return [];  // No path found
  }
  
  getNeighbors(node) {
    const neighbors = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue;
        const newX = node.x + x;
        const newY = node.y + y;
        if (newX >= 0 && newX < this.gridWidth && newY >= 0 && newY < this.gridHeight) {
          neighbors.push(this.grid[newX][newY]);
        }
      }
    }
    return neighbors;
  }
  
  heuristic(node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
  }
  
  reconstructPath(node) {
    const path = [];
    let current = node;
    while (current) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }
}
```

---

## 3. State Machine for AI

```javascript
class StateMachine {
  constructor() {
    this.states = {};
    this.currentState = null;
  }
  
  addState(name, state) {
    this.states[name] = state;
  }
  
  changeState(newStateName) {
    if (this.currentState) {
      this.currentState.exit();
    }
    this.currentState = this.states[newStateName];
    if (this.currentState) {
      this.currentState.enter();
    }
  }
  
  update() {
    if (this.currentState) {
      this.currentState.update();
    }
  }
}

// Example states
const idleState = {
  enter() { console.log('Entering idle'); },
  update() { /* Do nothing */ },
  exit() { console.log('Leaving idle'); }
};

const chaseState = {
  enter() { console.log('Starting chase'); },
  update() { /* Chase player */ },
  exit() { console.log('Chase ended'); }
};

const fsm = new StateMachine();
fsm.addState('idle', idleState);
fsm.addState('chase', chaseState);
fsm.changeState('idle');
```

---

## 4. Behavior Trees (Advanced)

```javascript
class BehaviorNode {
  execute() {
    throw new Error('execute() must be implemented');
  }
}

class Selector extends BehaviorNode {
  constructor(children = []) {
    super();
    this.children = children;
  }
  
  execute() {
    for (const child of this.children) {
      if (child.execute()) return true;
    }
    return false;
  }
}

class Sequence extends BehaviorNode {
  constructor(children = []) {
    super();
    this.children = children;
  }
  
  execute() {
    for (const child of this.children) {
      if (!child.execute()) return false;
    }
    return true;
  }
}

class Action extends BehaviorNode {
  constructor(callback) {
    super();
    this.callback = callback;
  }
  
  execute() {
    return this.callback();
  }
}

// Example behavior tree
const tree = new Selector([
  new Sequence([
    new Action(() => isPlayerNear()),
    new Action(() => { moveToPlayer(); return true; })
  ]),
  new Action(() => { patrol(); return true; })
]);

// Execute tree in game loop
tree.execute();
```

---

## 5. NPC Dialogue System

```javascript
class DialogueTree {
  constructor() {
    this.nodes = {};
    this.currentNode = null;
  }
  
  addNode(id, text, choices) {
    this.nodes[id] = { text, choices };
  }
  
  start(nodeId) {
    this.currentNode = this.nodes[nodeId];
  }
  
  getOptions() {
    return this.currentNode?.choices || [];
  }
  
  chooseOption(index) {
    const option = this.currentNode.choices[index];
    this.currentNode = this.nodes[option.nextNode];
    return this.currentNode?.text;
  }
}

// Build dialogue
const dialogue = new DialogueTree();
dialogue.addNode('start', 'Hello! How are you?', [
  { text: 'I am good', nextNode: 'good' },
  { text: 'I am bad', nextNode: 'bad' }
]);
dialogue.addNode('good', 'That is great!', []);
dialogue.addNode('bad', 'Sorry to hear that', []);

dialogue.start('start');
console.log(dialogue.currentNode.text);
```

---

## 6. Crowd Simulation

```javascript
class Agent {
  constructor(position) {
    this.position = position.clone();
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.desiredVelocity = new THREE.Vector3(0, 0, 0);
    this.maxSpeed = 1;
  }
  
  update(agents, deltaTime) {
    // Steer towards goal
    this.desiredVelocity.copy(this.goal).sub(this.position).normalize().multiplyScalar(this.maxSpeed);
    
    // Avoid collisions with other agents
    for (const agent of agents) {
      if (agent === this) continue;
      const distance = this.position.distanceTo(agent.position);
      if (distance < 2) {  // Collision radius
        const repulsion = this.position.clone().sub(agent.position).normalize();
        this.desiredVelocity.add(repulsion.multiplyScalar(0.5));
      }
    }
    
    // Update velocity and position
    this.velocity.lerp(this.desiredVelocity, 0.1);
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
  }
}

const agents = [];
for (let i = 0; i < 20; i++) {
  agents.push(new Agent(new THREE.Vector3(Math.random() * 20, 0, Math.random() * 20)));
}

function updateCrowd() {
  agents.forEach(agent => agent.update(agents, 0.016));  // 60 FPS
}
```

---

## 7. Vision System

```javascript
class VisionCone {
  constructor(position, direction, range, angle) {
    this.position = position;
    this.direction = direction;
    this.range = range;
    this.angle = angle;  // In degrees
  }
  
  canSee(targetPosition) {
    const vectorToTarget = targetPosition.clone().sub(this.position);
    const distance = vectorToTarget.length();
    
    if (distance > this.range) return false;
    
    const angle = Math.acos(
      this.direction.dot(vectorToTarget.normalize())
    ) * (180 / Math.PI);
    
    return angle < this.angle / 2;
  }
}

const enemyVision = new VisionCone(
  enemy.position,
  enemy.direction,
  20,  // 20 units range
  90   // 90 degree cone
);

if (enemyVision.canSee(player.position)) {
  console.log('Enemy spotted player!');
}
```

---

## 8. Combat System

```javascript
class CombatSystem {
  attack(attacker, defender, damage) {
    defender.health -= damage;
    console.log(`${attacker.name} attacks ${defender.name} for ${damage} damage!`);
    
    if (defender.health <= 0) {
      this.onDefenderDeath(defender);
    }
  }
  
  criticalStrike(attacker, defender, critChance = 0.2) {
    if (Math.random() < critChance) {
      const critDamage = attacker.damage * 2;
      this.attack(attacker, defender, critDamage);
      console.log('CRITICAL HIT!');
    } else {
      this.attack(attacker, defender, attacker.damage);
    }
  }
  
  onDefenderDeath(defender) {
    console.log(`${defender.name} has been defeated!`);
    // Play death animation
    // Reward experience
    // Remove from scene
  }
}

const combat = new CombatSystem();
combat.attack(player, enemy, 25);
```

---

## 9. Loot System

```javascript
class LootTable {
  constructor() {
    this.items = [];
  }
  
  addItem(item, dropChance) {
    this.items.push({ item, dropChance });
  }
  
  roll() {
    for (const entry of this.items) {
      if (Math.random() < entry.dropChance) {
        return entry.item;
      }
    }
    return null;
  }
}

const enemyLoot = new LootTable();
enemyLoot.addItem('Gold Coin', 0.8);
enemyLoot.addItem('Health Potion', 0.3);
enemyLoot.addItem('Legendary Sword', 0.01);

const drop = enemyLoot.roll();
console.log('Dropped:', drop);
```

---

## 10. Quest System

```javascript
class Quest {
  constructor(id, title, description, objectives) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.objectives = objectives;
    this.completed = false;
  }
  
  updateObjective(index) {
    if (index < this.objectives.length) {
      this.objectives[index].completed = true;
    }
    
    if (this.objectives.every(obj => obj.completed)) {
      this.complete();
    }
  }
  
  complete() {
    this.completed = true;
    console.log(`Quest '${this.title}' completed!`);
  }
}

const quest = new Quest('kill-orcs', 'Kill 10 Orcs', 'Defeat the orc army', [
  { description: 'Kill 10 orcs', completed: false },
  { description: 'Return to village', completed: false }
]);
```

---

**Complete AI system for your game! 🎮🧠**
