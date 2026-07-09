import * as THREE from 'three';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.position = new THREE.Vector3(0, 2, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.direction = new THREE.Vector3(0, 0, 0);

    // Create player mesh
    const geometry = new THREE.CapsuleGeometry(0.5, 2, 4, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      roughness: 0.5,
      metalness: 0.3,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.copy(this.position);
    scene.add(this.mesh);

    // Create head
    const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4a460,
      roughness: 0.4,
      metalness: 0.2,
    });
    this.head = new THREE.Mesh(headGeometry, headMaterial);
    this.head.position.y = 1.3;
    this.head.castShadow = true;
    this.head.receiveShadow = true;
    this.mesh.add(this.head);

    // Movement input
    this.keys = {};
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    this.speed = 0.1;
    this.jumpForce = 0.3;
    this.isGrounded = true;
    this.gravity = 0.01;
  }

  update() {
    // Movement
    const moveDirection = new THREE.Vector3(0, 0, 0);
    if (this.keys['w']) moveDirection.z -= 1;
    if (this.keys['s']) moveDirection.z += 1;
    if (this.keys['a']) moveDirection.x -= 1;
    if (this.keys['d']) moveDirection.x += 1;

    if (moveDirection.length() > 0) {
      moveDirection.normalize();
      this.position.x += moveDirection.x * this.speed;
      this.position.z += moveDirection.z * this.speed;
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

    // Update mesh position
    this.mesh.position.copy(this.position);
  }
}
