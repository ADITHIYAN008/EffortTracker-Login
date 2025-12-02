import TcsLogo from "../assets/tcs-logo.png";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useState } from "react";

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid username or password");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-[#161616]/70 backdrop-blur-xl px-10 py-12 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] w-[380px] border border-white/10">
        <div className="flex flex-col items-center mb-8">
          <img src={TcsLogo} className="h-20 opacity-90" alt="TCS" />
          <h2 className="text-xl mt-4 font-medium text-white/70 tracking-wide">
            Effort Tracking Portal
          </h2>
        </div>

        <div className="mb-5">
          <input
            type="email"
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-all"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-all"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 cursor-pointer bg-white text-black font-semibold rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-neutral-200 active:scale-[0.98] transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
