"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const LABELS = ["Flutter", "Go", "MQTT", "NAS", "React", "Symfony", "Docker", "Next.js", "Node", "SQL"];
const LINK_DISTANCE = 160;
const CURSOR_REACH = 220;
const CURSOR_PUSH = 140;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string | null;
}

interface Packet {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
}

interface HeroNetworkProps {
  className?: string;
}

// A drifting graph of nodes, some labelled with the stack; packets travel along the links
// and the cursor pulls lines towards itself. Mouse events come from the hero section.
export function HeroNetwork({ className }: HeroNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const area = canvas?.parentElement;
    if (!canvas || !context || !area) return;

    const style = getComputedStyle(canvas);
    const accent = style.getPropertyValue("--color-accent").trim() || "#4fb07f";
    const lineColor = style.getPropertyValue("--color-neutral-600").trim() || "#717873";
    const labelColor = style.getPropertyValue("--color-neutral-400").trim() || "#adb3af";
    const font = `11px ${style.getPropertyValue("--font-mono").trim() || "monospace"}`;

    const pointer = { x: -999, y: -999 };
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let frame = 0;
    let visible = true;

    const layout = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(24, Math.round((width * height) / 20000));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: width * (0.3 + Math.random() * 0.7),
        y: Math.random() * height * 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        label: LABELS[index] ?? null,
      }));
      packets = [];
    };

    const move = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < CURSOR_PUSH && distance > 0) {
          node.x += (dx / distance) * 0.8;
          node.y += (dy / distance) * 0.8;
        }
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      const links: [Node, Node][] = [];
      context.strokeStyle = lineColor;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance >= LINK_DISTANCE) continue;
          links.push([a, b]);
          context.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.45;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      context.strokeStyle = accent;
      for (const node of nodes) {
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        if (distance >= CURSOR_REACH) continue;
        context.globalAlpha = (1 - distance / CURSOR_REACH) * 0.8;
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(pointer.x, pointer.y);
        context.stroke();
      }

      if (links.length > 0 && Math.random() < 0.12) {
        const [from, to] = links[Math.floor(Math.random() * links.length)];
        packets.push({ from, to, progress: 0, speed: 0.008 + Math.random() * 0.014 });
      }
      packets = packets.filter((packet) => (packet.progress += packet.speed) < 1);
      context.globalAlpha = 1;
      context.fillStyle = accent;
      context.shadowColor = accent;
      context.shadowBlur = 10;
      for (const packet of packets) {
        context.beginPath();
        context.arc(
          packet.from.x + (packet.to.x - packet.from.x) * packet.progress,
          packet.from.y + (packet.to.y - packet.from.y) * packet.progress,
          2,
          0,
          Math.PI * 2,
        );
        context.fill();
      }
      context.shadowBlur = 0;

      context.font = font;
      for (const node of nodes) {
        const near = Math.hypot(node.x - pointer.x, node.y - pointer.y) < CURSOR_REACH;
        context.globalAlpha = node.label ? 1 : 0.6;
        context.fillStyle = node.label || near ? accent : labelColor;
        context.beginPath();
        context.arc(node.x, node.y, node.label ? 3 : 1.6, 0, Math.PI * 2);
        context.fill();
        if (node.label) {
          context.globalAlpha = near ? 1 : 0.7;
          context.fillStyle = near ? accent : labelColor;
          context.fillText(node.label, node.x + 9, node.y + 4);
        }
      }
      context.globalAlpha = 1;
    };

    const loop = () => {
      move();
      draw();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame === 0 && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    layout();
    if (reducedMotion) {
      draw();
      const resize = new ResizeObserver(() => {
        layout();
        draw();
      });
      resize.observe(canvas);
      return () => resize.disconnect();
    }

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
    };
    const onPointerLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
    };
    const onVisibilityChange = () => (document.hidden ? stop() : start());

    const resize = new ResizeObserver(layout);
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    resize.observe(canvas);
    onScreen.observe(canvas);
    area.addEventListener("pointermove", onPointerMove);
    area.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      stop();
      resize.disconnect();
      onScreen.disconnect();
      area.removeEventListener("pointermove", onPointerMove);
      area.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
