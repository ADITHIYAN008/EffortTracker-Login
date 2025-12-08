import { PiBagSimpleBold } from "react-icons/pi";
import { MY_PROFILE as profile } from "../../../json/Profile";

function CareerHistory() {
  return (
    <div className="border p-6 border-black/20 shadow-md rounded-2xl w-full">
      <h1 className="font-semibold mb-6 text-lg">TCS Journey</h1>

      <div className="relative pl-10">
        {profile.career.map((item, i) => (
          <div key={i} className="mb-10  flex gap-6 items-start relative">
            <div className="absolute top-0 left-4 w-[2px] h-full bg-gray-300"></div>
            <div className="w-8 h-8  bg-blue-500 rounded-full flex items-center justify-center z-10">
              <PiBagSimpleBold className="text-white" size={18} />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl w-full shadow-sm border border-gray-100">
              <div className="flex justify-between mb-1">
                <h2 className="font-semibold text-lg">{item.role}</h2>
                <h3 className="text-black/50 text-sm">{item.period}</h3>
              </div>

              <h3 className="text-blue-500 text-sm mb-1">{item.dept}</h3>

              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CareerHistory;
