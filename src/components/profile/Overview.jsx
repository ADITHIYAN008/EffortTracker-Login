import React, { useEffect } from "react";
import { MY_PROFILE as profile } from "../../../json/Profile";

function CountUp({ value, duration = 800 }) {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (start === end) return;

    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Number(start.toFixed(0)));
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

function useAnimatedWidth(target, duration = 300) {
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setWidth(start);
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return width;
}

function Overview() {
  const taskPercent = (profile.task.completed / profile.task.total) * 100;
  const hoursPercent = (profile.hours.logged / profile.hours.total) * 100;
  const projectsPercent =
    (profile.projectsInvolved.completed / profile.projectsInvolved.total) * 100;

  const animatedTaskPercent = useAnimatedWidth(taskPercent);
  const animatedHoursPercent = useAnimatedWidth(hoursPercent);
  const animatedProjectsPercent = useAnimatedWidth(projectsPercent);

  return (
    <div className="flex gap-2 justify-between">
      <div className="w-[50%] shadow-md h-auto border text-sm border-black/20 flex flex-col gap-7 rounded-2xl p-5">
        <h1 className="font-semibold">Personal Details</h1>
        <div className="flex border-b pb-3 border-black/10 justify-between">
          <h2 className="text-black/50">Full Name</h2>
          <h2>{profile.name}</h2>
        </div>
        <div className="flex border-b pb-3 border-black/10 justify-between">
          <h2 className="text-black/50">Email</h2>
          <h2>{profile.email}</h2>
        </div>
        <div className="flex border-b pb-3 border-black/10  justify-between">
          <h2 className="text-black/50">Employee ID</h2>
          <h2>TCS - {profile.empId}</h2>
        </div>
        <div className="flex border-b pb-3 border-black/10 justify-between">
          <h2 className="text-black/50">Department</h2>
          <h2>{profile.department}</h2>
        </div>
        <div className="flex border-b pb-3 border-black/10 justify-between">
          <h2 className="text-black/50">Location</h2>
          <h2>{profile.location}</h2>
        </div>
        <div className="flex  justify-between">
          <h2 className="text-black/50">Reporting To</h2>
          <h2>{profile.reportingTo}</h2>
        </div>
      </div>
      <div className="w-[48%] shadow-md h-[350px] border text-sm border-black/20 rounded-2xl p-5">
        <h1 className="font-semibold mb-4">Contributions Summary</h1>

        <div className="mb-5 flex flex-col gap-3">
          <div className="flex justify-between">
            <h2>Tasks Completed</h2>
            <div>
              <CountUp value={profile.task.completed} /> / {profile.task.total}
            </div>
          </div>
          <div
            className={` transition-all duration-300 bg-blue-500 h-2 rounded-md `}
            style={{ width: `${animatedTaskPercent}%` }}
          ></div>
        </div>
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex justify-between">
            <h2>Hours This Month</h2>
            <div>
              <CountUp value={profile.hours.logged} /> / {profile.hours.total}
            </div>
          </div>
          <div
            className={` transition-all duration-300 bg-blue-500 h-2 rounded-md `}
            style={{ width: `${animatedHoursPercent}%` }}
          ></div>
        </div>
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex justify-between">
            <h2>Projects Involved</h2>
            <div>
              <CountUp value={profile.projectsInvolved.completed} /> /{" "}
              {profile.projectsInvolved.total}
            </div>
          </div>
          <div
            className={` transition-all duration-300 bg-blue-500 h-2 rounded-md `}
            style={{ width: `${animatedProjectsPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="border border-black/20 w-[50%] h-20 rounded-xl flex items-center justify-center px-10">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-blue-500">
                <CountUp value={profile.oneTimeDelivery} />%
              </h2>
              <h2 className="text-xs text-black/50">On-Time Delivery</h2>
            </div>
          </div>
          <div className="border border-black/20  flex justify-center items-center w-[50%] h-20  px-10 rounded-xl">
            <div className="flex items-center flex-col">
              <h2 className="text-2xl font-semibold text-blue-500">
                {profile.avgRating}
              </h2>
              <h2 className="text-xs text-black/50">Avg Rating</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
