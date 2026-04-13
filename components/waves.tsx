"use client";

import { useEffect, useRef, type CSSProperties } from "react";

class Grad {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  dot2(x: number, y: number) {
    return this.x * x + this.y * y;
  }
}

class Noise {
  grad3: Grad[];
  p: number[];
  perm: number[];
  gradP: Grad[];

  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1)
    ];
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57,
      177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74,
      165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60,
      211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65,
      25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200,
      196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52,
      217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207,
      206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119,
      248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129,
      22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81,
      51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184,
      84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222,
      114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }

  seed(seed: number) {
    let nextSeed = seed;
    if (nextSeed > 0 && nextSeed < 1) {
      nextSeed *= 65536;
    }
    nextSeed = Math.floor(nextSeed);
    if (nextSeed < 256) {
      nextSeed |= nextSeed << 8;
    }
    for (let index = 0; index < 256; index += 1) {
      const value =
        index & 1
          ? this.p[index]! ^ (nextSeed & 255)
          : this.p[index]! ^ ((nextSeed >> 8) & 255);
      this.perm[index] = this.perm[index + 256] = value;
      this.gradP[index] = this.gradP[index + 256] = this.grad3[value % 12]!;
    }
  }

  fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(a: number, b: number, t: number) {
    return (1 - t) * a + t * b;
  }

  perlin2(x: number, y: number) {
    let X = Math.floor(x);
    let Y = Math.floor(y);

    const nextX = x - X;
    const nextY = y - Y;

    X &= 255;
    Y &= 255;

    const n00 = this.gradP[X + this.perm[Y]!]!.dot2(nextX, nextY);
    const n01 = this.gradP[X + this.perm[Y + 1]!]!.dot2(nextX, nextY - 1);
    const n10 = this.gradP[X + 1 + this.perm[Y]!]!.dot2(nextX - 1, nextY);
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]!]!.dot2(
      nextX - 1,
      nextY - 1
    );
    const u = this.fade(nextX);

    return this.lerp(
      this.lerp(n00, n10, u),
      this.lerp(n01, n11, u),
      this.fade(nextY)
    );
  }
}

type Point = {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
};

type MouseState = {
  x: number;
  y: number;
  lx: number;
  ly: number;
  sx: number;
  sy: number;
  v: number;
  vs: number;
  a: number;
  set: boolean;
};

type Config = {
  lineColor: string;
  waveSpeedX: number;
  waveSpeedY: number;
  waveAmpX: number;
  waveAmpY: number;
  friction: number;
  tension: number;
  maxCursorMove: number;
  xGap: number;
  yGap: number;
};

type WavesProps = {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  style?: CSSProperties;
  className?: string;
};

