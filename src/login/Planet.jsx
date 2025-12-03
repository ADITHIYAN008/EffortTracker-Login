import { motion } from "framer-motion";
import { useState } from "react";

export function Planet({
  role,
  description,
  color,
  angle,
  orbitRadius,
  size,
  rotationDuration,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
  const y = Math.sin((angle * Math.PI) / 180) * orbitRadius;

  return (
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
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `-${size / 2}px`,
          marginTop: `-${size / 2}px`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="w-full h-full rounded-full cursor-pointer relative"
          style={{
            background: color,
            boxShadow: `0 0 20px ${color}`,
          }}
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute flex items-center justify-center inset-0 rounded-full opacity-100"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 70%)",
            }}
          >
            <h2 className="text-black text-shadow-2xs uppercase text-[10px] font-bold">
              {role}
            </h2>
          </div>
        </motion.div>

        {isHovered && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl min-w-[240px] z-50"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center">
              <h3 className="text-white mb-1">{role}</h3>
              <p className="text-white/80 text-sm">{description}</p>
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/10" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
