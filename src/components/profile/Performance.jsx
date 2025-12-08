import CountUp from "react-countup";
import { FaStar } from "react-icons/fa";
import { MY_PROFILE as profile } from "../../../json/Profile";

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      className={`text-yellow-400 ${
        i < Math.floor(rating) ? "" : "opacity-40"
      }`}
      size={18}
    />
  ));
}

function Performance() {
  return (
    <div className="flex gap-10 mb-5">
      <div className="border p-10 border-black/20 shadow-md rounded-2xl w-full">
        <h1 className="font-semibold mb-6 text-lg">Performance Ratings</h1>
        <div className="flex flex-col gap-6">
          {profile.ratings.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-700 mb-2 text-sm font-semibold">
                  {item.title}
                </h2>
                <div className="flex gap-1">{renderStars(item.rating)}</div>
              </div>

              <div className="text-gray-700 font-medium text-sm">
                {item.rating} / 5.0
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border p-10 border-black/20 shadow-md rounded-2xl w-full">
        <h1 className="font-semibold mb-6 text-lg">Performance Points</h1>
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-5xl text-blue-500">
            <CountUp start={0} end={profile.points.total} duration={1} />
          </h2>
          <h2 className="text-sm text-black/50">Total Points Earned</h2>
        </div>
        <div className="mt-10 text-sm">
          <div className="flex justify-between bg-gray-100/50 px-5 mb-5 py-2 rounded-xl">
            <h2>This Month</h2>
            <h2 className="text-green-500">+{profile.points.month} pts</h2>
          </div>
          <div className="flex justify-between bg-gray-100/50 px-5 mb-5 py-2 rounded-xl">
            <h2>This Quarter</h2>
            <h2 className="text-green-500">+{profile.points.quarter} pts</h2>
          </div>
          <div className="flex justify-between bg-gray-100/50 px-5 mb-5 py-2 rounded-xl">
            <h2>This Year</h2>
            <h2 className="text-green-500">+{profile.points.year} pts</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
