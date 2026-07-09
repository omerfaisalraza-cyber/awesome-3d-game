# 🚀 Complete Setup Guide for awesome-3d-game

## Prerequisites
- Node.js 16+ installed
- npm or yarn
- Git
- Code editor (VS Code recommended)

## Local Setup (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/omerfaisalraza-cyber/awesome-3d-game.git
cd awesome-3d-game
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The game will automatically open at `http://localhost:5173`

## Replit Setup (2 minutes)

### 1. Create New Repl
- Visit https://replit.com
- Click **Create Repl**
- Select **Node.js**
- Name: `awesome-3d-game`

### 2. Import from GitHub
```bash
git clone https://github.com/omerfaisalraza-cyber/awesome-3d-game.git .
```

### 3. Install & Run
```bash
npm install
npm run dev
```

### 4. View Game
Click the **"Open in new tab"** button in the Replit preview pane

## Project Structure Explained

```
src/
├── main.js                 # Game entry point, initializes Three.js
├── scenes/
│   └── mainScene.js       # Create lights, ground, demo objects
├── player/
│   └── Player.js          # Player character, controls, physics
├── managers/
│   └── GameManager.js     # Game state, UI, scoring
├── objects/               # Game objects (enemies, items, etc.)
├── utils/                 # Helper functions
└── ui/                    # HUD, menus, UI elements

assets/
├── models/                # 3D models (glTF, FBX)
├── textures/              # Texture files (PNG, JPG)
├── audio/                 # Music & sound effects
└── animations/            # Animation files

public/                    # Static files served as-is
vite.config.js             # Vite build configuration
package.json               # Project dependencies
.gitignore                 # Git ignore rules
```

## Adding 3D Models

### 1. Download a Model
- Visit https://quaternius.com or https://sketchfab.com/feed/cc0
- Download in **glTF** or **GLB** format
- Save to `assets/models/`

### 2. Load in Game

Add to `src/scenes/mainScene.js`:

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('assets/models/character.glb', (gltf) => {
  const model = gltf.scene;
  model.position.set(0, 0, 0);
  scene.add(model);
});
```

## Adding Textures

### 1. Place Texture Files
Add PNG/JPG files to `assets/textures/`

### 2. Use in Material

```javascript
import { TextureLoader } from 'three';

const textureLoader = new TextureLoader();
const texture = textureLoader.load('assets/textures/wood.jpg');

const material = new THREE.MeshStandardMaterial({
  map: texture,
  roughness: 0.8,
  metalness: 0.2
});
```

## Adding Audio

### 1. Place Audio Files
Add MP3/OGG files to `assets/audio/`

### 2. Create Audio Manager

```javascript
import * as THREE from 'three';

export class AudioManager {
  constructor() {
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
  }

  playMusic(url) {
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(url, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      this.sound.play();
    });
  }
}
```

## Building for Production

```bash
npm run build
```

This creates an optimized `dist/` folder for deployment.

### Deploy to Netlify (Free)

1. `npm run build`
2. Go to https://netlify.com
3. Drag & drop the `dist/` folder
4. Get instant live URL!

### Deploy to Vercel (Free)

1. Connect GitHub repo
2. Select `awesome-3d-game`
3. Vercel auto-deploys on push

## Common Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Troubleshooting

### "Cannot find module 'three'"
```bash
npm install three
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Models not loading
- Check file path in code
- Verify file exists in `assets/models/`
- Check browser console for errors
- Try relative path: `./assets/models/file.glb`

### Textures appear blurry
- Use high-resolution textures (2K or 4K)
- Enable texture filtering:
  ```javascript
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  ```

## Next Steps

1. ✅ Run the game and see it work
2. ✅ Modify the player color/size
3. ✅ Add a new 3D object to the scene
4. ✅ Load a model from Quaternius
5. ✅ Create your first game mechanic
6. ✅ Deploy to Netlify or Vercel

## Learning Resources

- **Three.js Docs**: https://threejs.org/docs/
- **Three.js Journey**: https://threejs-journey.com/
- **YouTube**: Search "Three.js beginner tutorial"
- **Babylon.js**: https://www.babylonjs.com/playground/

## Need Help?

- Check browser console for errors (F12)
- Read error messages carefully
- Search GitHub issues
- Ask in r/gamedev or gamedev communities

---

**Happy Game Making! 🎮**
