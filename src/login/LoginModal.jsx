import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api";
import Cookies from "js-cookie";

export function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(username, password);

      if (!res.data.token) {
        alert("No token received from server");
        setLoading(false);
        return;
      }

      Cookies.set("token", res.data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="relative rounded-3xl backdrop-blur-xl bg-gradient-to-br from-black/50 to-black/50 border border-white/60 shadow-2xl p-8">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10" />

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="text-center mb-8">
                  <motion.h2
                    className="text-white text-3xl mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Welcome Back
                  </motion.h2>
                  <motion.p
                    className="text-white/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Enter your credentials to continue
                  </motion.p>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="username"
                      className="block text-white/90 mb-2"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
                      placeholder="Enter your username"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="password"
                      className="block text-white/90 mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </motion.div>

                  {/* BUTTON WITH LOADING */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`relative w-full py-3 rounded-2xl cursor-pointer bg-white text-black transition ${
                      loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-white/90"
                    }`}
                  >
                    <span className="relative z-10">
                      {loading ? "Verifying..." : "Sign In"}
                    </span>
                  </motion.button>
                </form>

                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href="#"
                    className="text-white/60 hover:underline transition-colors text-sm"
                  >
                    Forgot your password?
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
