# CrappyEngineJs

An experimental 3D engine built with vanilla JavaScript and TypeScript. This project is just a fun experiment.

## 🎮 Features

- 3D rendering of geometric shapes (cubes and spheres) on a 2D canvas
- Interactive camera controls
- Basic rendering system with perspective projection (and faulty mesh ordering)

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (package manager)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev
```

Open your browser at the indicated address (usually `http://localhost:5173`).

### Build

```bash
# Build the project
pnpm build

# Preview the production build
pnpm preview
```

### Linting

```bash
# Check and fix code
pnpm lint
```

## 🎯 Controls

- **Arrow keys** or **WASD** : Move the camera horizontally
- **Mouse** : Look around (requires clicking on the canvas to activate pointer lock)
- **Mouse wheel** : Move the camera vertically (up/down)

## 📁 Project Structure

```
crappyEngineJS/
├── src/
│   ├── main.ts              # Application entry point
│   ├── constants.ts         # Configuration constants
│   ├── types.ts             # TypeScript definitions
│   ├── fixtures.ts          # 3D demo shapes
│   ├── style.css            # CSS styles
│   └── utils/
│       ├── camera.ts        # Camera management
│       ├── render.ts        # Rendering engine
│       ├── trigo.ts         # Trigonometric functions
│       └── shapes/
│           ├── cube.ts      # Cube generation
│           └── sphere.ts    # Sphere generation
├── dist/                    # Production build
├── public/                  # Static assets
├── index.html               # Main HTML page
├── package.json             # npm configuration
├── tsconfig.json            # TypeScript configuration
└── biome.json               # Biome (linter) configuration
```
