"use client";

import { useEffect, useRef } from "react";

const SPACING = 42;
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 26;
const EASE = 0.12;

type Point = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
};

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: Point[] = [];
    const mouse = { x: -9999, y: -9999 };

    const buildPoints = () => {
      points = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          points.push({ baseX: x, baseY: y, x, y });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPoints();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let rafId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(139, 92, 246, 0.45)";

      for (const p of points) {
        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;
        const dist = Math.hypot(dx, dy);

        let targetX = p.baseX;
        let targetY = p.baseY;

        if (dist < REPEL_RADIUS) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          const angle = Math.atan2(dy, dx);
          targetX = p.baseX + Math.cos(angle) * force;
          targetY = p.baseY + Math.sin(angle) * force;
        }

        p.x += (targetX - p.x) * EASE;
        p.y += (targetY - p.y) * EASE;

        ctx.beginPath();
        ctx.moveTo(p.x - 3, p.y);
        ctx.lineTo(p.x + 3, p.y);
        ctx.moveTo(p.x, p.y - 3);
        ctx.lineTo(p.x, p.y + 3);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
    />
  );
}
