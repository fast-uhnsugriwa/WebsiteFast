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
}

interface FormationEdge {
  from: number;
  to: number;
}

interface Formation {
  id: number;
  type: 'triangle' | 'spiral' | 'neural' | 'hubring' | 'sine' | 'binarytree';
  centerX: number;
  centerY: number;
  radius: number;
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

    // Color Palette
    const COLOR_PRIMARY = '#E07B1A';
    const COLOR_DEEP = '#B9631A';
    const PROXIMITY_THRESHOLD = 95;
    const MOUSE_REPEL_RADIUS = 95;

    // Initialize Particles (~150-170)
    const count = Math.max(150, Math.min(170, particleCount));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.35 + Math.random() * 0.45;
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
        radius: 1.4 + Math.random() * 1.1,
        color: Math.random() > 0.4 ? COLOR_PRIMARY : COLOR_DEEP,
        formationId: null,
        targetX: 0,
        targetY: 0,
        noiseOffset: Math.random() * 1000
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

    // 6 Geometrical Formations Creators
    const createFormationData = (
      typeIndex: number,
      cx: number,
      cy: number
    ): {
      type: Formation['type'];
      radius: number;
      nodes: Point[];
      edges: FormationEdge[];
      isHueCycling?: boolean;
    } => {
      const rot = Math.random() * Math.PI * 2;

      switch (typeIndex % 6) {
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
          const nodes = rawPoints.map((p) => {
            const r = rotatePoint(p.x - ox, p.y - oy, rot);
            return { x: cx + r.x, y: cy + r.y };
          });

          const edges: FormationEdge[] = [
            // Triangle
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 0 },
            // Corner indicator
            { from: 3, to: 4 },
            { from: 4, to: 5 }
          ];

          return { type: 'triangle', radius: 85, nodes, edges };
        }

        // 2. Spiral Golden Ratio (r = a * e^(b*theta))
        case 1: {
          const a = 6;
          const phi = 1.6180339887;
          const b = Math.log(phi) / (Math.PI / 2); // ~0.30635
          const numNodes = 10;
          const nodes: Point[] = [];
          const edges: FormationEdge[] = [];

          for (let i = 0; i < numNodes; i++) {
            const theta = (i * Math.PI) / 3.2;
            const r = a * Math.exp(b * theta);
            const pt = rotatePoint(r * Math.cos(theta), r * Math.sin(theta), rot);
            nodes.push({ x: cx + pt.x, y: cy + pt.y });
            if (i > 0) {
              edges.push({ from: i - 1, to: i });
            }
          }

          return { type: 'spiral', radius: 85, nodes, edges };
        }

