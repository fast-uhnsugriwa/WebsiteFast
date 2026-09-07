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
  isWhite: boolean;
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

    // Diverse Color Palette (termasuk partikel putih starlight dan gradasi emas khas FAST)
    const COLOR_WHITE = '#FFFFFF';
    const COLOR_PRIMARY = '#E07B1A';
    const COLOR_DEEP = '#B9631A';
    const COLOR_CHAMPAGNE = '#F59E0B';
    const COLOR_BRONZE = '#9A3412';
    const PROXIMITY_THRESHOLD = 110;
    const MOUSE_REPEL_RADIUS = 95;

    // Pre-allocated Float32 and Uint8 buffers for proximity lines (zero per-frame allocations, buttery 60 FPS)
    const MAX_PROXIMITY_LINES = 700;
    const lineX1 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineY1 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineX2 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineY2 = new Float32Array(MAX_PROXIMITY_LINES);
    const lineAlpha = new Float32Array(MAX_PROXIMITY_LINES);
    // lineType: 0 = warm amber, 1 = pure white-white connection, 2 = white-color hybrid connection
    const lineType = new Uint8Array(MAX_PROXIMITY_LINES);

    // Particle count: ~150-170 on desktop, ~50-60 on mobile (<768px) to keep exact same serene visual density
    const isMobileInit = window.innerWidth < 768;
    const count = isMobileInit
      ? Math.min(60, Math.max(45, Math.floor((width * height) / 6200)))
      : Math.max(150, Math.min(170, particleCount));
    const particles: Particle[] = [];

    // Track connections per particle to prevent messy spiderwebs (max 2 connections per particle)
    const connectionCounts = new Uint8Array(count);

    // Initial speed scaled for mobile screen proportions so motion looks equally calm and majestic
    const initialSpeedScale = isMobileInit ? 0.45 : 1.0;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.12 + Math.random() * 0.18) * initialSpeedScale; // pelan dan halus
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      // Variasi partikel yang beragam termasuk partikel PUTIH (~28% partikel putih berkilau)
      const rand = Math.random();
      let color = COLOR_PRIMARY;
      let isWhite = false;

      if (rand < 0.28) {
        // Partikel Putih Berkilau (Starlight White / Diamond Pearl)
        color = COLOR_WHITE;
        isWhite = true;
      } else if (rand < 0.58) {
        // Amber Gold khas FAST
        color = COLOR_PRIMARY;
      } else if (rand < 0.78) {
        // Deep Warm Bronze
        color = COLOR_DEEP;
      } else if (rand < 0.90) {
        // Champagne Gold
        color = COLOR_CHAMPAGNE;
      } else {
        // Rich Bronze Terracotta
        color = COLOR_BRONZE;
      }

      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: 1.4 + Math.random() * 1.1, // ukuran partikel dipertahankan persis
        color,
        isWhite,
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
      const isMobile = width < 768;
      // Keep up to 2 concurrent formations on mobile, 3 on desktop for clean aesthetics
      const maxFormations = isMobile ? 2 : 3;
      if (formations.length >= maxFormations) return;

      const padding = isMobile ? 65 : 130;
      if (width < padding * 2 || height < padding * 2) return;

      const formationScale = isMobile ? 0.70 : 1.0;

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
        const candidateRadius = candidate.radius * formationScale;

        let hasClearance = true;
        for (const f of formations) {
          const dist = Math.hypot(cx - f.centerX, cy - f.centerY);
          if (dist < candidateRadius + f.radius + (isMobile ? 40 : 70)) {
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

      // Compute initial world node coordinates (scaled proportionally on mobile)
      const worldNodes: Point[] = data.localNodes.map((p) => {
        const r = rotatePoint(p.x * formationScale, p.y * formationScale, initialAngle);
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

      // Gentle drift velocity for the formation (smooth floating, calibrated for mobile)
      const driftAngle = Math.random() * Math.PI * 2;
      const driftSpeed = (0.14 + Math.random() * 0.12) * (isMobile ? 0.45 : 1.0);
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
        radius: data.radius * formationScale,
        localNodes: data.localNodes.map((p) => ({
          x: p.x * formationScale,
          y: p.y * formationScale
        })),
        nodes: worldNodes,
        edges: data.edges,
        particleIndices: recruitedIndices,
        spawnTime: now,
        fadeDuration: 1100, // gentle smooth fade-in
        holdDuration: isMobile ? 5000 : 4600, // longer hold to admire formation & formula
        totalDuration: isMobile ? 7200 : 6800,
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

    let lastFrameTime = performance.now();

    // Main Canvas Render Loop
    const render = (time: number) => {
      // Delta-time normalized to 60 FPS (16.667ms per frame)
      // Guarantees consistent speed on 60Hz desktop, 120Hz mobile ProMotion, and variable refresh rates!
      const deltaMs = Math.min(64, Math.max(1, time - lastFrameTime));
      lastFrameTime = time;
      const dt = deltaMs / 16.667;

      const isMobile = width < 768;
      const speedMultiplier = isMobile ? 0.45 : 1.0;

      // 1. Spawning Check
      if (time - lastSpawnCheck >= (isMobile ? 2200 : 1600)) {
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
              const speed = (0.12 + Math.random() * 0.16) * speedMultiplier;
              p.vx = Math.cos(angle) * speed;
              p.vy = Math.sin(angle) * speed;
            }
          }
          formations.splice(fIdx, 1);
          continue;
        }

        // --- FORMATION DYNAMIC MOTION (Never freezes, drifts continuously) ---
        f.centerX += f.driftVx * dt;
        f.centerY += f.driftVy * dt;

        // Soft screen bounce for the formation so it stays in visible canvas
        const pad = f.radius + (isMobile ? 20 : 40);
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
      const lerpFadeIn = (isMobile ? 0.032 : 0.048) * dt;
      const lerpHold = (isMobile ? 0.09 : 0.14) * dt;
      const lerpFadeOut = (isMobile ? 0.022 : 0.03) * dt;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.formationId !== null) {
          const f = formations.find((item) => item.id === p.formationId);
          if (f) {
            const elapsed = time - f.spawnTime;
            if (elapsed < f.fadeDuration) {
              // Fade-in Phase: Slower, graceful pull toward dynamic target
              p.x += (p.targetX - p.x) * lerpFadeIn;
              p.y += (p.targetY - p.y) * lerpFadeIn;
            } else if (elapsed < f.fadeDuration + f.holdDuration) {
              // Hold Phase: Smoothly glides along with moving formation
              const breathing = Math.sin(time * 0.0018 + p.noiseOffset) * (isMobile ? 0.18 : 0.3);
              p.x += (p.targetX + breathing - p.x) * lerpHold;
              p.y += (p.targetY + breathing - p.y) * lerpHold;
            } else {
              // Fade-out Phase: Starting to gently peel away
              p.x += (p.targetX - p.x) * lerpFadeOut + p.vx * (0.2 * dt);
              p.y += (p.targetY - p.y) * lerpFadeOut + p.vy * (0.2 * dt);
            }
          } else {
            p.formationId = null;
          }
        } else {
          // Free Particle: Pelan, tenang, smooth Perlin/trigonometric noise drift
          const noiseX = Math.sin(time * 0.0005 + p.y * 0.006) * (0.025 * speedMultiplier);
          const noiseY = Math.cos(time * 0.0005 + p.x * 0.006) * (0.025 * speedMultiplier);

          p.vx += noiseX * 0.035 * dt;
          p.vy += noiseY * 0.035 * dt;

          // Limit max free speed to keep motion calm and slow
          const maxFreeSpeed = 0.32 * speedMultiplier;
          const curSpeed = Math.hypot(p.vx, p.vy);
          if (curSpeed > maxFreeSpeed) {
            p.vx = (p.vx / curSpeed) * maxFreeSpeed;
            p.vy = (p.vy / curSpeed) * maxFreeSpeed;
          }

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          // Cursor Reactivity: Repel free particles smoothly
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const repelRadius = isMobile ? 50 : MOUSE_REPEL_RADIUS;

            if (dist < repelRadius && dist > 0.1) {
              const repelMultiplier = isMobile ? 0.35 : 1.35;
              const repelForce = (1 - dist / repelRadius) * repelMultiplier * dt;
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
      const minSep = isMobile ? 18 : 26;
      const minSeparationSq = minSep * minSep;
      const maxRepelPush = (isMobile ? 0.16 : 0.42) * dt;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.formationId !== null) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.formationId !== null) continue;

          const dx = p1.x - p2.x;
          if (dx > minSep || dx < -minSep) continue;
          const dy = p1.y - p2.y;
          if (dy > minSep || dy < -minSep) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < minSeparationSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const push = ((minSep - dist) / minSep) * maxRepelPush;
            const nx = (dx / dist) * push;
            const ny = (dy / dist) * push;

            p1.x += nx;
            p1.y += ny;
            p2.x -= nx;
            p2.y -= ny;
          }
        }
      }

      // 6. Draw Glowing Proximity Lines between nearby free particles
      // Dibatasi maksimal 2 koneksi per partikel agar rapi, elegan, dan tidak ruet/berantakan
      connectionCounts.fill(0);
      let lineCount = 0;
      const proximityLimit = isMobile ? 72 : PROXIMITY_THRESHOLD;
      const thresholdSq = proximityLimit * proximityLimit;

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
          if (dx > proximityLimit || dx < -proximityLimit) continue;
          const dy = p1.y - p2.y;
          if (dy > proximityLimit || dy < -proximityLimit) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < thresholdSq && lineCount < MAX_PROXIMITY_LINES) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / proximityLimit;
            // Enhanced alpha: clearly visible, rich contrast on warm white (#FDFCFA)
            const alpha = Math.pow(norm, 0.65) * 0.94;

            lineX1[lineCount] = p1.x;
            lineY1[lineCount] = p1.y;
            lineX2[lineCount] = p2.x;
            lineY2[lineCount] = p2.y;
            lineAlpha[lineCount] = alpha;

            // Klasifikasi jenis garis koneksi
            let type = 0; // 0 = warm amber gold
            if (p1.isWhite && p2.isWhite) {
              type = 1; // 1 = Pure White Starlight Connection
            } else if (p1.isWhite || p2.isWhite) {
              type = 2; // 2 = White-Gold Hybrid Connection
            }
            lineType[lineCount] = type;
            lineCount++;

            connectionCounts[i]++;
            connectionCounts[j]++;
          }
        }
      }

      if (lineCount > 0) {
        ctx.save();
        ctx.lineCap = 'round';

        // --- A. KONEKSI PUTIH BERCAHAYA (Pure White-White Starlight Connections) ---
        for (let k = 0; k < lineCount; k++) {
          if (lineType[k] !== 1) continue;
          const a = lineAlpha[k];

          // Pass 1: Frosty Silver/Blue-Grey Halo (memberikan kontras elegan pada background putih)
          ctx.lineWidth = 2.8;
          ctx.strokeStyle = `rgba(180, 195, 214, ${(a * 0.48).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(lineX1[k], lineY1[k]);
          ctx.lineTo(lineX2[k], lineY2[k]);
          ctx.stroke();

          // Pass 2: Brilliant Pure White Luminous Core
          ctx.lineWidth = 1.3;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(a * 0.98).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(lineX1[k], lineY1[k]);
          ctx.lineTo(lineX2[k], lineY2[k]);
          ctx.stroke();

          // Pass 3: Diamond Center Filament
          ctx.lineWidth = 0.65;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(a * 1.0).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(lineX1[k], lineY1[k]);
          ctx.lineTo(lineX2[k], lineY2[k]);
          ctx.stroke();
        }

        // --- B. KONEKSI HIBRIDA PUTIH-EMAS (White-Color Hybrid Connections) ---
        for (let k = 0; k < lineCount; k++) {
          if (lineType[k] !== 2) continue;
          const a = lineAlpha[k];

          // Pass 1: Soft Pale Champagne Aura
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = `rgba(253, 230, 138, ${(a * 0.45).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(lineX1[k], lineY1[k]);
          ctx.lineTo(lineX2[k], lineY2[k]);
          ctx.stroke();

          // Pass 2: Luminous Ivory-Gold Core
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = `rgba(255, 250, 240, ${(a * 0.95).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(lineX1[k], lineY1[k]);
          ctx.lineTo(lineX2[k], lineY2[k]);
          ctx.stroke();
        }

        // --- C. KONEKSI ORANYE EMAS KHAS FAST (Amber/Warm Connections) ---
        // Pass 1: Outer Luminous Warm-Amber Glow Halo (lebar 2.4px berpendar jelas)
        ctx.lineWidth = 2.4;
        for (let k = 0; k < lineCount; k++) {
          if (lineType[k] === 0) {
            ctx.strokeStyle = `rgba(249, 115, 22, ${(lineAlpha[k] * 0.48).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(lineX1[k], lineY1[k]);
            ctx.lineTo(lineX2[k], lineY2[k]);
            ctx.stroke();
          }
        }

        // Pass 2: Intense Radiant Core Line (tipis 1.1px warna oranye menyala)
        ctx.lineWidth = 1.1;
        for (let k = 0; k < lineCount; k++) {
          if (lineType[k] === 0) {
            ctx.strokeStyle = `rgba(217, 75, 10, ${(lineAlpha[k] * 0.95).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(lineX1[k], lineY1[k]);
            ctx.lineTo(lineX2[k], lineY2[k]);
            ctx.stroke();
          }
        }

        // Pass 3: Electric White-Gold Specular Core for close connections
        ctx.lineWidth = 0.6;
        for (let k = 0; k < lineCount; k++) {
          if (lineType[k] === 0 && lineAlpha[k] > 0.68) {
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

        const isHue = !!f.isHueCycling;
        const hue = isHue ? Math.floor((time * 0.05) % 360) : 0;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 1. FORMASI BERCAHAYA - MULTI-PASS GLOWING EDGES
        // Pass 1: Radiant Outer Glow Halo (lebar 4.8px berpendar lembut & hangat)
        ctx.lineWidth = 4.8;
        ctx.strokeStyle = isHue
          ? `hsla(${hue}, 95%, 56%, ${(alpha * 0.48).toFixed(3)})`
          : `rgba(249, 115, 22, ${(alpha * 0.46).toFixed(3)})`;
        ctx.beginPath();
        for (const edge of f.edges) {
          const p1 = particles[f.particleIndices[edge.from]];
          const p2 = particles[f.particleIndices[edge.to]];
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();

        // Pass 2: Saturated Vibrant Core Edge (lebar 2.0px pekat berkilau kontras tinggi)
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = isHue
          ? `hsla(${hue}, 92%, 46%, ${(alpha * 0.98).toFixed(3)})`
          : `rgba(217, 75, 10, ${(alpha * 0.98).toFixed(3)})`;
        ctx.beginPath();
        for (const edge of f.edges) {
          const p1 = particles[f.particleIndices[edge.from]];
          const p2 = particles[f.particleIndices[edge.to]];
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();

        // Pass 3: Electric Starlight Filament (lebar 0.8px sinar tajam bercahaya di tengah)
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = isHue
          ? `hsla(${hue}, 100%, 88%, ${(alpha * 0.92).toFixed(3)})`
          : `rgba(255, 246, 225, ${(alpha * 0.92).toFixed(3)})`;
        ctx.beginPath();
        for (const edge of f.edges) {
          const p1 = particles[f.particleIndices[edge.from]];
          const p2 = particles[f.particleIndices[edge.to]];
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.stroke();
        ctx.restore();

        // 2. FORMASI BERCAHAYA - LUMINOUS STAR NODES
        for (const pIdx of f.particleIndices) {
          const p = particles[pIdx];
          if (!p) continue;

          // Soft Outer Node Glow Halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 4.2, 0, Math.PI * 2);
          ctx.fillStyle = isHue
            ? `hsla(${hue}, 95%, 60%, ${(alpha * 0.28).toFixed(3)})`
            : `rgba(249, 115, 22, ${(alpha * 0.28).toFixed(3)})`;
          ctx.fill();

          // Radiating Accent Ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 1.9, 0, Math.PI * 2);
          ctx.strokeStyle = isHue
            ? `hsla(${hue}, 90%, 50%, ${(alpha * 0.82).toFixed(3)})`
            : `rgba(234, 88, 12, ${(alpha * 0.82).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Core Glowing Node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 0.3, 0, Math.PI * 2);
          ctx.fillStyle = isHue
            ? `hsla(${hue}, 92%, 42%, ${(alpha * 0.98).toFixed(3)})`
            : `rgba(194, 65, 12, ${(alpha * 0.98).toFixed(3)})`;
          ctx.fill();

          // White-Hot Starlight Center Glint
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.7, p.radius * 0.45), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(alpha * 0.95).toFixed(3)})`;
          ctx.fill();
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

      // 8. Draw Free Wandering Particles (partikel formasi sudah dirender bercahaya)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.formationId !== null) continue; // Simpul formasi sudah berpendar sempurna di step formasi

        if (p.isWhite) {
          // Partikel Putih Starlight (Diamond Pearl White)
          // 1. Soft ethereal starlight aura ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 1.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180, 195, 214, 0.38)';
          ctx.fill();

          // 2. Pure white core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // 3. Crisp delicate silver edge to guarantee contrast on warm white background
          ctx.lineWidth = 0.65;
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.65)';
          ctx.stroke();

          // 4. White-hot center starlight glint
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.6, p.radius * 0.42), 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        } else {
          // Partikel Beragam (Gold, Deep Bronze, Champagne, Terracotta)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
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
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 select-none block w-full h-full ${className}`}
      style={{ backgroundColor, transform: 'translateZ(0)', willChange: 'transform' }}
    />
  );
};
