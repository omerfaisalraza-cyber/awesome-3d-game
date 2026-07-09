import * as THREE from 'three';

export class GameManager {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.deltaTime = 0;
    this.lastTime = Date.now();
    this.score = 0;
    this.isRunning = true;

    // Create UI
    this.createUI();
  }

  createUI() {
    const uiDiv = document.createElement('div');
    uiDiv.id = 'game-ui';
    uiDiv.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      color: white;
      font-family: Arial, sans-serif;
      font-size: 24px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
      z-index: 100;
    `;
    uiDiv.innerHTML = `
      <div>Score: <span id="score">0</span></div>
      <div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">
        Controls: WASD to move, SPACE to jump
      </div>
    `;
    document.body.appendChild(uiDiv);
    this.scoreElement = document.getElementById('score');
  }

  update() {
    const currentTime = Date.now();
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Update score
    this.score += this.deltaTime * 10;
    this.scoreElement.textContent = Math.floor(this.score);

    // Game logic updates go here
  }

  addScore(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
  }
}
