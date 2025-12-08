import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function Planet({
  role,
  description,
  glowColor,
  path,
  angle,
  orbitRadius,
  size,
  rotationDuration,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [dynamicSide, setDynamicSide] = useState("right");
  const planetRef = useRef(null);

  const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
  const y = Math.sin((angle * Math.PI) / 180) * orbitRadius;

  useEffect(() => {
    function updateSide() {
      if (!planetRef.current) return;
      const rect = planetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      const screenCenter = window.innerWidth / 2;
      setDynamicSide(centerX > screenCenter ? "right" : "left");
    }

    updateSide();
    const interval = setInterval(updateSide, 300);
    window.addEventListener("resize", updateSide);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateSide);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`fixed top-10 h-auto flex flex-col gap-7  text-center bg-white/2 rounded-xl backdrop-blur-xl border border-blue-200/70 shadow-xl p-6 pointer-events-none
    ${dynamicSide === "left" ? "left-10" : "right-10"}`}
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ width: "380px" }}
      >
        <motion.h2
          className={`text-xl font-bold  underline`}
          style={{ color: `${glowColor}` }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.25 }}
        >
          {role}
        </motion.h2>

        <motion.div
          className="flex flex-col gap-4"
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        >
          {description.map((line, i) => (
            <motion.p
              key={i}
              className="text-sm tracking-wider"
              style={{
                color: glowColor,
                opacity: 0.5,
                filter: `drop-shadow(0 0 6px ${glowColor}60)`,
              }}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: {
                  opacity: 0.6,
                  y: 0,
                  transition: {
                    duration: 1.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
        }}
        animate={{
          x: [x, Math.cos(((angle + 360) * Math.PI) / 180) * orbitRadius],
          y: [y, Math.sin(((angle + 360) * Math.PI) / 180) * orbitRadius],
        }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          ref={planetRef}
          className="relative"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            marginLeft: `-${size / 2}px`,
            marginTop: `-${size / 2}px`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
        >
          <motion.img
            className="cursor-pointer object-cover"
            style={{ filter: `drop-shadow(0 0 10px ${glowColor})` }}
            src={path}
            alt=""
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
