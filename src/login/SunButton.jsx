import { motion } from "framer-motion";

export function SunButton({ onClick }) {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-orange-400/40 via-yellow-400/40 to-orange-400/40 blur-2xl"
        animate={{
          scale: [1.1, 1.3, 1.1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      <motion.button
        onClick={onClick}
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 shadow-2xl cursor-pointer z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 40px 10px rgba(251, 191, 36, 0.6)",
            "0 0 60px 20px rgba(251, 191, 36, 0.8)",
            "0 0 40px 10px rgba(251, 191, 36, 0.6)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/50 to-transparent" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm" />
        <span className="relative z-10 text-yellow-700 font-bold text-shadow-md tracking-wider">
          IGNITE
        </span>
      </motion.button>
    </div>
  );
}
