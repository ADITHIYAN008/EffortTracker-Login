import { useContext, useEffect, useState } from "react";
import { BackgroundStars } from "./backgroundStar";
import { SunButton } from "./SunButton";
import PlanetsData from "../../json/Planets.json";
import { LoginModal } from "./LoginModal";
import { Planet } from "./Planet";
import { ThemeContext } from "../context/ThemeContext";

const icons = import.meta.glob("../assets/*.png", { eager: true });

const angleGap = 360 / PlanetsData.length;

const planets = PlanetsData.map((p, index) => ({
  ...p,
  path: icons[`../assets/${p.path}.png`]?.default,
  angle: index * angleGap,
}));

export default function Login() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [orbitRadius, setOrbitRadius] = useState(200);
  const [size, setSize] = useState(0);

  const calcRadius = () => {
    if (window.innerWidth > 1356) {
      setOrbitRadius(280);
    } else {
      setOrbitRadius(200);
    }
  };

  const calcSize = () => {
    if (window.innerWidth > 1356) {
      setSize(20);
    } else {
      setSize(0);
    }
  };

  useEffect(() => {
    calcRadius();
    calcSize();
    window.addEventListener("resize", calcRadius);
    window.addEventListener("resize", calcSize);
    return () => {
      window.removeEventListener("resize", calcRadius);
      window.removeEventListener("resize", calcSize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen  bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:text-white">
      <BackgroundStars />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] 2xl:w-[600px] 2xl:h-[600px] rounded-full border border-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] 2xl:w-[580px] 2xl:h-[580px] rounded-full border border-white/3" />
      <div className="absolute bottom-30 right-20  text-white w-100 h-auto">
        <h2 className="font-bold text-xl 2xl:text-2xl mb-4 text-blue-300/70">
          In the TCS Universe, Every Effort is a Star.
        </h2>
        <div className="flex gap-2 flex-col text-sm text-white/20">
          <p>
            Just as planets revolve around the sun, every employee’s effort
            fuels the TCS ecosystem. This platform transforms your daily work
            into measurable progress, helping teams stay aligned, focused, and
            forward-moving.
          </p>
          <p>
            Track your tasks. Celebrate your progress. Let your contribution
            shine brighter than ever — Ignite your journey.
          </p>
        </div>
      </div>
      <div className="absolute animate-pulse text-black dark:text-white left-20 2xl:left-32  top-[30%] 2xl:top-[40%] z-40 pointer-events-auto">
        <div className="h-60 w-[1px] relative opacity-50 bg-blue-300">
          <div className="w-2 h-2 rounded-full bg-blue-300 absolute top-0 -left-1"></div>
          <div className="w-2 h-2 rounded-full bg-blue-300 absolute bottom-0 -left-1"></div>

          <div className="absolute left-8 top-[6%] z-40 pointer-events-auto">
            <h1 className="text-[70px] font-bold text-transparent [-webkit-text-stroke:2px_#89CFF0] drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              Effort
            </h1>
            <h1 className="text-[70px] font-bold text-transparent [-webkit-text-stroke:2px_#89CFF0] drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              Tracker
            </h1>
          </div>
        </div>
      </div>

      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="relative z-20">
          <SunButton onClick={() => setIsLoginOpen(true)} />
        </div>

        <div className="absolute inset-0">
          {planets.map((planet, index) => (
            <Planet
              key={index}
              side={planet.side}
              role={planet.role}
              path={planet.path}
              glowColor={planet.glowColor}
              description={planet.description}
              color={planet.color}
              angle={planet.angle}
              orbitRadius={orbitRadius}
              size={planet.size + size}
              rotationDuration={20 + index * 2}
            />
          ))}
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
