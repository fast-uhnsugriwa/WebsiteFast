import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  color: string;
  formationId: number | null;
  targetX: number;
  targetY: number;
  noiseOffset: number;
  canJoinFormation: boolean;
}

interface FormationEdge {
  from: number;
  to: number;
}

interface Formation {
  id: number;
  type:
    | 'triangle'
    | 'spiral'
    | 'neural'
    | 'hubring'
    | 'sine'
    | 'binarytree'
    | 'kmeans'
    | 'resnet'
    | 'regression'
    | 'colorharmony';
  formula: string;
  centerX: number;
  centerY: number;
  driftVx: number;
  driftVy: number;
  baseAngle: number;
  rotSpeed: number;
  radius: number;
  localNodes: Point[];
  nodes: Point[];
  edges: FormationEdge[];
  particleIndices: number[];
  spawnTime: number;
  fadeDuration: number;
  holdDuration: number;
  totalDuration: number;
  isHueCycling?: boolean;
}

interface GeometricConstellationCanvasProps {
  className?: string;
  particleCount?: number;
  backgroundColor?: string;
}

export const GeometricConstellationCanvas: React.FC<GeometricConstellationCanvasProps> = ({
  className = '',
  particleCount = 160,
  backgroundColor = '#FDFCFA'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const whiteLightBlobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High DPI Canvas Scaling
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cursor tracking
    const mouse = {
      x: -9999,
      y: -9999,
      active: false
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      mouse.active = true;
      if ('touches' in e && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      } else if ('clientX' in e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);

    // Color Palette
    const COLOR_PRIMARY = '#E07B1A';
    const COLOR_DEEP = '#B9631A';
    const PROXIMITY_THRESHOLD = 110;
    const MOUSE_REPEL_RADIUS = 95;

    // Pre-allocated Float32 buffers for proximity lines (zero per-frame allocations, buttery 60 FPS)
    const MAX_PROXIMITY_LINES = 700;
    const lineX1 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineY1 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineX2 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineY2 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineAlpha = new Float32Array(MAX_PROXIMITY_LINES);

    // Initialize Particles (~150-170) with slower gentle speeds
    const count = Math.max(150, Math.min(170, particleCount));
    const particles: Particle[] = [];

    // Track connections per particle to prevent messy spiderwebs (max 2 connections per particle)
    const connectionCounts = new Uint8Array(count);

    // Luminous White Light Tracker state (follows active formations with agile speed)
    const rovingWhiteLight = {
      x: width * 0.5,
      y: height * 0.35,
      alpha: 0
    };

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.12 + Math.random() * 0.18; // pelan dan halus (0.12 - 0.30 px/frame)
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: 1.4 + Math.random() * 1.1, // ukuran partikel dipertahankan persis
        color: Math.random() > 0.4 ? COLOR_PRIMARY : COLOR_DEEP,
        formationId: null,
        targetX: 0,
        targetY: 0,
        noiseOffset: Math.random() * 1000,
        // ~35% partikel menjadi pengembara bebas (tidak pernah ikut formasi, hanya membuat garis tipis)
        canJoinFormation: i % 3 !== 0
      });
    }

    // Active Formations Management
    let nextFormationId = 1;
    const formations: Formation[] = [];

    // Helper: Rotate point (x, y) around (0, 0)
    const rotatePoint = (x: number, y: number, angle: number): Point => ({
      x: x * Math.cos(angle) - y * Math.sin(angle),
      y: x * Math.sin(angle) + y * Math.cos(angle)
    });

    // Helper: Draw rounded pill
    const drawPillPath = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      }
    };

    // 6 Geometrical Formations Creators
    const createFormationData = (
      typeIndex: number
    ): {
      type: Formation['type'];
      formula: string;
      radius: number;
      localNodes: Point[];
      edges: FormationEdge[];
      isHueCycling?: boolean;
    } => {
      switch (typeIndex % 10) {
        // 1. Segitiga siku-siku bertanda sudut (Right-angle triangle with right-angle corner indicator)
        case 0: {
          const w = 75;
          const h = 60;
          const s = 14;
          // Triangle vertices: (0,0), (w, 0), (0, -h)
          // Corner marker: (s, 0), (s, -s), (0, -s)
          const rawPoints: Point[] = [
            { x: 0, y: 0 },
            { x: w, y: 0 },
            { x: 0, y: -h },
            { x: s, y: 0 },
            { x: s, y: -s },
            { x: 0, y: -s }
          ];

          // Center offset so centroid is near (0, 0)
          const ox = w / 3;
          const oy = -h / 3;
          const localNodes = rawPoints.map((p) => ({
            x: p.x - ox,
            y: p.y - oy
          }));

          const edges: FormationEdge[] = [
            // Triangle
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 0 },
            // Corner indicator
            { from: 3, to: 4 },
            { from: 4, to: 5 }
          ];

          return {
            type: 'triangle',
            formula: 'a² + b² = c²',
            radius: 85,
            localNodes,
            edges
          };
        }

        // 2. Spiral Golden Ratio (r = a * e^(b*theta))
        case 1: {
          const a = 6;
          const phi = 1.6180339887;
          const b = Math.log(phi) / (Math.PI / 2); // ~0.30635
          const numNodes = 10;
          const localNodes: Point[] = [];
          const edges: FormationEdge[] = [];

          for (let i = 0; i < numNodes; i++) {
            const theta = (i * Math.PI) / 3.2;
            const r = a * Math.exp(b * theta);
            localNodes.push({
              x: r * Math.cos(theta),
              y: r * Math.sin(theta)
            });
            if (i > 0) {
              edges.push({ from: i - 1, to: i });
            }
          }

          return {
            type: 'spiral',
            formula: 'r = a · e^(bθ)',
            radius: 85,
            localNodes,
            edges
          };
        }

        // 3. Neural Network 2-3-2 (Input 2, Hidden 3, Output 2)
        case 2: {
          const dx = 52;
          const localNodes: Point[] = [
            // Layer 1 (2 nodes)
            { x: -dx, y: -24 },
            { x: -dx, y: 24 },
            // Layer 2 (3 nodes)
            { x: 0, y: -38 },
            { x: 0, y: 0 },
            { x: 0, y: 38 },
            // Layer 3 (2 nodes)
            { x: dx, y: -24 },
            { x: dx, y: 24 }
          ];

          const edges: FormationEdge[] = [
            // Layer 1 -> Layer 2
            { from: 0, to: 2 },
            { from: 0, to: 3 },
            { from: 0, to: 4 },
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            // Layer 2 -> Layer 3
            { from: 2, to: 5 },
            { from: 2, to: 6 },
            { from: 3, to: 5 },
            { from: 3, to: 6 },
            { from: 4, to: 5 },
            { from: 4, to: 6 }
          ];

          return {
            type: 'neural',
            formula: 'y = σ(W·x + b)',
            radius: 80,
            localNodes,
            edges
          };
        }

        // 4. Mesh Graf Hub-Ring 7 Node (1 center hub + 6 perimeter ring nodes)
        case 3: {
          const R = 55;
          const localNodes: Point[] = [{ x: 0, y: 0 }]; // Center hub (node 0)
          const edges: FormationEdge[] = [];

          for (let i = 0; i < 6; i++) {
            const theta = (i * Math.PI * 2) / 6;
            localNodes.push({
              x: Math.cos(theta) * R,
              y: Math.sin(theta) * R
            });
            // Spoke edge from center
            edges.push({ from: 0, to: i + 1 });
            // Ring edge along perimeter
            edges.push({ from: i + 1, to: i === 5 ? 1 : i + 2 });
          }

          return {
            type: 'hubring',
            formula: 'G = (V, E)  |V|=7, |E|=12',
            radius: 75,
            localNodes,
            edges
          };
        }

        // 5. Gelombang Sinus dengan Hue Cycling
        case 4: {
          const length = 145;
          const numNodes = 8;
          const amplitude = 26;
          const localNodes: Point[] = [];
          const edges: FormationEdge[] = [];

          for (let i = 0; i < numNodes; i++) {
            const progress = (i / (numNodes - 1)) * 2 - 1; // -1 to 1
            const lx = progress * (length / 2);
            const ly = Math.sin(progress * Math.PI * 1.5) * amplitude;
            localNodes.push({ x: lx, y: ly });
            if (i > 0) {
              edges.push({ from: i - 1, to: i });
            }
          }

          return {
            type: 'sine',
            formula: 'y = A·sin(kx - ωt)',
            radius: 85,
            localNodes,
            edges,
            isHueCycling: true
          };
        }

        // 6. Pohon Biner 7 Node (Full 3-level binary tree: 1 root, 2 children, 4 leaves)
        case 5: {
          const localNodes: Point[] = [
            // Level 0 (Root)
            { x: 0, y: -48 },
            // Level 1
            { x: -38, y: -8 },
            { x: 38, y: -8 },
            // Level 2 (Leaves)
            { x: -58, y: 38 },
            { x: -18, y: 38 },
            { x: 18, y: 38 },
            { x: 58, y: 38 }
          ];

          const edges: FormationEdge[] = [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 2, to: 5 },
            { from: 2, to: 6 }
          ];

          return {
            type: 'binarytree',
            formula: 'N = 2ʰ⁺¹ - 1  (h=2)',
            radius: 80,
            localNodes,
            edges
          };
        }

        // 7. Algoritma K-Means Clustering (3 Klaster Sentroid dengan Titik Satelit)
        case 6: {
          const localNodes: Point[] = [
            // Sentroid Klaster (0, 1, 2)
            { x: -38, y: -26 },
            { x: 40, y: -22 },
            { x: 2, y: 38 },
            // Titik Satelit Klaster A (3, 4)
            { x: -58, y: -14 },
            { x: -26, y: -45 },
            // Titik Satelit Klaster B (5, 6)
            { x: 58, y: -34 },
            { x: 32, y: -4 },
            // Titik Satelit Klaster C (7, 8)
            { x: -18, y: 52 },
            { x: 24, y: 48 }
          ];

          const edges: FormationEdge[] = [
            // Segitiga penghubung antar-sentroid
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 0 },
            // Hubungan titik data ke sentroid masing-masing
            { from: 0, to: 3 },
            { from: 0, to: 4 },
            { from: 1, to: 5 },
            { from: 1, to: 6 },
            { from: 2, to: 7 },
            { from: 2, to: 8 }
          ];

          return {
            type: 'kmeans',
            formula: 'J = ∑‖x - μₖ‖²  (k=3)',
            radius: 85,
            localNodes,
            edges
          };
        }

        // 8. ResNet Deep Residual Block (Feed-forward + Shortcut Connection)
        case 7: {
          const localNodes: Point[] = [
            { x: 0, y: -54 },  // Node 0: Input x
            { x: 0, y: -20 },  // Node 1: Weight Layer 1
            { x: 0, y: 10 },   // Node 2: ReLU Activation
            { x: 0, y: 40 },   // Node 3: Weight Layer 2
            { x: 0, y: 72 },   // Node 4: Output addition ⊕ y
            { x: 38, y: -20 }, // Node 5: Residual skip arc 1
            { x: 38, y: 40 }   // Node 6: Residual skip arc 2
          ];

          const edges: FormationEdge[] = [
            // Feed-forward path
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            // Identity shortcut connection F(x) + x
            { from: 0, to: 5 },
            { from: 5, to: 6 },
            { from: 6, to: 4 }
          ];

          return {
            type: 'resnet',
            formula: 'y = F(x, {Wᵢ}) + x',
            radius: 85,
            localNodes,
            edges
          };
        }

        // 9. Regresi Linier (Scatter Data Points + Garis Regresi Terbaik)
        case 8: {
          const localNodes: Point[] = [
            // Best fit regression line (0, 1, 2)
            { x: -55, y: 35 },
            { x: 0, y: -3.5 },
            { x: 55, y: -42 },
            // Scatter data points with residual projections
            { x: -38, y: 14 },
            { x: -18, y: 18 },
            { x: 20, y: -28 },
            { x: 42, y: -22 }
          ];

          const edges: FormationEdge[] = [
            // Garis regresi utama
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            // Proyeksi residual galat (error residuals)
            { from: 3, to: 0 },
            { from: 4, to: 1 },
            { from: 5, to: 1 },
            { from: 6, to: 2 }
          ];

          return {
            type: 'regression',
            formula: 'y = β₀ + β₁x + ε',
            radius: 80,
            localNodes,
            edges
          };
        }

        // 10. Color Harmony (Harmoni Warna Triadik Roda Warna 120° HSL)
        case 9:
        default: {
          const R = 52;
          const localNodes: Point[] = [];
          const edges: FormationEdge[] = [];

          // 6 titik perimeter roda warna (0, 1, 2, 3, 4, 5)
          for (let i = 0; i < 6; i++) {
            const theta = (i * Math.PI * 2) / 6;
            localNodes.push({
              x: Math.cos(theta) * R,
              y: Math.sin(theta) * R
            });
            edges.push({ from: i, to: (i + 1) % 6 });
          }

          // Titik pusat (Node 6)
          localNodes.push({ x: 0, y: 0 });

          // Segitiga harmoni triadik (0°, 120°, 240°)
          edges.push({ from: 0, to: 2 });
          edges.push({ from: 2, to: 4 });
          edges.push({ from: 4, to: 0 });

          // Jari-jari harmoni ke pusat
          edges.push({ from: 6, to: 0 });
          edges.push({ from: 6, to: 2 });
          edges.push({ from: 6, to: 4 });

          return {
            type: 'colorharmony',
            formula: 'Hₙ = (H₀ + n·120°) mod 360°',
            radius: 82,
            localNodes,
            edges,
            isHueCycling: true
          };
        }
      }
    };

    // Attempt to spawn a formation every ~1.6 seconds
    let lastSpawnCheck = performance.now();
    let currentFormationTypeIndex = Math.floor(Math.random() * 10);

    const trySpawnFormation = (now: number) => {
      // Keep up to 3-4 concurrent formations
      if (formations.length >= 3) return;

      const padding = 130;
      if (width < padding * 2 || height < padding * 2) return;

      let validSpawn: {
        cx: number;
        cy: number;
        data: ReturnType<typeof createFormationData>;
        initialAngle: number;
      } | null = null;

      for (let attempts = 0; attempts < 14; attempts++) {
        const cx = padding + Math.random() * (width - padding * 2);
        const cy = padding + Math.random() * (height - padding * 2);
        const candidate = createFormationData(currentFormationTypeIndex);

        let hasClearance = true;
        for (const f of formations) {
          const dist = Math.hypot(cx - f.centerX, cy - f.centerY);
          if (dist < candidate.radius + f.radius + 70) {
            hasClearance = false;
            break;
          }
        }

        if (hasClearance) {
          validSpawn = {
            cx,
            cy,
            data: candidate,
            initialAngle: Math.random() * Math.PI * 2
          };
          break;
        }
      }

      if (!validSpawn) return;

      const { cx, cy, data, initialAngle } = validSpawn;
      const neededNodesCount = data.localNodes.length;

      // Compute initial world node coordinates
      const worldNodes: Point[] = data.localNodes.map((p) => {
        const r = rotatePoint(p.x, p.y, initialAngle);
        return { x: cx + r.x, y: cy + r.y };
      });

      // Find closest free particles to each initial target node
      const availableIndices = particles
        .map((p, idx) => ({ p, idx }))
        // Only recruit particles that are allowed to form geometric shapes
        .filter(({ p }) => p.formationId === null && p.canJoinFormation);

      if (availableIndices.length < neededNodesCount) return;

      availableIndices.sort(
        (a, b) => Math.hypot(a.p.x - cx, a.p.y - cy) - Math.hypot(b.p.x - cx, b.p.y - cy)
      );

      const recruitedIndices: number[] = [];
      const assignedParticles = new Set<number>();

      for (let nodeIdx = 0; nodeIdx < neededNodesCount; nodeIdx++) {
        const target = worldNodes[nodeIdx];
        let bestDist = Infinity;
        let bestIdx = -1;

        for (const { p, idx } of availableIndices) {
          if (assignedParticles.has(idx)) continue;
          const d = Math.hypot(p.x - target.x, p.y - target.y);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = idx;
          }
        }

        if (bestIdx !== -1) {
          assignedParticles.add(bestIdx);
          recruitedIndices.push(bestIdx);
        }
      }

      if (recruitedIndices.length < neededNodesCount) return;

      // Gentle drift velocity for the formation (smooth floating)
      const driftAngle = Math.random() * Math.PI * 2;
      const driftSpeed = 0.14 + Math.random() * 0.12; // slow smooth movement (0.14 - 0.26 px/frame)
      const driftVx = Math.cos(driftAngle) * driftSpeed;
      const driftVy = Math.sin(driftAngle) * driftSpeed;
      const rotSpeed = (Math.random() - 0.5) * 0.0006; // very subtle slow rotation

      const formationId = nextFormationId++;
      const formation: Formation = {
        id: formationId,
        type: data.type,
        formula: data.formula,
        centerX: cx,
        centerY: cy,
        driftVx,
        driftVy,
        baseAngle: initialAngle,
        rotSpeed,
        radius: data.radius,
        localNodes: data.localNodes,
        nodes: worldNodes,
        edges: data.edges,
        particleIndices: recruitedIndices,
        spawnTime: now,
        fadeDuration: 1100, // gentle smooth fade-in
        holdDuration: 4600, // longer hold to admire formation & formula
        totalDuration: 6800,
        isHueCycling: data.isHueCycling
      };

      // Assign initial targets to recruited particles
      for (let i = 0; i < recruitedIndices.length; i++) {
        const pIdx = recruitedIndices[i];
        const p = particles[pIdx];
        p.formationId = formationId;
        p.targetX = worldNodes[i].x;
        p.targetY = worldNodes[i].y;
      }

      formations.push(formation);
      currentFormationTypeIndex++;
    };

    // Main Canvas Render Loop
    const render = (time: number) => {
      // 1. Spawning Check every ~1.6s
      if (time - lastSpawnCheck >= 1600) {
        lastSpawnCheck = time;
        trySpawnFormation(time);
      }

      // 2. Clear Canvas with Clean Warm White Background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // 3. Update Formations & Lifecycles (Continuous Smooth Drifting & Rotation)
      for (let fIdx = formations.length - 1; fIdx >= 0; fIdx--) {
        const f = formations[fIdx];
        const elapsed = time - f.spawnTime;

        // If completed total duration, release particles back to free motion!
        if (elapsed >= f.totalDuration) {
          for (const pIdx of f.particleIndices) {
            const p = particles[pIdx];
            if (p && p.formationId === f.id) {
              p.formationId = null;
              // Release with gentle random velocity
              const angle = Math.random() * Math.PI * 2;
              const speed = 0.12 + Math.random() * 0.16;
              p.vx = Math.cos(angle) * speed;
              p.vy = Math.sin(angle) * speed;
            }
          }
          formations.splice(fIdx, 1);
          continue;
        }

        // --- FORMATION DYNAMIC MOTION (Never freezes, drifts continuously) ---
        f.centerX += f.driftVx;
        f.centerY += f.driftVy;

        // Soft screen bounce for the formation so it stays in visible canvas
        const pad = f.radius + 40;
        if (f.centerX < pad && f.driftVx < 0) f.driftVx *= -1;
        else if (f.centerX > width - pad && f.driftVx > 0) f.driftVx *= -1;
        if (f.centerY < pad && f.driftVy < 0) f.driftVy *= -1;
        else if (f.centerY > height - pad && f.driftVy > 0) f.driftVy *= -1;

        // Subtle organic sway rotation
        const currentAngle = f.baseAngle + (elapsed * f.rotSpeed);

        // Update all formation node positions and sync to recruited particles
        for (let k = 0; k < f.localNodes.length; k++) {
          const loc = f.localNodes[k];
          const rotated = rotatePoint(loc.x, loc.y, currentAngle);
          const nx = f.centerX + rotated.x;
          const ny = f.centerY + rotated.y;

          f.nodes[k].x = nx;
          f.nodes[k].y = ny;

          const pIdx = f.particleIndices[k];
          const p = particles[pIdx];
          if (p) {
            p.targetX = nx;
            p.targetY = ny;
          }
        }
      }

      // 4. Update Particles (Smooth ease, Lerp to moving formation, gentle cursor repel)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.formationId !== null) {
          const f = formations.find((item) => item.id === p.formationId);
          if (f) {
            const elapsed = time - f.spawnTime;
            if (elapsed < f.fadeDuration) {
              // Fade-in Phase: Slower, graceful pull toward dynamic target
              p.x += (p.targetX - p.x) * 0.048;
              p.y += (p.targetY - p.y) * 0.048;
            } else if (elapsed < f.fadeDuration + f.holdDuration) {
              // Hold Phase: Smoothly glides along with moving formation
              const breathing = Math.sin(time * 0.0018 + p.noiseOffset) * 0.3;
              p.x += (p.targetX + breathing - p.x) * 0.14;
              p.y += (p.targetY + breathing - p.y) * 0.14;
            } else {
              // Fade-out Phase: Starting to gently peel away
              p.x += (p.targetX - p.x) * 0.03 + p.vx * 0.2;
              p.y += (p.targetY - p.y) * 0.03 + p.vy * 0.2;
            }
          } else {
            p.formationId = null;
          }
        } else {
          // Free Particle: Pelan, tenang, smooth Perlin/trigonometric noise drift
          const noiseX = Math.sin(time * 0.0005 + p.y * 0.006) * 0.025;
          const noiseY = Math.cos(time * 0.0005 + p.x * 0.006) * 0.025;

          p.vx += noiseX * 0.035;
          p.vy += noiseY * 0.035;

          // Limit max free speed to keep motion calm and slow
          const curSpeed = Math.hypot(p.vx, p.vy);
          if (curSpeed > 0.32) {
            p.vx = (p.vx / curSpeed) * 0.32;
            p.vy = (p.vy / curSpeed) * 0.32;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Cursor Reactivity: Repel free particles within ~95px smoothly
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < MOUSE_REPEL_RADIUS && dist > 0.1) {
              const repelForce = (1 - dist / MOUSE_REPEL_RADIUS) * 1.35;
              const angle = Math.atan2(dy, dx);
              p.x += Math.cos(angle) * repelForce;
              p.y += Math.sin(angle) * repelForce;
            }
          }

          // Screen Boundary Soft Wrap
          const margin = 20;
          if (p.x < -margin) p.x = width + margin;
          else if (p.x > width + margin) p.x = -margin;
          if (p.y < -margin) p.y = height + margin;
          else if (p.y > height + margin) p.y = -margin;
        }
      }

      // Anti-clumping soft repulsion (memastikan partikel tidak menumpuk / bertumpuk di satu titik)
      const MIN_SEPARATION = 26;
      const minSeparationSq = MIN_SEPARATION * MIN_SEPARATION;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.formationId !== null) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.formationId !== null) continue;

          const dx = p1.x - p2.x;
          if (dx > MIN_SEPARATION || dx < -MIN_SEPARATION) continue;
          const dy = p1.y - p2.y;
          if (dy > MIN_SEPARATION || dy < -MIN_SEPARATION) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < minSeparationSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const push = ((MIN_SEPARATION - dist) / MIN_SEPARATION) * 0.42;
            const nx = (dx / dist) * push;
            const ny = (dy / dist) * push;

            p1.x += nx;
            p1.y += ny;
            p2.x -= nx;
            p2.y -= ny;
          }
        }
      }

      // 5. CAHAYA PUTIH MENGIKUTI FORMASI (Luminous White Light Tracking Formations)
      // Setiap kali ada formasi geometris terbentuk, cahaya putih menyelimuti & mengikutinya sampai hilang
      let mostActiveFormation: Formation | null = null;
      let highestFormationAlpha = 0;

      for (const f of formations) {
        const elapsed = time - f.spawnTime;
        let formationAlpha = 0;

        if (elapsed < f.fadeDuration) {
          formationAlpha = elapsed / f.fadeDuration;
        } else if (elapsed < f.fadeDuration + f.holdDuration) {
          formationAlpha = 1.0;
        } else if (elapsed < f.totalDuration) {
          formationAlpha = 1 - (elapsed - f.fadeDuration - f.holdDuration) / (f.totalDuration - f.fadeDuration - f.holdDuration);
        }

        formationAlpha = Math.max(0, Math.min(1, formationAlpha));
        if (formationAlpha > highestFormationAlpha) {
          highestFormationAlpha = formationAlpha;
          mostActiveFormation = f;
        }

        if (formationAlpha > 0.01) {
          // 1. Broad Volumetric Pure White Daylight Bloom (intensitas tinggi & radius diperluas)
          const outerR = f.radius * 3.4;
          const glowGrad = ctx.createRadialGradient(
            f.centerX, f.centerY, 0,
            f.centerX, f.centerY, outerR
          );
          glowGrad.addColorStop(0, `rgba(255, 255, 255, ${(1.0 * formationAlpha).toFixed(3)})`);
          glowGrad.addColorStop(0.2, `rgba(255, 255, 255, ${(0.96 * formationAlpha).toFixed(3)})`);
          glowGrad.addColorStop(0.45, `rgba(255, 255, 255, ${(0.86 * formationAlpha).toFixed(3)})`);
          glowGrad.addColorStop(0.7, `rgba(255, 252, 240, ${(0.58 * formationAlpha).toFixed(3)})`);
          glowGrad.addColorStop(0.88, `rgba(254, 243, 199, ${(0.28 * formationAlpha).toFixed(3)})`);
          glowGrad.addColorStop(1, 'rgba(253, 252, 250, 0)');

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(f.centerX, f.centerY, outerR, 0, Math.PI * 2);
          ctx.fill();

          // 2. Focused Brilliant White Specular Core (sangat menyala dan bercahaya)
          const innerR = f.radius * 1.5;
          const coreGrad = ctx.createRadialGradient(
            f.centerX, f.centerY, 0,
            f.centerX, f.centerY, innerR
          );
          coreGrad.addColorStop(0, `rgba(255, 255, 255, ${(1.0 * formationAlpha).toFixed(3)})`);
          coreGrad.addColorStop(0.45, `rgba(255, 255, 255, ${(0.98 * formationAlpha).toFixed(3)})`);
          coreGrad.addColorStop(0.75, `rgba(255, 255, 255, ${(0.65 * formationAlpha).toFixed(3)})`);
          coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(f.centerX, f.centerY, innerR, 0, Math.PI * 2);
          ctx.fill();

          // 3. Intense Specular Center Starlight Sparkle
          ctx.beginPath();
          ctx.arc(f.centerX, f.centerY, 40, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(0.95 * formationAlpha).toFixed(3)})`;
          ctx.fill();

          // 4. Radiant White Sunbeam Streak Rotating Gracefully Through Formation
          const streakAngle = f.baseAngle + (elapsed * f.rotSpeed);
          const streakLen = f.radius * 2.4;
          const sp1 = rotatePoint(-streakLen, 0, streakAngle);
          const sp2 = rotatePoint(streakLen, 0, streakAngle);
          const streakGrad = ctx.createLinearGradient(
            f.centerX + sp1.x, f.centerY + sp1.y,
            f.centerX + sp2.x, f.centerY + sp2.y
          );
          streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          streakGrad.addColorStop(0.25, `rgba(255, 255, 255, ${(0.55 * formationAlpha).toFixed(3)})`);
          streakGrad.addColorStop(0.5, `rgba(255, 255, 255, ${(0.98 * formationAlpha).toFixed(3)})`);
          streakGrad.addColorStop(0.75, `rgba(255, 255, 255, ${(0.55 * formationAlpha).toFixed(3)})`);
          streakGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = streakGrad;
          ctx.lineWidth = 20;
          ctx.beginPath();
          ctx.moveTo(f.centerX + sp1.x, f.centerY + sp1.y);
          ctx.lineTo(f.centerX + sp2.x, f.centerY + sp2.y);
          ctx.stroke();
        }
      }

      // Dynamic White Light Tracker (pergerakan dipercepat, mengikuti formasi sampai hilang)
      if (mostActiveFormation && highestFormationAlpha > 0.01) {
        // Swift tracking response (lerp 0.085) so it quickly matches the moving formation
        rovingWhiteLight.x += (mostActiveFormation.centerX - rovingWhiteLight.x) * 0.085;
        rovingWhiteLight.y += (mostActiveFormation.centerY - rovingWhiteLight.y) * 0.085;
        rovingWhiteLight.alpha += (highestFormationAlpha - rovingWhiteLight.alpha) * 0.12;
      } else {
        // When no active formation, light drifts with accelerated speed and gently fades
        const wanderTime = time * 0.0016; // pergerakan agak dipercepat
        const wanderX = width * 0.5 + Math.sin(wanderTime) * (width * 0.28);
        const wanderY = height * 0.35 + Math.cos(wanderTime * 0.8) * (height * 0.22);
        rovingWhiteLight.x += (wanderX - rovingWhiteLight.x) * 0.045;
        rovingWhiteLight.y += (wanderY - rovingWhiteLight.y) * 0.045;
        rovingWhiteLight.alpha += (0 - rovingWhiteLight.alpha) * 0.06;
      }

      if (whiteLightBlobRef.current) {
        const halfSize = 290; // half of 580px
        whiteLightBlobRef.current.style.transform = `translate3d(${Math.round(rovingWhiteLight.x - halfSize)}px, ${Math.round(rovingWhiteLight.y - halfSize)}px, 0) translateZ(0)`;
        whiteLightBlobRef.current.style.opacity = (rovingWhiteLight.alpha * 0.98).toFixed(3);
      }

      // 6. Draw Glowing Proximity Lines between nearby free particles (< 110px)
      // Dibatasi maksimal 2 koneksi per partikel agar rapi, elegan, dan tidak ruet/berantakan
      connectionCounts.fill(0);
      let lineCount = 0;
      const thresholdSq = PROXIMITY_THRESHOLD * PROXIMITY_THRESHOLD;

      for (let i = 0; i < particles.length; i++) {
        if (connectionCounts[i] >= 2) continue; // partikel sudah punya 2 koneksi, lewati
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          if (connectionCounts[i] >= 2) break; // p1 sudah mencapai batas maksimal 2 koneksi
          if (connectionCounts[j] >= 2) continue; // p2 sudah mencapai batas maksimal 2 koneksi

          const p2 = particles[j];

          // If both belong to the SAME formation, formation drawing handles it
          if (p1.formationId !== null && p1.formationId === p2.formationId) continue;

          const dx = p1.x - p2.x;
          if (dx > PROXIMITY_THRESHOLD || dx < -PROXIMITY_THRESHOLD) continue;
          const dy = p1.y - p2.y;
          if (dy > PROXIMITY_THRESHOLD || dy < -PROXIMITY_THRESHOLD) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < thresholdSq && lineCount < MAX_PROXIMITY_LINES) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / PROXIMITY_THRESHOLD;
            // Enhanced alpha: clearly visible, rich contrast on warm white (#FDFCFA)
            const alpha = Math.pow(norm, 0.65) * 0.94;

            lineX1[lineCount] = p1.x;
            lineY1[lineCount] = p1.y;
            lineX2[lineCount] = p2.x;
            lineY2[lineCount] = p2.y;
            lineAlpha[lineCount] = alpha;
            lineCount++;

            connectionCounts[i]++;
            connectionCounts[j]++;
          }
        }
      }

      if (lineCount > 0) {
        ctx.save();
        ctx.lineCap = 'round';

        // Pass 1: Outer Luminous Warm-Amber Glow Halo (lebar 2.4px berpendar jelas)
        ctx.lineWidth = 2.4;
        for (let k = 0; k < lineCount; k++) {
          ctx.strokeStyle = `rgba(249, 115, 22, ${(lineAlpha[k] * 0.48).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(lineX1[k], lineY1[k]);
          ctx.lineTo(lineX2[k], lineY2[k]);
          ctx.stroke();
        }

        // Pass 2: Intense Radiant Core Line (tipis 1.1px warna oranye menyala)
        ctx.lineWidth = 1.1;
        for (let k = 0; k < lineCount; k++) {
          ctx.strokeStyle = `rgba(217, 75, 10, ${(lineAlpha[k] * 0.95).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(lineX1[k], lineY1[k]);
          ctx.lineTo(lineX2[k], lineY2[k]);
          ctx.stroke();
        }

        // Pass 3: Electric White-Gold Specular Core for close connections (dist < ~45px)
        ctx.lineWidth = 0.6;
        for (let k = 0; k < lineCount; k++) {
          if (lineAlpha[k] > 0.68) {
            const glintAlpha = (lineAlpha[k] - 0.68) * 2.8;
            ctx.strokeStyle = `rgba(255, 252, 235, ${Math.min(1, glintAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(lineX1[k], lineY1[k]);
            ctx.lineTo(lineX2[k], lineY2[k]);
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      // 7. Draw Formations (Edges + Nodes + Formula Text at Top-Right)
      for (const f of formations) {
        const elapsed = time - f.spawnTime;
        let alpha = 0;

        if (elapsed < f.fadeDuration) {
          // Fade-in
          alpha = elapsed / f.fadeDuration;
        } else if (elapsed < f.fadeDuration + f.holdDuration) {
          // Hold
          alpha = 1.0;
        } else if (elapsed < f.totalDuration) {
          // Fade-out
          alpha = 1 - (elapsed - f.fadeDuration - f.holdDuration) / (f.totalDuration - f.fadeDuration - f.holdDuration);
        }

        alpha = Math.max(0, Math.min(1, alpha));
        if (alpha <= 0.01) continue;

        // Edge stroke style
        if (f.isHueCycling) {
          const hue = Math.floor((time * 0.05) % 360);
          ctx.strokeStyle = `hsla(${hue}, 85%, 48%, ${(alpha * 0.92).toFixed(3)})`;
        } else {
          ctx.strokeStyle = `rgba(185, 99, 26, ${(alpha * 0.9).toFixed(3)})`;
        }

        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw each geometrical edge
        for (const edge of f.edges) {
          const p1Idx = f.particleIndices[edge.from];
          const p2Idx = f.particleIndices[edge.to];
          const p1 = particles[p1Idx];
          const p2 = particles[p2Idx];

          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw halo rings around formation nodes for prominent structure
        for (const pIdx of f.particleIndices) {
          const p = particles[pIdx];
          if (p) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + 1.8, 0, Math.PI * 2);
            if (f.isHueCycling) {
              const hue = Math.floor((time * 0.05) % 360);
              ctx.strokeStyle = `hsla(${hue}, 85%, 55%, ${(alpha * 0.6).toFixed(3)})`;
            } else {
              ctx.strokeStyle = `rgba(224, 123, 26, ${(alpha * 0.6).toFixed(3)})`;
            }
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // --- FORMULA TEXT DI KANAN ATAS FORMASI ---
        // Formula appears gracefully as formation completes forming (from fade-in midway onwards)
        const formulaAlpha = Math.max(0, Math.min(1, (alpha - 0.25) / 0.75));
        if (formulaAlpha > 0.02) {
          ctx.save();
          ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
          const metrics = ctx.measureText(f.formula);
          const textWidth = metrics.width;
          const pillPaddingX = 9;
          const pillHeight = 22;
          const pillWidth = textWidth + pillPaddingX * 2;

          // Position at top right of formation
          let badgeX = f.centerX + f.radius * 0.6;
          let badgeY = f.centerY - f.radius * 0.75;

          // Keep badge within visible canvas boundaries
          badgeX = Math.max(16, Math.min(width - pillWidth - 16, badgeX));
          badgeY = Math.max(28, Math.min(height - pillHeight - 16, badgeY));

          // Draw Connecting subtle dotted indicator line from formation perimeter to formula
          ctx.strokeStyle = f.isHueCycling
            ? `hsla(${(time * 0.05) % 360}, 80%, 50%, ${(formulaAlpha * 0.35).toFixed(3)})`
            : `rgba(185, 99, 26, ${(formulaAlpha * 0.35).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(f.centerX + f.radius * 0.35, f.centerY - f.radius * 0.45);
          ctx.lineTo(badgeX + 4, badgeY + pillHeight / 2);
          ctx.stroke();
          ctx.setLineDash([]); // reset line dash

          // Glass Pill Background
          ctx.fillStyle = `rgba(253, 252, 250, ${(formulaAlpha * 0.94).toFixed(3)})`;
          ctx.strokeStyle = f.isHueCycling
            ? `hsla(${(time * 0.05) % 360}, 85%, 45%, ${(formulaAlpha * 0.55).toFixed(3)})`
            : `rgba(185, 99, 26, ${(formulaAlpha * 0.55).toFixed(3)})`;
          ctx.lineWidth = 1.1;

          drawPillPath(badgeX, badgeY, pillWidth, pillHeight, 5);
          ctx.fill();
          ctx.stroke();

          // Formula Text
          ctx.fillStyle = f.isHueCycling
            ? `hsla(${(time * 0.05) % 360}, 90%, 35%, ${(formulaAlpha * 0.95).toFixed(3)})`
            : `rgba(164, 75, 12, ${(formulaAlpha * 0.95).toFixed(3)})`;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(f.formula, badgeX + pillPaddingX, badgeY + pillHeight / 2 + 0.5);

          ctx.restore();
        }
      }

      // 8. Draw All Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.formationId !== null) {
          ctx.fillStyle = COLOR_DEEP;
        } else {
          ctx.fillStyle = p.color;
        }

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
    };
  }, [particleCount, backgroundColor]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 select-none overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block w-full h-full"
      />
      {/* Luminous White Light Spotlight that dynamically tracks the active formation until it disappears */}
      <div
        ref={whiteLightBlobRef}
        aria-hidden="true"
        className="absolute top-0 left-0 w-[580px] h-[580px] rounded-full blur-[65px] pointer-events-none will-change-transform opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.94) 28%, rgba(254, 240, 138, 0.55) 55%, transparent 75%)',
          transform: 'translate3d(-9999px, -9999px, 0) translateZ(0)',
          contain: 'strict'
        }}
      />
    </div>
  );
};