        // 3. Neural Network 2-3-2 (Input 2, Hidden 3, Output 2)
        case 2: {
          const dx = 52;
          const rawNodes: Point[] = [
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

          const nodes = rawNodes.map((p) => {
            const r = rotatePoint(p.x, p.y, rot);
            return { x: cx + r.x, y: cy + r.y };
          });

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

          return { type: 'neural', radius: 80, nodes, edges };
        }

        // 4. Mesh Graf Hub-Ring 7 Node (1 center hub + 6 perimeter ring nodes)
        case 3: {
          const R = 55;
          const nodes: Point[] = [{ x: cx, y: cy }]; // Center hub (node 0)
          const edges: FormationEdge[] = [];

          for (let i = 0; i < 6; i++) {
            const theta = (i * Math.PI * 2) / 6 + rot;
            nodes.push({
              x: cx + Math.cos(theta) * R,
              y: cy + Math.sin(theta) * R
            });
            // Spoke edge from center
            edges.push({ from: 0, to: i + 1 });
            // Ring edge along perimeter
            edges.push({ from: i + 1, to: i === 5 ? 1 : i + 2 });
          }

          return { type: 'hubring', radius: 75, nodes, edges };
        }

        // 5. Gelombang Sinus dengan Hue Cycling
        case 4: {
          const length = 145;
          const numNodes = 8;
          const amplitude = 26;
          const nodes: Point[] = [];
          const edges: FormationEdge[] = [];

          for (let i = 0; i < numNodes; i++) {
            const progress = (i / (numNodes - 1)) * 2 - 1; // -1 to 1
            const lx = progress * (length / 2);
            const ly = Math.sin(progress * Math.PI * 1.5) * amplitude;
            const r = rotatePoint(lx, ly, rot);
            nodes.push({ x: cx + r.x, y: cy + r.y });
            if (i > 0) {
              edges.push({ from: i - 1, to: i });
            }
          }

          return { type: 'sine', radius: 85, nodes, edges, isHueCycling: true };
        }

        // 6. Pohon Biner 7 Node (Full 3-level binary tree: 1 root, 2 children, 4 leaves)
        case 5:
        default: {
          const rawNodes: Point[] = [
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

          // Gentle tilt rotation
          const tilt = (Math.random() - 0.5) * 0.4;
          const nodes = rawNodes.map((p) => {
            const r = rotatePoint(p.x, p.y, tilt);
            return { x: cx + r.x, y: cy + r.y };
          });

          const edges: FormationEdge[] = [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 1, to: 3 },
            { from: 1, to: 4 },
            { from: 2, to: 5 },
            { from: 2, to: 6 }
          ];

          return { type: 'binarytree', radius: 80, nodes, edges };
        }
      }
    };

    // Attempt to spawn a formation every ~1.6 seconds
    let lastSpawnCheck = performance.now();
    let currentFormationTypeIndex = Math.floor(Math.random() * 6);

    const trySpawnFormation = (now: number) => {
      // Don't spawn more than 4 concurrent formations to keep canvas clean
      if (formations.length >= 4) return;

      const padding = 120;
      if (width < padding * 2 || height < padding * 2) return;

      // Try finding a random location that respects clearance radius
      let validSpawn: { cx: number; cy: number; data: ReturnType<typeof createFormationData> } | null = null;

      for (let attempts = 0; attempts < 12; attempts++) {
        const cx = padding + Math.random() * (width - padding * 2);
        const cy = padding + Math.random() * (height - padding * 2);
        const candidate = createFormationData(currentFormationTypeIndex, cx, cy);

        // Check distance to all other active formations
        let hasClearance = true;
        for (const f of formations) {
          const dist = Math.hypot(cx - f.centerX, cy - f.centerY);
          if (dist < candidate.radius + f.radius + 60) {
            hasClearance = false;
            break;
          }
        }

        if (hasClearance) {
          validSpawn = { cx, cy, data: candidate };
          break;
        }
      }

      if (!validSpawn) return;

      const { cx, cy, data } = validSpawn;
      const neededNodesCount = data.nodes.length;

      // Find closest free particles to each target node
      // Candidate free particles
      const availableIndices = particles
        .map((p, idx) => ({ p, idx }))
        .filter(({ p }) => p.formationId === null);

      if (availableIndices.length < neededNodesCount) return;

      // Sort available particles by distance to the formation center
      availableIndices.sort(
        (a, b) => Math.hypot(a.p.x - cx, a.p.y - cy) - Math.hypot(b.p.x - cx, b.p.y - cy)
      );

      const recruitedIndices: number[] = [];
      const assignedParticles = new Set<number>();

      for (let nodeIdx = 0; nodeIdx < neededNodesCount; nodeIdx++) {
        const target = data.nodes[nodeIdx];
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

      // If we couldn't recruit enough particles, abort this attempt
      if (recruitedIndices.length < neededNodesCount) return;

      const formationId = nextFormationId++;
      const formation: Formation = {
        id: formationId,
        type: data.type,
        centerX: cx,
        centerY: cy,
        radius: data.radius,
        nodes: data.nodes,
        edges: data.edges,
        particleIndices: recruitedIndices,
        spawnTime: now,
        fadeDuration: 900,
        holdDuration: 4200,
        totalDuration: 6000,
        isHueCycling: data.isHueCycling
      };

      // Assign target positions to recruited particles
      for (let i = 0; i < recruitedIndices.length; i++) {
        const pIdx = recruitedIndices[i];
        const p = particles[pIdx];
        p.formationId = formationId;
        p.targetX = data.nodes[i].x;
        p.targetY = data.nodes[i].y;
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

      // 3. Update Formations & Lifecycles
      for (let fIdx = formations.length - 1; fIdx >= 0; fIdx--) {
        const f = formations[fIdx];
        const elapsed = time - f.spawnTime;

        // If completed total duration (900ms + 4200ms + 900ms = 6000ms), release particles!
        if (elapsed >= f.totalDuration) {
          for (const pIdx of f.particleIndices) {
            const p = particles[pIdx];
            if (p && p.formationId === f.id) {
              p.formationId = null;
              // Release back to free motion with random velocity vector
              const angle = Math.random() * Math.PI * 2;
              const speed = 0.35 + Math.random() * 0.55;
              p.vx = Math.cos(angle) * speed;
              p.vy = Math.sin(angle) * speed;
            }
          }
          formations.splice(fIdx, 1);
        }
      }

      // 4. Update Particles (Noise Drift, Lerp Pull to Formations, Cursor Repel)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.formationId !== null) {
          // Find parent formation
          const f = formations.find((item) => item.id === p.formationId);
          if (f) {
            const elapsed = time - f.spawnTime;
            if (elapsed < f.fadeDuration) {
              // Fade-in Phase: Strong Lerp Pull toward target
              p.x += (p.targetX - p.x) * 0.085;
              p.y += (p.targetY - p.y) * 0.085;
            } else if (elapsed < f.fadeDuration + f.holdDuration) {
              // Hold Phase: Locked in formation with subtle organic breathing
              const jitterX = Math.sin(time * 0.0025 + p.noiseOffset) * 0.45;
              const jitterY = Math.cos(time * 0.0025 + p.noiseOffset) * 0.45;
              p.x += (p.targetX + jitterX - p.x) * 0.2;
              p.y += (p.targetY + jitterY - p.y) * 0.2;
            } else {
              // Fade-out Phase: Starting to loosen up gently
              p.x += (p.targetX - p.x) * 0.05 + p.vx * 0.3;
              p.y += (p.targetY - p.y) * 0.05 + p.vy * 0.3;
            }
          } else {
            p.formationId = null;
          }
        } else {
          // Free Particle: Smooth Perlin/Trigonometric Noise Drift
          const noiseX = Math.sin(time * 0.0009 + p.y * 0.008) * 0.08;
          const noiseY = Math.cos(time * 0.0009 + p.x * 0.008) * 0.08;

          p.vx += noiseX * 0.1;
          p.vy += noiseY * 0.1;

          // Limit max free speed
          const curSpeed = Math.hypot(p.vx, p.vy);
          if (curSpeed > 1.1) {
            p.vx = (p.vx / curSpeed) * 1.1;
            p.vy = (p.vy / curSpeed) * 1.1;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Cursor Reactivity: Repel free particles within ~95px
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < MOUSE_REPEL_RADIUS && dist > 0.1) {
              const repelForce = (1 - dist / MOUSE_REPEL_RADIUS) * 3.6;
              const angle = Math.atan2(dy, dx);
              p.x += Math.cos(angle) * repelForce;
              p.y += Math.sin(angle) * repelForce;
            }
          }

          // Screen Boundary Soft Wrap / Bounce
          const margin = 20;
          if (p.x < -margin) p.x = width + margin;
          else if (p.x > width + margin) p.x = -margin;
          if (p.y < -margin) p.y = height + margin;
          else if (p.y > height + margin) p.y = -margin;
        }
      }

      // 5. Draw Proximity Lines between nearby free particles (< 95px)
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          // If both are in the SAME formation, formation drawing handles it
          if (p1.formationId !== null && p1.formationId === p2.formationId) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < PROXIMITY_THRESHOLD) {
            const alpha = (1 - dist / PROXIMITY_THRESHOLD) * 0.28;
            ctx.strokeStyle = `rgba(224, 123, 26, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 6. Draw Formations (Edges with Fade-in 900ms -> Hold 4200ms -> Fade-out 900ms)
      for (const f of formations) {
        const elapsed = time - f.spawnTime;
        let alpha = 0;

        if (elapsed < f.fadeDuration) {
          // Fade-in 900ms
          alpha = elapsed / f.fadeDuration;
        } else if (elapsed < f.fadeDuration + f.holdDuration) {
          // Hold 4200ms
          alpha = 1.0;
        } else if (elapsed < f.totalDuration) {
          // Fade-out 900ms
          alpha = 1 - (elapsed - f.fadeDuration - f.holdDuration) / f.fadeDuration;
        }

        alpha = Math.max(0, Math.min(1, alpha));

        // Edge stroke style
        if (f.isHueCycling) {
          const hue = Math.floor((time * 0.06) % 360);
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
              const hue = Math.floor((time * 0.06) % 360);
              ctx.strokeStyle = `hsla(${hue}, 85%, 55%, ${(alpha * 0.6).toFixed(3)})`;
            } else {
              ctx.strokeStyle = `rgba(224, 123, 26, ${(alpha * 0.6).toFixed(3)})`;
            }
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 7. Draw All Particles
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
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 select-none block w-full h-full ${className}`}
      style={{ backgroundColor }}
    />
  );
};