export function Waves({
  lineColor = "black",
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = ""
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const noiseRef = useRef(new Noise(Math.random()));
  const linesRef = useRef<Point[][]>([]);
  const boundsRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const mouseRef = useRef<MouseState>({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false
  });
  const configRef = useRef<Config>({
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap
  });

  useEffect(() => {
    configRef.current = {
      lineColor,
      waveSpeedX,
      waveSpeedY,
      waveAmpX,
      waveAmpY,
      friction,
      tension,
      maxCursorMove,
      xGap,
      yGap
    };
  }, [
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    contextRef.current = canvas.getContext("2d");

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      boundsRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      };
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const setLines = () => {
      const { width, height } = boundsRef.current;
      linesRef.current = [];
      const overflowWidth = width + 200;
      const overflowHeight = height + 30;
      const { xGap: currentXGap, yGap: currentYGap } = configRef.current;
      const totalLines = Math.ceil(overflowWidth / currentXGap);
      const totalPoints = Math.ceil(overflowHeight / currentYGap);
      const xStart = (width - currentXGap * totalLines) / 2;
      const yStart = (height - currentYGap * totalPoints) / 2;

      for (let lineIndex = 0; lineIndex <= totalLines; lineIndex += 1) {
        const points: Point[] = [];
        for (let pointIndex = 0; pointIndex <= totalPoints; pointIndex += 1) {
          points.push({
            x: xStart + currentXGap * lineIndex,
            y: yStart + currentYGap * pointIndex,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          });
        }
        linesRef.current.push(points);
      }
    };

    const movePoints = (time: number) => {
      const mouse = mouseRef.current;
      const noise = noiseRef.current;
      const {
        waveSpeedX: currentWaveSpeedX,
        waveSpeedY: currentWaveSpeedY,
        waveAmpX: currentWaveAmpX,
        waveAmpY: currentWaveAmpY,
        friction: currentFriction,
        tension: currentTension,
        maxCursorMove: currentMaxCursorMove
      } = configRef.current;

      linesRef.current.forEach((points) => {
        points.forEach((point) => {
          const move =
            noise.perlin2(
              (point.x + time * currentWaveSpeedX) * 0.002,
              (point.y + time * currentWaveSpeedY) * 0.0015
            ) * 12;

          point.wave.x = Math.cos(move) * currentWaveAmpX;
          point.wave.y = Math.sin(move) * currentWaveAmpY;

          const dx = point.x - mouse.sx;
          const dy = point.y - mouse.sy;
          const distance = Math.hypot(dx, dy);
          const limit = Math.max(175, mouse.vs);

          if (distance < limit) {
            const strength = 1 - distance / limit;
            const force = Math.cos(distance * 0.001) * strength;
            point.cursor.vx +=
              Math.cos(mouse.a) * force * limit * mouse.vs * 0.00065;
            point.cursor.vy +=
              Math.sin(mouse.a) * force * limit * mouse.vs * 0.00065;
          }

          point.cursor.vx += (0 - point.cursor.x) * currentTension;
          point.cursor.vy += (0 - point.cursor.y) * currentTension;
          point.cursor.vx *= currentFriction;
          point.cursor.vy *= currentFriction;
          point.cursor.x += point.cursor.vx * 2;
          point.cursor.y += point.cursor.vy * 2;
          point.cursor.x = Math.min(
            currentMaxCursorMove,
            Math.max(-currentMaxCursorMove, point.cursor.x)
          );
          point.cursor.y = Math.min(
            currentMaxCursorMove,
            Math.max(-currentMaxCursorMove, point.cursor.y)
          );
        });
      });
    };

    const moved = (point: Point, withCursor = true) => {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
      return {
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10
      };
    };

    const drawLines = () => {
      const context = contextRef.current;
      if (!context) {
        return;
      }

      context.clearRect(0, 0, boundsRef.current.width, boundsRef.current.height);
      context.beginPath();
      context.strokeStyle = configRef.current.lineColor;

      linesRef.current.forEach((points) => {
        let firstPoint = moved(points[0]!, false);
        context.moveTo(firstPoint.x, firstPoint.y);

        points.forEach((point, index) => {
          const isLast = index === points.length - 1;
          const p1 = moved(point, !isLast);
          const p2 = moved(points[index + 1] ?? points[points.length - 1]!, !isLast);
          context.lineTo(p1.x, p1.y);
          if (isLast) {
            context.moveTo(p2.x, p2.y);
          }
        });
      });

      context.stroke();
    };

    const tick = (time: number) => {
      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const distance = Math.hypot(dx, dy);

      mouse.v = distance;
      mouse.vs += (distance - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);

      container.style.setProperty("--x", `${mouse.sx}px`);
      container.style.setProperty("--y", `${mouse.sy}px`);

      movePoints(time);
      drawLines();
      frameIdRef.current = requestAnimationFrame(tick);
    };

    const updateMouse = (x: number, y: number) => {
      const mouse = mouseRef.current;
      const bounds = boundsRef.current;
      mouse.x = x - bounds.left;
      mouse.y = y - bounds.top;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    };

    const onResize = () => {
      setSize();
      setLines();
    };

    const onMouseMove = (event: MouseEvent) => {
      updateMouse(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      updateMouse(touch.clientX, touch.clientY);
    };

    setSize();
    setLines();
    frameIdRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`waves ${className}`.trim()}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor,
        ...style
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="waves-canvas" />
    </div>
  );
}
