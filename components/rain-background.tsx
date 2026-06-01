"use client";

import React, { useEffect, useRef } from "react";

interface RainBackgroundProps {
  className?: string;
  color?: string;
  quantity?: number;
  speed?: number;
}

export const RainBackground: React.FC<RainBackgroundProps> = ({
  className,
  color = "rgba(0, 120, 255, 0.6)", // Vibrant blue with some transparency
  quantity = 150,
  speed = 2.5, // Increased speed
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w: number, h: number;

    interface Raindrop {
      x: number;
      y: number;
      length: number;
      velocity: number;
      opacity: number;
      angle: number; // For diagonal movement
    }

    let raindrops: Raindrop[] = [];

    const createRaindrop = (): Raindrop => {
      return {
        x: Math.random() * (w + 200) - 100, // Wider range to account for diagonal entry
        y: Math.random() * -h,
        length: Math.random() * 20 + 15,
        velocity: (Math.random() * 6 + 4) * speed, // Faster velocity
        opacity: Math.random() * 0.4 + 0.2,
        angle: 25 * (Math.PI / 180), // 25 degrees diagonal
      };
    };

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      raindrops = [];
      for (let i = 0; i < quantity; i++) {
        raindrops.push(createRaindrop());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      raindrops.forEach((drop, i) => {
        // Update with diagonal movement
        drop.y += drop.velocity;
        drop.x += Math.tan(drop.angle) * drop.velocity;
        
        // Reset if off bottom or far right
        if (drop.y > h || drop.x > w + 50) {
          raindrops[i] = createRaindrop();
          raindrops[i].y = -20;
        }

        // Draw
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5; // Slightly thicker for better visibility
        ctx.lineCap = "round";
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(
          drop.x + Math.sin(drop.angle) * drop.length,
          drop.y + Math.cos(drop.angle) * drop.length
        );
        ctx.globalAlpha = drop.opacity;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, quantity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block" }}
    />
  );
};
