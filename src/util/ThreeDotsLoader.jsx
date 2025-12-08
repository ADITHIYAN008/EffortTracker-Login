import { motion } from "framer-motion";

export default function ThreeDotsLoader() {
  return (
    <div className="flex items-center justify-center gap-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-blue-500"
          animate={{
            y: ["0%", "-60%", "0%"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
