import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";

export default function MacNotifications() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="group relative w-80 rounded-2xl bg-slate-300 backdrop-blur-xl border border-black/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4"
          >
            <button
              onClick={() => removeNotification(n.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 rounded-full p-1 text-black/50 hover:text-black cursor-pointer hover:bg-black/10 transition"
            >
              <X size={14} />
            </button>

            <div className="flex gap-3 items-start group">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
                🔔
              </div>

              <div>
                <h4 className="text-sm font-semibold text-black">{n.title}</h4>
                <p className="text-xs text-black/60">{n.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
