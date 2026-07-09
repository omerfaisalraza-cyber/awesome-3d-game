# 🎨 Complete Assets Guide

## 📦 Where to Get Free 3D Assets

### ⭐ Best Collections

#### 1. **Open Source 3D Assets** (900+ models)
- **Link**: https://github.com/ToxSam/open-source-3D-assets
- **Browser**: https://opensource3dassets.com
- **Best for**: Professional-quality CC0 models
- **Format**: GLB/glTF
- **License**: CC0 (Public Domain)

#### 2. **Quaternius** (1000s of models)
- **Link**: https://quaternius.com
- **Best for**: Low-poly, game-ready assets
- **Styles**: Medieval, sci-fi, fantasy, modern
- **Format**: FBX, OBJ, glTF
- **License**: Free for commercial use

#### 3. **Sketchfab CC0**
- **Link**: https://sketchfab.com/feed/cc0
- **Best for**: High-quality 3D models
- **Categories**: Characters, creatures, environments
- **Format**: glTF, OBJ
- **License**: CC0

#### 4. **OpenGameArt.org**
- **Link**: https://opengameart.org
- **Best for**: Game-specific assets
- **Categories**: Models, textures, sprites, sounds
- **License**: Various (mostly permissive)

#### 5. **Gamedev Free Resources** (Curated)
- **Link**: https://github.com/teamgravitydev/gamedev-free-resources
- **Best for**: Comprehensive starter pack
- **Includes**: Models, textures, animations, code

---

## 📥 How to Download & Use Models

### Step-by-Step: Quaternius Example

1. **Visit** https://quaternius.com
2. **Browse** models (search by category)
3. **Click** download button
4. **Choose format**: Download as **GLB** (best for web)
5. **Save to**: `assets/models/your-model.glb`
6. **Load in game** (see Code Example below)

### Step-by-Step: Sketchfab Example

1. **Visit** https://sketchfab.com/feed/cc0
2. **Filter**: License → CC0
3. **Click** any model
4. **Download**: Look for download button
5. **Choose**: glTF format
6. **Extract** ZIP file to `assets/models/`

---

## 💻 Code: Loading Models in Three.js

### Basic Model Loading

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const loader = new GLTFLoader();

loader.load('assets/models/character.glb', (gltf) => {
  const model = gltf.scene;
  
  // Position
  model.position.set(0, 0, 0);
  
  // Scale
  model.scale.set(1, 1, 1);
  
  // Add to scene
  scene.add(model);
});
```

### With Loading Bar

```javascript
loader.load(
  'assets/models/character.glb',
  (gltf) => {
    // On success
    scene.add(gltf.scene);
  },
  (xhr) => {
    // On progress
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(percentComplete + '% loaded');
  },
  (error) => {
    // On error
    console.error('Error loading model:', error);
  }
);
```

### With Animation Support

```javascript
loader.load('assets/models/character.glb', (gltf) => {
  const model = gltf.scene;
  const animations = gltf.animations;
  
  // Create mixer for animations
  const mixer = new THREE.AnimationMixer(model);
  
  // Play first animation
  if (animations.length > 0) {
    mixer.clipAction(animations[0]).play();
  }
  
  scene.add(model);
  
  // Update in game loop
  // mixer.update(deltaTime);
});
```

---

## 🎬 Asset Categories

### Characters & NPCs

**Best Sites**:
- Sketchfab (search: "character rigged")
- Mixamo (animations: https://www.mixamo.com/)
- Quaternius (humanoid collection)

**Recommended Models**:
- "Low Poly Character" by Quaternius
- "Rigged Character" on Sketchfab
- "Animated Humanoid" on OpenGameArt

### Environments & Buildings

**Best Sites**:
- Open Source 3D Assets (trees, buildings)
- Quaternius (environment pack)
- Sketchfab (search: "environment")

**Recommended Models**:
- "Forest Trees" (Open Source 3D Assets)
- "Medieval Buildings" (Quaternius)
- "Urban Environment" (Sketchfab)

### Props & Items

**Best Sites**:
- Quaternius (weapons, furniture)
- OpenGameArt (game-specific props)
- Sketchfab (search: "prop")

**Recommended Models**:
- "Weapon Pack" (Quaternius)
- "Furniture Set" (Quaternius)
- "Game Items" (OpenGameArt)

### Particles & Effects

**Best Sites**:
- Sketchfab (search: "particle")
- Game Jam resources
- Custom creation with Three.js

### Textures & Materials

**Best Sites**:
- **Poly Haven** https://polyhaven.com/textures
- **Ambient CG** https://ambientcg.com/
- **OpenGameArt** textures section

**Recommended**:
- PBR texture packs (metallic, roughness maps)
- 2K resolution minimum
- CC0 license

---

## 🎨 Texture Loading in Three.js

### Basic Texture

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

### PBR Textures (Professional Quality)

```javascript
const loader = new TextureLoader();

