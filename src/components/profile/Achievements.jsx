import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { MY_PROFILE as profile } from "../../../json/Profile";
import { RiTeamFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";
import { AiOutlineAim } from "react-icons/ai";

function Achievements() {
  return (
    <div>
      <div className="border p-6 border-black/20 shadow-md rounded-2xl w-full">
        <h1 className="font-semibold mb-6 text-lg">Acheivements</h1>
        <div className="grid grid-cols-3 gap-4">
          {profile.achievements.map((item, index) => (
            <div
              key={index}
              className="w-full h-50 p-6 border shadow-md border-black/20 rounded-2xl"
            >
              {item.title === "Innovation Champion" && (
                <BsFillRocketTakeoffFill className="text-blue-500" size={40} />
              )}
              {item.title === "Team Player" && (
                <RiTeamFill className="text-blue-500" size={40} />
              )}
              {item.title === "Mentor" && (
                <FaRegStar className="text-blue-500" size={40} />
              )}
              {item.title === "Customer Focus" && (
                <AiOutlineAim className="text-blue-500" size={40} />
              )}

              <div className="mt-4">
                <h2 className="text-xl">{item.title}</h2>
                <h2 className="text-sm text-black/50">{item.desc}</h2>
              </div>
              <h2 className="mt-5 text-black/40 text-xs">{item.date}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
