import React, { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);

  useEffect(() => {
    // Initialize particles
    const particleCount = 40;
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 500, // Start below screen
      vx: 0,
      vy: -0.5 - Math.random() * 1.5, // Upward velocity
      size: 20 + Math.random() * 30,
      opacity: 0.1 + Math.random() * 0.4,
      baseVy: -0.5 - Math.random() * 1.5, // Remember original speed
      angle: Math.random() * Math.PI * 2, // For wave effect
    }));

    const updateParticles = (time) => {
      if (!containerRef.current) return;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      particlesRef.current.forEach((p, i) => {
        // 1. Base Movement (Antigravity)
        p.y += p.vy;
        p.x += p.vx;

        // Reset if off screen (top)
        if (p.y < -100) {
          p.y = window.innerHeight + 100;
          p.x = Math.random() * window.innerWidth;
          p.vx = 0;
          p.vy = p.baseVy;
        }

        // 2. Interaction Logic
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction Radius
        const radius = 300;

        if (dist < radius) {
          // Gathering Effect: Pull towards mouse
          const force = (radius - dist) / (radius * 2); // 0 to 1
          const pullStrength = 0.1;

          p.vx += (dx / dist) * force * pullStrength;
          p.vy += (dy / dist) * force * pullStrength;

          // Wave Effect: Sine wave motion around cursor
          // Add a perpendicular force based on sine of time + distance
          const waveFreq = 0.005;
          const waveAmp = 0.5;
          const wave =
            Math.sin(time * waveFreq + dist * 0.05) * waveAmp * force;

          // Perpendicular vector (-dy, dx)
          p.vx += (-dy / dist) * wave;
          p.vy += (dx / dist) * wave;
        } else {
          // Return to normal state
          // Damping velocity
          p.vx *= 0.95;
          // Return to base upward speed
          p.vy = p.vy * 0.95 + p.baseVy * 0.05;
        }

        // Apply to DOM
        const el = containerRef.current.children[i + 1]; // +1 to skip gradient overlay
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
          el.style.opacity = p.opacity;
        }
      });

      requestRef.current = requestAnimationFrame(updateParticles);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden bg-slate-950 -z-10"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-80" />

      {/* Particles Rendered Once, Moved by JS */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 text-cyan-500 will-change-transform"
          style={{
            // Initial position off-screen
            transform: "translate3d(-100px, -100px, 0)",
          }}
          ref={(el) => {
            if (el && particlesRef.current[i]) {
              el.style.fontSize = `${particlesRef.current[i].size}px`;
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="1em"
            height="1em"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
