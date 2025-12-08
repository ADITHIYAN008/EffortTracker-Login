import { useState } from "react";
import { BackgroundStars } from "./backgroundStar";
import { SunButton } from "./SunButton";
import { LoginModal } from "./LoginModal";
import { Planet } from "./Planet";
import adminIcon from "../assets/admin.png";
import managerIcon from "../assets/manager.png";
import hrIcon from "../assets/hr.png";
import guestIcon from "../assets/guest.png";
import superuserIcon from "../assets/superuser.png";
import employeeIcon from "../assets/employee.png";

const planets = [
  {
    side: "right",
    role: "Admin",
    path: adminIcon,
    glowColor: "#89CFF0",
    description: [
      "Admins oversee the operational backbone of the system. They are responsible for managing user accounts, assigning roles, controlling permissions, and ensuring that each department functions within the proper access boundaries.",
      "Admins coordinate with both management and technical teams to maintain security standards and protect data integrity. They can configure modules, approve workflow changes, monitor activity logs, resolve access issues, and enforce compliance policies.",
    ],
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    angle: 0,
    size: 118,
  },
  {
    side: "right",
    role: "Employee",
    path: employeeIcon,
    glowColor: "#dbc1ac",
    description: [
      "Employees are the core operational users of the system. They interact directly with assigned tasks, project activities, or day-to-day processes defined by their respective departments. Their interface is streamlined to enhance productivity and simplify routine workflows.",
      "Employees may submit work logs, track assignments, access personal dashboards, manage schedules, communicate with peers or managers, and utilize the tools necessary for their role. Their primary focus is execution — completing assigned responsibilities efficiently and accurately.",
    ],
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    angle: 60,
    size: 70,
  },
  {
    side: "left",
    role: "Manager",
    path: managerIcon,
    glowColor: "#C11C84",
    description: [
      "Managers act as team leaders responsible for supervising employee activity, ensuring proper task distribution, monitoring performance, and guiding workflow execution. They play a strategic role in maintaining both productivity and team morale.",
      "Managers can assign tasks, approve or reject submissions, review reports, track progress, oversee deadlines, and identify areas requiring improvement. They collaborate with HR for staffing and with Admins for access decisions.",
    ],
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    angle: 120,
    size: 114,
  },
  {
    side: "left",
    role: "HR",
    path: hrIcon,
    glowColor: "#FFBF00",
    description: [
      "HR personnel manage the human side of the platform — employee records, organizational structure, compliance policies, and routine employee interactions.",
      "They oversee recruitment processes, onboarding workflows, attendance monitoring, leave approvals, documentation management, and employee support. HR ensures that all workforce-related procedures adhere to company guidelines and legal requirements.",
    ],
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    angle: 180,
    size: 70,
  },
  {
    side: "left",
    role: "Guest",
    path: guestIcon,
    glowColor: "#B0D8C4",
    description: [
      "Guests have restricted, read-only visibility across selected areas of the system. This role is primarily intended for demonstrations, evaluations, or temporary access where no changes are allowed. Guests can explore the interface, preview workflows, and understand how the platform operates without interacting with sensitive data.",
      "They do not possess permissions to edit, delete, or create records, ensuring system safety while offering a functional overview. This makes the Guest role ideal for onboarding sessions, demos to stakeholders, and providing safe-access environments for training purposes.",
    ],
    color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    angle: 240,
    size: 96,
  },
  {
    side: "right",
    role: "Superuser",
    path: superuserIcon,
    glowColor: "#BF40BF",
    description: [
      "The Superuser holds the highest level of authority within the platform, functioning as the ultimate system controller. This role bypasses most permission restrictions and is responsible for managing deep-level configurations that affect the entire ecosystem.",
      "Superusers can modify core settings, implement structural changes, integrate external systems, adjust security policies, override user permissions, and troubleshoot at the infrastructure layer. They serve as the primary architects who ensure the stability, scalability, and compliance of the entire application.",
    ],
    color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    angle: 300,
    size: 92,
  },
];

export default function Login() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <BackgroundStars />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-white/3" />
      <div className="absolute bottom-30 right-20  text-white w-100 h-auto">
        <h2 className="font-bold text-2xl mb-4 text-blue-300/70">
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
      <div className="absolute animate-pulse  text-white left-32 top-[40%]">
        <div className="h-60 w-[1px] relative opacity-50 bg-blue-300">
          <div className="w-2 h-2 rounded-full bg-blue-300 absolute top-0 -left-1"></div>
          <div className="w-2 h-2 rounded-full bg-blue-300 absolute bottom-0 -left-1"></div>
          <div className="absolute left-8 top-[6%]">
            <h1 class="text-[70px] font-bold text-transparent [-webkit-text-stroke:2px_#89CFF0] drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
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
              key={planet.role}
              side={planet.side}
              role={planet.role}
              path={planet.path}
              glowColor={planet.glowColor}
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
    </div>
  );
}
