import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const PARTICLE_COUNT = 100;
const PARTICLE_MIN_SIZE = 1;
const PARTICLE_MAX_SIZE = 2;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles(count) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: rand(PARTICLE_MIN_SIZE, PARTICLE_MAX_SIZE),
    left: `${rand(0, 100)}%`,
    top: `${rand(0, 100)}%`,
    duration: rand(6, 14),
    delay: rand(0, 5),
  }));
}

export default function ParticleBackground() {
  const particles = React.useMemo(() => createParticles(PARTICLE_COUNT), []);

  return (
    <div className="absolute inset-0  overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <FloatingDot key={p.id} {...p} />
      ))}
    </div>
  );
}

function FloatingDot({ size, left, top, duration, delay }) {
  const controls = useAnimation();

  useEffect(() => {
    let active = true;

    async function loop() {
      while (active) {
        await controls.start({
          x: rand(-60, 60),
          y: rand(-60, 60),
          transition: {
            duration: rand(duration * 0.7, duration * 1.3),
            ease: "easeInOut",
          },
        });
      }
    }

    const t = setTimeout(loop, delay * 1000);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      animate={controls}
      initial={{ x: 0, y: 0 }}
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        left,
        top,
        opacity: 0.6,
        filter: "drop-shadow(0 0 8px white)",
      }}
    />
  );
}
