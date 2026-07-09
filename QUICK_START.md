# ⚡ 5-Minute Quick Start

## What You'll Have After 5 Minutes
✅ 3D game running locally  
✅ Player character you can control  
✅ Complete dev environment  
✅ Ready to add your own assets  

---

## Step 1: Clone Repository (1 min)

```bash
git clone https://github.com/omerfaisalraza-cyber/awesome-3d-game.git
cd awesome-3d-game
```

## Step 2: Install Dependencies (1 min)

```bash
npm install
```

## Step 3: Start Game (1 min)

```bash
npm run dev
```

Browser opens automatically! 🎮

## Step 4: Play & Explore (2 min)

**Controls:**
- `W` - Move forward
- `A` - Move left
- `S` - Move back
- `D` - Move right
- `SPACE` - Jump

**You'll see:**
- Blue capsule player character
- Green ground
- Red cube and cyan sphere
- Blue sky
- Score counter

---

## Next: Try These Challenges

### Challenge 1: Change Colors (2 min)
Edit `src/scenes/mainScene.js`, line 21:
```javascript
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,  // Change to red
  roughness: 0.8,
  metalness: 0.2,
});
```

### Challenge 2: Add a New Object (3 min)
Add to `src/scenes/mainScene.js` after the sphere:
```javascript
const pyramidGeometry = new THREE.TetrahedronGeometry(1.5);
const pyramidMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramid.position.set(-5, 2, 0);
pyramid.castShadow = true;
scene.add(pyramid);
```

### Challenge 3: Load a 3D Model (5 min)

1. Download model from https://quaternius.com
2. Save to `assets/models/model.glb`
3. Add to `src/scenes/mainScene.js`:

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('assets/models/model.glb', (gltf) => {
  gltf.scene.position.set(5, 0, -5);
  scene.add(gltf.scene);
});
```

---

## File Structure Quick Reference

```
📦 awesome-3d-game
├── 📁 src/
│   ├── main.js              ← Game starts here
│   ├── scenes/mainScene.js  ← Add objects here
│   ├── player/Player.js     ← Player controller
│   └── managers/
├── 📁 assets/
│   ├── models/              ← Put 3D models here
│   ├── textures/            ← Put images here
│   └── audio/               ← Put sounds here
├── 📁 public/               ← Static files
├── package.json             ← Dependencies
└── README.md                ← Full documentation
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F12 | Open Developer Tools |
| Ctrl+S | Save file |
| Ctrl+Shift+R | Hard refresh |

---

## If Something Breaks

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart server
npm run dev
```

---

## Ready for More?

📖 Read `SETUP_GUIDE.md` - Full detailed setup  
🎨 Read `ASSETS_GUIDE.md` - Add 3D models and textures  
🔗 Read `RESOURCES_LINKS.md` - All resource links  
📚 Read `README.md` - Complete documentation  

---

## Share Your Game!

Once you've built something cool:

```bash
npm run build        # Create optimized version
```

Then deploy to:
- **Netlify** (drag & drop `dist/` folder) - https://netlify.com
- **Vercel** (connect GitHub) - https://vercel.com
- **GitHub Pages** (free) - https://pages.github.com

---

**You now have everything needed to build an awesome 3D game! 🚀**
