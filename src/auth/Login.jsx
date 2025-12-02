import { useRef, useEffect, useState } from "react";
import ParticleBackground from "./ParticleBackground";
import { motion } from "framer-motion";
import LoginCard from "./LoginCard";

function Login() {
  const cardRef = useRef(null);

  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);

  const [positions, setPositions] = useState([]);

  const boxes = [box1, box2, box3, box4, box5, box6];

  useEffect(() => {
    function updatePositions() {
      if (!cardRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();

      const newPositions = boxes.map((ref) => {
        const div = ref.current;
        if (!div) return null;

        const r = div.getBoundingClientRect();

        return {
          x1: cardRect.left + cardRect.width / 2,
          y1: cardRect.top + cardRect.height / 2,
          x2: r.left + r.width / 2,
          y2: r.top + r.height / 2,
        };
      });

      setPositions(newPositions);
    }

    updatePositions();
    window.addEventListener("resize", updatePositions);

    const interval = setInterval(updatePositions, 50);

    return () => {
      window.removeEventListener("resize", updatePositions);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-black h-screen flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />

      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {positions.map((pos, i) =>
          pos ? (
            <motion.line
              key={i}
              x1={pos.x1}
              y1={pos.y1}
              x2={pos.x2}
              y2={pos.y2}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          ) : null
        )}
      </svg>

      <div ref={cardRef}>
        <LoginCard />
      </div>

      <motion.div
        ref={box1}
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="bg-white/8  border border-white/10 w-80 backdrop-blur-3xl rounded-3xl h-40 absolute top-20 left-20"
      />

      <motion.div
        ref={box2}
        animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="bg-white/8 border  border-white/10 w-80 backdrop-blur-3xl rounded-3xl h-40 absolute top-[30rem] left-52"
      />

      <motion.div
        ref={box3}
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="bg-white/8 border border-white/10 w-80 backdrop-blur-3xl rounded-3xl h-40 absolute left-20 bottom-20"
      />

      <motion.div
        ref={box4}
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="bg-white/8 border border-white/10 w-80 backdrop-blur-3xl rounded-3xl h-40 absolute top-20 right-20"
      />

      <motion.div
        ref={box5}
        animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="bg-white/8 border border-white/10 w-80 backdrop-blur-3xl rounded-3xl h-40 absolute top-[30rem] right-52"
      />

      <motion.div
        ref={box6}
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="bg-white/8 border border-white/10 w-80 backdrop-blur-3xl rounded-3xl h-40 absolute right-20 bottom-20"
      />
    </div>
  );
}

export default Login;
