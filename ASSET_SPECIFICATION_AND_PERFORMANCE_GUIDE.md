# Cyber-Deck Workstation: Asset Specification & Technical Performance Guide

This document establishes the official visual design briefs (formatted as high-fidelity generative visual prompts) and the deep technical and performance architecture for every component of the Seated First-Person Cyber-Deck experience.

---

## Part 1: Visual Design Prompts & Aesthetic Specifications

### 1. The Cyber-Deck Desk & Industrial Frame
* **Visual Generation Prompt:**
  > A heavy-duty cyberpunk developer desk, angled industrial form factor, first-person seated perspective. The desktop surface is constructed of dark matte carbon-fiber composite with subtle brushed texture and chamfered edges. Along the front perimeter facing the player runs an integrated anodized gunmetal edge-guard with a recessed, glowing neon cyan light channel (#00f3ff) casting a soft underglow. Beneath the tabletop, matte-black tubular steel framing and structural triangulation brackets ground the station in physical reality. Draped neatly along the rear and side cable management channels are bundled high-voltage cyber cables—braided matte black, vibrant cyber cyan, and hazard-striped yellow-black conduit lines with quick-lock connector rings. Cinematic 3-point neon lighting with sharp rim accents, deep shadows, ultra-detailed hard-surface PBR materials.
* **Hero Details:** Chamfered bevels, subtle wear marks on the front edge, recessed cable-routing grommets with glowing amber interior rings.

---

### 2. Retro-Futuristic Curved CRT Monitor
* **Visual Generation Prompt:**
  > A retro-futuristic 1990s-inspired cyberpunk curved CRT monitor mounted on an adjustable angled steel riser at eye level. The monitor casing is heavy-duty reinforced off-white/warm-industrial gray polymer with ventilation louvers along the top and sides, featuring subtle heat dissipation discoloration. The front bezel is beveled with tactile contrast dials, rotary power toggle, and green status LED. The screen surface is a deep, curved spherical-cylinder phosphor glass faceplate displaying a high-contrast phosphor green and amber terminal CLI ("CYBER-DECK KERNEL v4.2 // AWAITING MEDIA CARTRIDGE"). Faint horizontal scanlines, subtle barrel distortion at the corners, and an authentic soft cathode-ray phosphor bloom reflecting gently onto the inner bezel.
* **Hero Details:** Curved glass reflection, micro-scratches on polymer casing, recessed ventilation grilles, physical rotary brightness/contrast dials.

---

### 3. Cyber-Deck Console Enclosure (Drive Bays & Interfaces)
* **Visual Generation Prompt:**
  > An industrial cyber-deck computer console casing resting on the desktop beside the CRT monitor. Built from angled matte obsidian-black anodized aluminum plates with visible hex-bolt fasteners and laser-etched caution stencils. Front interface panel features a spring-loaded cartridge drive bay aperture lined with internal glowing cyan guide rails and mechanical latching teeth. Directly adjacent is an exposed, heavy-duty metal-shielded USB-A port with gold-plated spring pins. To the right of the slot is a physical tactile mechanical EJECT button with an illuminated amber status ring. Three surface-mount diagnostic LEDs (Power: Green, Read: Cyan, Bus: Amber) blink rhythmically. Ultra-sharp industrial design, tactile retro-futuristic sci-fi hardware.
* **Hero Details:** Chamfered drive entry bevels, gold contact spring-fingers visible inside slot, tactile textured cross-hatch grip on the eject button.

---

### 4. Data Cartridges (`cartridge.glb`)
* **Visual Generation Prompt:**
  > A series of tactile retro-cyberpunk data cartridges designed for insertion into a computer deck. Molded rugged polycarbonate shell in matte anthracite and industrial gray with ergonomic ribbed side grip grooves and asymmetrical top alignment notches. The front face features a slightly recessed high-contrast holographic label sticker displaying the game title, project genre badge, and category color accent (Cyber-Cyan, Neon-Pink, Amber-Gold). Underside exposes gold-plated edge-connector bus fingers on a dark green PCB substrate. Along the top ridge runs a continuous slim acrylic light guide pulsing with a soft internal neon LED glow. Photorealistic hard-surface product render, macro focus, crisp bevels.
* **Hero Details:** Textured grip knurling, gold bus traces, dynamic holographic sheen on label foil, flush-mounted activity LED diode.

---

### 5. Encrypted Cyber USB Key (`usb.glb`)
* **Visual Generation Prompt:**
  > An ultra-futuristic encrypted cyber USB flash drive resting on a developer desk. The body is machined from a solid block of dark gunmetal titanium with chamfered polished edges and an integrated industrial lanyard loop cutout at the rear. Along the top spine runs a laser-etched cryptographic bus trace inlaid with glowing amber and cyan fiber-optic channels that pulse like a heart rate monitor. The front features a precision-milled metallic USB-A connector plug with gold contact pins. A miniature segment display on the side reads "2.04 MB // AUTH_READY". High-end EDC tech design, pristine metallic reflections, subtle emissive glow.
* **Hero Details:** Laser-etched circuit circuitry pattern, exposed gold pins, precision chamfers, pulsing data pulse light guide.

---

### 6. PCB Motherboard Diagnostic Test-Bench & Sockets
* **Visual Generation Prompt:**
  > An exposed diagnostic electronics test bench mounted on the desk at a 20-degree ergonomic tilt. The motherboard is a multi-layer matte dark-green and black solder-mask PCB substrate covered with intricate, glowing gold and cyan copper bus traces running between surface-mount components. At the center is a massive ceramic BGA CPU socket topped with an anodized black aluminum heatsink with laser-etched Unity engine emblem. Flanking the processor are vertical DIMM sockets with illuminated high-speed RAM sticks, a dedicated GPU module with miniature copper heat pipes, and surface-mount SOIC/DIP microchips with silver pin legs. Miniature test pads and copper via holes pepper the board, with glowing test points pulsing with electrical data.
* **Hero Details:** High-density SMD capacitors and resistors, silkscreen component designators (e.g. `U1_CPU`, `C42`, `J5_BUS`), solder-joint specular glints.

---

### 7. Handheld Multimeter & Logic Probe Tool (`probe.glb`)
* **Visual Generation Prompt:**
  > A professional hardware diagnostic station consisting of a benchtop digital multimeter console and a handheld logic probe tool. The multimeter unit is a rugged angled instrument with rubberized shock-absorbing yellow/black corners, two rotary selector knobs, and an illuminated 7-segment green digital LCD readout showing live frequency and voltage waveforms. Exiting the unit is a flexible coiled red-and-black silicone cable leading to an ergonomic cylindrical logic probe stylus. The probe body features knurled aircraft-grade aluminum grip, a dual-color LED status ring near the finger rest, and a micro-fine hardened stainless-steel contact needle tip designed for probing circuit test pins.
* **Hero Details:** Flexible coiled cable physics, knurled diamond grip texture, micro needle tip, illuminated dual-color LED ring (Cyan = Logic High, Amber = Pulse).

---

### 8. Companion Pet Robot "Byte" (`byte.glb`)
* **Visual Generation Prompt:**
  > An adorable desktop companion pet robot named "Byte" perched curiously on a cyberpunk developer desk. The body is a compact, rounded-cube chassis made of eggshell-white and cyber-cyan matte polymer with rounded chamfers and subtle panel lines. Articulated neck gimbal connects to a tilting head equipped with two spring-loaded cylindrical ear-antennae that bounce subtly. The face is a curved glossy black acrylic screen displaying bright, vibrant retro pixel emoticons: ( ^ _ ^ ) in luminous cyan phosphor dots. The base features compact rubberized runner pads. Friendly, charming, futuristic pet aesthetic reminiscent of a miniature desktop WALL-E meets retro gaming console.
* **Hero Details:** Dynamic facial emotion canvas, articulated neck joint for reticle tracking, bouncy spring antennae, tiny ventilation vents on rear chassis.

---

### 9. Microchip Snack Dish
* **Visual Generation Prompt:**
  > A small, precision-machined hexagonal aluminum tray resting on the desk beside the companion robot. Inside the dish sits a neat collection of miniature glowing silicon microchips and SMD ICs with golden pins, styled like high-tech snacks for a desktop robot. The tray has a bead-blasted matte finish with subtle circular CNC milling marks and a glowing neon cyan base ring.
* **Hero Details:** CNC circular tool marks on metal dish, glowing semiconductor dies on the chips.

---

## Part 2: Technical Architecture & Performance Specifications

### 1. Frame Budget & Target Metrics
| Metric | Desktop Target | Mobile/Tablet Fallback |
| :--- | :--- | :--- |
| **Target Framerate** | **60 FPS** (16.6ms frame time) | **60 FPS** (Adaptive Low-Power) |
| **Max Draw Calls** | **< 35 calls per frame** | **< 20 calls per frame** |
| **Device Pixel Ratio (DPR)** | Clamped to `dpr={[1, 1.5]}` | Clamped to `dpr={[1, 1.0]}` |
| **Total VRAM Footprint** | **< 85 MB** | **< 45 MB** |
| **Initial Geometry Weight** | **< 2.5 MB total** | **< 2.5 MB total** |

---

### 2. Geometry & Mesh Budgets
To guarantee high performance and fast load times, polygon budgets are strictly capped:

| Asset | Type / Production Pipeline | Triangle Budget | Material Slots |
| :--- | :--- | :--- | :--- |
| **Desk & Frame** | Three.js Procedural Primitives (`RoundedBox`, `Cylinder`) | ~1,200 tris | 2 (Carbon Top, Steel Frame) |
| **CRT Monitor Housing** | Three.js Compound Primitives + Bezel | ~2,400 tris | 2 (Polymer Case, Screen Bezel) |
| **CRT Screen Face** | Embedded `<Html transform>` | 2 tris (Quad Anchor) | Native DOM layer |
| **Cyber-Deck Console** | Three.js Hard-Surface Primitives | ~1,800 tris | 2 (Anodized Chassis, Slot Interior) |
| **Data Cartridges (`cartridge.glb`)** | Optimized Blender 5.2 GLB | ~950 tris / cart | 3 (Polymer Shell, Gold Pin, Label) |
| **USB Key (`usb.glb`)** | Optimized Blender 5.2 GLB | ~450 tris | 2 (Titanium Body, Metal Plug) |
| **PCB Test Bench** | Plane + Instanced SMD Chips | ~3,200 tris total | 3 (PCB Substrate, Heatsink, ICs) |
| **Multimeter & Probe (`probe.glb`)** | Meter Box (Primitives) + Probe GLB | ~1,100 tris | 2 (Knurled Grip, Needle Tip) |
| **Companion Robot Byte (`byte.glb`)** | Articulated Blender 5.2 GLB | ~2,800 tris | 3 (Chassis, Screen Canvas, Accent) |

---

### 3. Material, Texture & PBR Guidelines
* **Standard Shading Model:** `MeshStandardMaterial` across all props to maintain physical light coherence with the environment.
* **Texture Maps:**
  * Albedo / BaseColor: $1024 \times 1024$ max (compressed WebP / PNG).
  * Roughness / Metalness: Packed into channels (Roughness = Green, Metalness = Blue) where textures are used.
  * Normal Maps: $1024 \times 1024$ tangent-space DirectX/OpenGL normal maps.
* **Emissive Channels for Zero-Cost Lighting:**
  * All LED status indicators, bus traces, and neon strips use `emissive` color with `emissiveIntensity: 2.0 - 3.5`.
  * **Rule:** Never spawn a real dynamic `PointLight` for an LED or button. Let the emissive material + post-processing bloom do the visual work at zero light calculation overhead.

---

### 4. Lighting Rig Constraints (Forward Shading Optimization)
* **Active Lights:** Strictly **3 primary lights**:
  1. **Cyan Key Light:** `PointLight` at `[2.5, 3.5, 2.0]`, color `#00f3ff`, intensity `25 - 30`.
  2. **Magenta Rim Light:** `PointLight` at `[-3.0, 2.8, -1.5]`, color `#ff007f`, intensity `20 - 25`.
  3. **Amber Accent Light:** `PointLight` at `[0.8, 1.4, 0.6]`, color `#ffb700`, intensity `12 - 15`.
* **Ambient Fill:** `AmbientLight` at intensity `0.25`, color `#0a1224`.
* **Shadow Map Policy:**
  * Point lights have `castShadow={false}`. Dynamic point light shadow cubemaps are strictly prohibited to avoid rendering the scene 6x per light.
  * Desk grounding uses Drei's `<ContactShadows>` baked/single-pass ground projection under props.

---

### 5. Post-Processing Pipeline Settings
* **Selective Bloom:**
  * `luminanceThreshold={0.82}`: Bypasses 95% of pixels (matte surfaces, desk, room walls).
  * `luminanceSmoothing={0.2}`.
  * `mipmapBlur={true}`: Critical for performance. Uses hardware GPU mipmaps instead of expensive multi-pass Gaussian convolutions.
  * `intensity={1.2}`.
* **Cinematic Vignette:**
  * Darkens periphery with low offset to focus attention on the interactive console.
* **Adaptive Fallback:**
  * Auto-disables bloom on low-end mobile devices, falling back to pure CSS glow and Three.js emissive color shading.
