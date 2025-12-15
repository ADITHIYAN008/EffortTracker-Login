import React, { useContext } from "react";
import CountUp from "react-countup";
import { IoIosTrendingUp } from "react-icons/io";
import { MdAccessTime, MdTaskAlt } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { AuthContext } from "../../context/AuthContext";

function Default() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white mx-3 overflow-scroll">
      <div>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-[13px] text-black/50">{user?.role}</p>
        </div>
        <div className="mt-5 mb-5 flex justify-between">
          <div className="w-[24%] h-35 rounded-2xl border border-black/20 p-6">
            <div className="flex justify-between mb-4">
              <div className="bg-blue-200 p-1 rounded-md">
                <MdAccessTime className="text-blue-500" size={22} />
              </div>
              <h2 className="text-green-600 font-bold bg-green-100/60 px-3 rounded-xl inline-flex items-center justify-center text-[9px]">
                +12%
              </h2>
            </div>
            <div>
              <h1 className="font-semibold text-xl">
                <CountUp start={0} end={156} duration={2} />h
              </h1>
              <h3 className="text-sm text-black/50">Hours This Month</h3>
            </div>
          </div>
          <div className="w-[24%] h-35 rounded-2xl border border-black/20 p-6">
            <div className="flex justify-between mb-4">
              <div className="bg-green-100/60 p-1 rounded-md">
                <MdTaskAlt className="text-green-600" size={22} />
              </div>
              <h2 className="text-green-600 font-bold bg-green-100/60 px-3 rounded-xl inline-flex items-center justify-center text-[9px]">
                +8%
              </h2>
            </div>
            <div>
              <h1 className="font-semibold text-xl">
                <CountUp start={0} end={42} duration={2} />
              </h1>
              <h3 className="text-sm text-black/50">Tasks Completed</h3>
            </div>
          </div>
          <div className="w-[24%] h-35 rounded-2xl border border-black/20 p-6">
            <div className="flex justify-between mb-4">
              <div className="bg-purple-100/60 p-1 rounded-md">
                <IoIosTrendingUp className="text-purple-500" size={22} />
              </div>
              <h2 className="text-green-600 font-bold bg-green-100/60 px-3 rounded-xl inline-flex items-center justify-center text-[9px]">
                +15%
              </h2>
            </div>
            <div>
              <h1 className="font-semibold text-xl">
                <CountUp start={0} end={94} duration={2} />%
              </h1>
              <h3 className="text-sm text-black/50">Efficiency Score</h3>
            </div>
          </div>
          <div className="w-[24%] h-35 rounded-2xl border border-black/20 p-6">
            <div className="flex justify-between mb-4">
              <div className="bg-orange-100/60 p-1 rounded-md">
                <SlBadge className="text-orange-500" size={22} />
              </div>
              <h2 className="text-blue-500 font-bold bg-blue-100/60 px-3 rounded-xl inline-flex items-center justify-center text-[9px]">
                new
              </h2>
            </div>
            <div>
              <h1 className="font-semibold text-xl">
                <CountUp start={0} end={12} duration={2} />
              </h1>
              <h3 className="text-sm text-black/50">Appreciations</h3>
            </div>
          </div>
        </div>
        <div className="mb-10 flex gap-5 justify-between">
          <div className="w-[75%] h-[450px] rounded-2xl border border-black/20"></div>
          <div className="h-[450px] p-6 w-[25%] rounded-2xl border border-black/20">
            <h1 className="text-md font-medium mb-3">Recent Tasks Completed</h1>
            <div className="flex flex-col gap-4 mt-5">
              <div className="flex gap-2 border-b border-black/20 pb-4">
                <MdTaskAlt className="text-green-600" size={22} />
                <div>
                  <h2 className="text-sm">
                    Code review for authentication module
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="text-xs text-black/50">2 hours ago</h3>
                    <h3 className="text-blue-500 bg-blue-100/60 px-2 py-[2px] text-[10px] rounded-sm">
                      Developement
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 border-b border-black/20 pb-4">
                <MdTaskAlt className="text-green-600" size={22} />
                <div>
                  <h2 className="text-sm">
                    UI enhancement for dashboard cards
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="text-xs text-black/50">3 hours ago</h3>
                    <h3 className="text-blue-500 bg-blue-100/60 px-2 py-[2px] text-[10px] rounded-sm">
                      Design
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 border-b border-black/20 pb-4">
                <MdTaskAlt className="text-green-600" size={22} />
                <div>
                  <h2 className="text-sm">Team standup meeting</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="text-xs text-black/50">4 hours ago</h3>
                    <h3 className="text-blue-500 bg-blue-100/60 px-2 py-[2px] text-[10px] rounded-sm">
                      Meeting
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 border-b border-black/20 pb-4">
                <MdTaskAlt className="text-green-600" size={22} />
                <div>
                  <h2 className="text-sm">Update project documentation</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="text-xs text-black/50">1 day ago</h3>
                    <h3 className="text-blue-500 bg-blue-100/60 px-2 py-[2px] text-[10px] rounded-sm">
                      Documentation
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <MdTaskAlt className="text-green-600" size={18} />
                <div>
                  <h2 className="text-sm">Performance optimization analysis</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="text-xs text-black/50">1 day ago</h3>
                    <h3 className="text-blue-500 bg-blue-100/60 px-2 py-[2px] text-[10px] rounded-sm">
                      Analysis
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorem
        labore cum obcaecati, odit eos quis eligendi pariatur! Exercitationem,
        voluptas non quae ea nostrum dolore quaerat! Blanditiis cumque pariatur
        sapiente.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
        similique eos nostrum nulla ratione labore est mollitia iusto architecto
        temporibus, autem voluptatem animi corrupti harum incidunt aliquam totam
        iste modi?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas
        perspiciatis nobis! Ipsa error dicta porro autem facere aliquid? Harum
        est vel numquam aut explicabo veritatis labore eveniet dolorum eius.
      </p>
    </div>
  );
}

export default Default;