const baseColor = loader.load('assets/textures/wood_base.jpg');
const normalMap = loader.load('assets/textures/wood_normal.jpg');
const roughnessMap = loader.load('assets/textures/wood_roughness.jpg');
const metalnessMap = loader.load('assets/textures/wood_metalness.jpg');

const material = new THREE.MeshStandardMaterial({
  map: baseColor,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  metalnessMap: metalnessMap
});
```

---

## 🎵 Audio Assets

### Free Audio Sites

1. **Freesound.org** - https://freesound.org
2. **OpenGameArt** - https://opengameart.org (audio section)
3. **Zapsplat** - https://www.zapsplat.com
4. **Pixabay Music** - https://pixabay.com/music/
5. **YouTube Audio Library** (if using YouTube)

### Audio Loading in Three.js

```javascript
const audioListener = new THREE.AudioListener();
const audioLoader = new THREE.AudioLoader();
const sound = new THREE.Audio(audioListener);

audioLoader.load('assets/audio/background-music.mp3', (buffer) => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});
```

---

## ✅ Checklist: Adding Assets to Your Game

- [ ] Create `assets/models/` folder
- [ ] Create `assets/textures/` folder
- [ ] Create `assets/audio/` folder
- [ ] Download models (GLB/glTF format)
- [ ] Download textures (2K PBR recommended)
- [ ] Download audio (MP3 format)
- [ ] Add GLTFLoader import to scene
- [ ] Load model with correct path
- [ ] Position and scale model
- [ ] Add animations if available
- [ ] Test in browser
- [ ] Optimize performance if needed

---

## ⚡ Performance Tips

### Model Optimization
- Use GLB format (compressed)
- Keep polygon count < 100k for web
- Use LOD (Level of Detail) for distant objects
- Remove unused materials/textures

### Texture Optimization
- Use 2K resolution max for web
- Compress PNG/JPG files
- Use WebP format when supported
- Apply mipmaps for better performance

### Loading Optimization
- Lazy load models on demand
- Show loading bar during loading
- Cache loaded models
- Use gltf-transform for optimization

```javascript
// Example: Cache loaded models
const modelCache = {};

function loadModel(path) {
  if (modelCache[path]) {
    return Promise.resolve(modelCache[path]);
  }
  
  return new Promise((resolve) => {
    loader.load(path, (gltf) => {
      modelCache[path] = gltf;
      resolve(gltf);
    });
  });
}
```

---

## 🚀 Asset Pipeline Workflow

1. **Create/Download** asset (Blender, Quaternius, Sketchfab)
2. **Export** as GLB/glTF or FBX
3. **Save** to `assets/` folder
4. **Reference** in code with relative path
5. **Load** using GLTFLoader or TextureLoader
6. **Test** in browser
7. **Optimize** if needed
8. **Deploy** with game

---

## 🎨 Creating Custom Assets with Blender

### Quick Workflow

1. **Open** Blender (free from https://blender.org)
2. **Create** or import model
3. **UV Unwrap** for textures
4. **Paint** textures or import
5. **Export** as GLB
   - File → Export → glTF Binary (.glb)
   - Ensure "Animations" is checked
6. **Test** in Three.js

### Export Settings
```
Format: glTF Binary (.glb)
Animation: YES
Shape Keys: YES (for morphs)
Deformation Bones: YES
```

---

## 📚 Resources

- **Blender Export Guide**: https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html
- **Three.js Loader Examples**: https://threejs.org/examples/?q=gltf
- **glTF Format**: https://www.khronos.org/gltf/

---

**Happy Asset Hunting! 🎨✨**
