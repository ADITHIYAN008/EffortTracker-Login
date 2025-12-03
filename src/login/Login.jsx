import { useState } from "react";
import { BackgroundStars } from "./backgroundStar";
import { SunButton } from "./SunButton";
import { LoginModal } from "./LoginModal";
import { Planet } from "./Planet";

const planets = [
  {
    role: "Admin",
    description: "Full access to all system modules.",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    angle: 0,
    size: 68,
  },
  {
    role: "Employee",
    description: "Standard user operations and dashboard view.",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    angle: 60,
    size: 60,
  },
  {
    role: "Manager",
    description: "Manage employee data and reports.",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    angle: 120,
    size: 64,
  },
  {
    role: "HR",
    description: "Handles recruitment, payroll, and attendance.",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    angle: 180,
    size: 60,
  },
  {
    role: "Guest",
    description: "Read-only access for demo mode.",
    color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    angle: 240,
    size: 56,
  },
  {
    role: "Superuser",
    description: "Highest-level configuration privileges.",
    color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    angle: 300,
    size: 72,
  },
];

export default function Login() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <BackgroundStars />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-white/3" />

      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="relative z-20">
          <SunButton onClick={() => setIsLoginOpen(true)} />
        </div>

        <div className="absolute inset-0">
          {planets.map((planet, index) => (
            <Planet
              key={planet.role}
              role={planet.role}
              description={planet.description}
              color={planet.color}
              angle={planet.angle}
              orbitRadius={280}
              size={planet.size}
              rotationDuration={20 + index * 2}
            />
          ))}
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-white/90 text-4xl mb-2 tracking-wide">
          Effort Tracker Login
        </h1>
        <p className="text-white/50">Click the Sun to sign in</p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-white/40 text-sm">
          Hover over planets to see role descriptions
        </p>
      </div>
    </div>
  );
}
