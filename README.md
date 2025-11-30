# testingAntigravity

A small React + Vite demo that renders an animated "antigravity" background. The background shows floating SVG particles that rise upward and react to the mouse — being gently pulled toward the cursor and given a perpendicular wave motion for a swirling effect.

**Tech Stack**

- **Framework**: React
- **Bundler / Dev server**: Vite
- **Styling**: Tailwind CSS (utility classes in JSX)

**Quick Start (Windows PowerShell)**

1. Install dependencies:

```powershell
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

4. Preview the production build locally:

```powershell
npm run preview
```

**How `BackgroundAnimation` works (brief)**

- Particles are plain DOM elements rendered inside a container with absolute positioning.
- The component uses refs (not React state) to store particle state and DOM element references so updates can be applied directly via `el.style.transform` and `el.style.opacity` each animation frame. This avoids re-rendering through React on every `requestAnimationFrame` tick and keeps animation smooth.
- Mouse position is tracked with a `mousemove` listener; when a particle is within the interaction radius a small force is applied toward the cursor and a perpendicular wave velocity is added to create a swirl.

**Customization options**

- Change particle count by editing the initialization loop in `src/components/BackgroundAnimation.jsx`.
- Tweak sizes, speeds, opacity ranges, interaction radius, and wave amplitude in the particle initialization and update logic.
- Swap the SVG inside each particle element to change the particle shape.
