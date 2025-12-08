import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function useCountUp(value, duration = 800) {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (end === 0) {
      setCount(0);
      return;
    }

    const increment = end / (duration / 16.6);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16.6);

    return () => clearInterval(interval);
  }, [value]);

  return count;
}

function getMonthlySummary(tasks, year, month) {
  const monthStr = String(month + 1).padStart(2, "0");

  let totalHours = 0;
  let totalTasks = 0;
  let high = 0;
  let medium = 0;
  let low = 0;

  Object.keys(tasks).forEach((dateKey) => {
    if (!dateKey.startsWith(`${year}-${monthStr}`)) return;

    tasks[dateKey].forEach((task) => {
      totalTasks++;

      const hours = Number(task.hours.replace("h", "")) || 0;
      totalHours += hours;

      if (task.priority === "High Priority") high++;
      if (task.priority === "Medium Priority") medium++;
      if (task.priority === "Low Priority") low++;
    });
  });

  return {
    totalHours,
    totalTasks,
    high,
    medium,
    low,
  };
}

function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let arr = [];

  for (let i = 0; i < firstDay; i++) arr.push({ day: "", events: [] });

  for (let d = 1; d <= daysInMonth; d++) arr.push({ day: d, events: [] });

  while (arr.length < 42) arr.push({ day: "", events: [] });

  return arr;
}

const INITIAL_TASKS = {
  "2025-11-15": [
    {
      title: "Sprint Planning Meeting",
      type: "Meeting",
      date: "Nov 15",
      priority: "High Priority",
      color: "purple",
      hours: "2h",
    },
    {
      title: "Code Review - Auth Module",
      type: "Development",
      date: "Nov 15",
      priority: "Medium Priority",
      color: "blue",
      hours: "3h",
    },
    {
      title: "Documentation Update",
      type: "Documentation",
      date: "Nov 15",
      priority: "Low Priority",
      color: "green",
      hours: "1.5h",
    },
    {
      title: "Client Presentation",
      type: "Meeting",
      date: "Nov 15",
      priority: "High Priority",
      color: "purple",
      hours: "2h",
    },
    {
      title: "Performance Testing",
      type: "Testing",
      date: "Nov 15",
      priority: "Medium Priority",
      color: "red",
      hours: "4h",
    },
  ],
  "2025-11-18": [
    {
      title: "Documentation Update",
      type: "Documentation",
      color: "green",
      hours: "1.5h",
    },
  ],
  "2025-11-20": [
    { title: "Analysis Work", type: "Analysis", color: "purple", hours: "2h" },
  ],
  "2025-11-22": [
    {
      title: "Performance Testing",
      type: "Testing",
      color: "orange",
      hours: "4h",
    },
  ],
};

const DOT_COLOR = {
  purple: "#8b5cf6",
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#f97316",
  red: "#ef4444",
};

export default function Calendar() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(10);

  const [taskDescription, setTaskDescription] = useState("");
  const [assist, setAssist] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [taskType, setTaskType] = useState("");

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [dates, setDates] = useState([]);
  const [taskBtn, setTaskBtn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const summary = getMonthlySummary(tasks, year, month);
  const countHours = useCountUp(summary.totalHours);
  const countTasks = useCountUp(summary.totalTasks);
  const countHigh = useCountUp(summary.high);
  const countMedium = useCountUp(summary.medium);
  const countLow = useCountUp(summary.low);

  const resetFields = () => {
    setTaskDescription("");
    setAssist(false);
    setStartTime("");
    setEndTime("");
    setTaskType("");
  };

  const handleDrop = (e, dropDate) => {
    const taskIndex = e.dataTransfer.getData("taskIndex");
    const fromDate = e.dataTransfer.getData("taskDate");

    if (!fromDate || taskIndex === "") return;

    const taskToCopy = tasks[fromDate][taskIndex];

    setTasks((prev) => ({
      ...prev,
      [dropDate]: prev[dropDate]
        ? [...prev[dropDate], { ...taskToCopy }]
        : [{ ...taskToCopy }],
    }));
  };

  const addTask = () => {
    if (!taskDescription.trim()) {
      alert("Please enter a task description!");
      return;
    }
    if (!taskType) {
      alert("Please select a task type!");
      return;
    }
    if (!startTime || !endTime) {
      alert("Please select both start and end time!");
      return;
    }

    const priorityMap = {
      Development: "High Priority",
      Testing: "Medium Priority",
      Analysis: "Medium Priority",
      Documentation: "Low Priority",
      Meeting: "High Priority",
    };

    const colorMap = {
      Development: "blue",
      Testing: "orange",
      Analysis: "purple",
      Documentation: "green",
      Meeting: "red",
    };

    const newTask = {
      title: taskDescription,
      type: taskType,
      priority: priorityMap[taskType] || "Low Priority",
      color: colorMap[taskType] || "green",
      hours: calculateHours(startTime, endTime),
    };

    setTasks((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate]
        ? [...prev[selectedDate], newTask]
        : [newTask],
    }));

    resetFields();
    setTaskBtn(false);
  };

  const deleteTask = (taskIndex) => {
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter((_, i) => i !== taskIndex),
    }));
  };

  useEffect(() => {
    setDates(generateCalendar(year, month));
  }, [year, month]);

  const formatDate = (day) => {
    if (!day) return "";
    const m = (month + 1).toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const goPrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  function calculateHours(start, end) {
    if (!start || !end) return "0h";

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;

    const diff = (endMins - startMins) / 60;

    return diff > 0 ? diff + "h" : "0h";
  }

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Task Calendar</h2>
            <h3 className="text-sm text-black/50">
              Track your completed tasks by date
            </h3>
          </div>
          <div className="flex gap-5">
            <div className=" flex items-center gap-2">
              <div className="text-xs text-black/50">Total Tasks:</div>
              <div className="font-bold">{countTasks}</div>
            </div>
            <div className=" flex items-center gap-2">
              <div className="text-xs text-black/50">Total Hours:</div>
              <div className="font-bold">{countHours}</div>
            </div>
            <div className=" flex items-center gap-2">
              <div className="text-xs text-black/50">High Priority:</div>
              <div className="font-bold">{countHigh}</div>
            </div>
            <div className=" flex items-center gap-2">
              <div className="text-xs text-black/50">Medium Priority:</div>
              <div className="font-bold">{countMedium}</div>
            </div>
            <div className=" flex items-center gap-2">
              <div className="text-xs text-black/50">Low Priority:</div>
              <div className="font-bold">{countLow}</div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <FaChevronLeft
              className="text-black/60 cursor-pointer"
              size={22}
              onClick={goPrev}
            />

            <div className="w-44 text-center rounded-xl bg-black/2">
              <h1 className="text-md text-black/90 px-4 py-2 font-semibold">
                {monthName} {year}
              </h1>
            </div>

            <FaChevronRight
              className="text-black/60 cursor-pointer"
              size={22}
              onClick={goNext}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 mb-4 text-gray-700 text-sm">
          <div className="text-center">Sun</div>
          <div className="text-center">Mon</div>
          <div className="text-center">Tue</div>
          <div className="text-center">Wed</div>
          <div className="text-center">Thu</div>
          <div className="text-center">Fri</div>
          <div className="text-center">Sat</div>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {dates.map((item, i) => {
            const fullDate = formatDate(item.day);
            const dayTasks = tasks[fullDate] || [];

            return (
              <div
                key={i}
                onClick={() => item.day && setSelectedDate(fullDate)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, fullDate)}
                className={`h-24 rounded-xl p-2 cursor-pointer bg-gray-300 
                  ${item.day ? "hover:bg-gray-400 transition" : "opacity-30"}`}
              >
                <span className="text-[13px] text-gray-600">{item.day}</span>

                <div className="flex gap-[3px] mt-1">
                  {dayTasks.slice(0, 3).map((task, idx) => (
                    <span
                      key={idx}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: DOT_COLOR[task.color] }}
                    ></span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-80 h-full bg-white p-4 rounded-xl border border-gray-200">
        <h2 className="text-md font-semibold mb-1">Day Tasks</h2>

        {!selectedDate ? (
          <p className="text-sm text-gray-400">Select a date to view tasks</p>
        ) : (
          <>
            <h3 className="font-medium text-sm text-black/50 mb-5">
              {tasks[selectedDate]?.length || 0} task(s)
            </h3>

            {tasks[selectedDate]?.map((task, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("taskIndex", index);
                  e.dataTransfer.setData("taskDate", selectedDate);
                }}
                className="p-3 hover:bg-gray-100 rounded-lg border border-gray-200 mb-4 relative"
              >
                <button
                  onClick={() => deleteTask(index)}
                  className="absolute cursor-pointer top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <MdDelete size={16} />
                </button>

                <h4 className="font-medium text-sm">{task.title}</h4>

                <div className="flex gap-2 items-center mt-2">
                  <span
                    className="text-[10px] px-2 py-[2px] rounded-md"
                    style={{
                      backgroundColor: DOT_COLOR[task.color] + "22",
                      color: DOT_COLOR[task.color],
                    }}
                  >
                    {task.type}
                  </span>

                  <span className="text-xs text-gray-500">{task.hours}</span>
                </div>

                <div className="flex mt-2 justify-between items-center">
                  <h2
                    className={`${
                      task.priority === "High Priority" ||
                      task.priority === "Medium Priority"
                        ? "text-red-500"
                        : ""
                    } text-xs text-black/60`}
                  >
                    {task.priority}
                  </h2>

                  <h2 className="text-xs text-black/50">
                    {task.date || selectedDate}
                  </h2>
                </div>
              </div>
            ))}

            {(!tasks[selectedDate] || tasks[selectedDate].length === 0) && (
              <p className="text-sm text-gray-400">No tasks for this date</p>
            )}
          </>
        )}

        <div
          onClick={() => {
            if (!selectedDate) {
              alert("Please select a date first!");
              return;
            }
            setTaskBtn(true);
          }}
          className="flex w-50 mx-auto bg-blue-400 py-2 rounded-full px-5 justify-between items-center cursor-pointer hover:bg-blue-500 mt-5"
        >
          <button className="text-sm cursor-pointer text-white">
            Add Completed Task
          </button>
          <MdAdd color="white" size={20} />
        </div>

        {taskBtn && (
          <div
            className="fixed inset-0 bg-black/5 backdrop-blur-sm z-40"
            onClick={() => {
              resetFields();
              setTaskBtn(false);
            }}
          ></div>
        )}

        {taskBtn && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-3xl mx-auto mt-10">
              <div className="rounded-2xl border border-gray-300 shadow-sm p-4 bg-white">
                <textarea
                  placeholder="Enter Description of the task..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full h-28 resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-black/30"
                ></textarea>

                <div className="flex justify-between items-center mt-3 px-1">
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        checked={assist}
                        onChange={(e) => setAssist(e.target.checked)}
                        type="checkbox"
                        className="w-4 accent-black h-4"
                      />
                      <span className="text-sm text-gray-700">Assist</span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border border-gray-300 rounded-lg cursor-pointer px-3 py-2 text-sm focus:ring-1 focus:ring-black outline-none"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border border-gray-300 rounded-lg cursor-pointer px-3 py-2 text-sm focus:ring-1 focus:ring-black outline-none"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 mb-1">
                        Task Type
                      </label>
                      <select
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="" disabled hidden>
                          Task Type
                        </option>
                        <option value="Development">Development</option>
                        <option value="Testing">Testing</option>
                        <option value="Analysis">Analysis</option>
                        <option value="Documentation">Documentation</option>
                        <option value="Meeting">Meeting</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        resetFields();
                        setTaskBtn(false);
                      }}
                      className="bg-black text-white text-sm px-4 py-2 cursor-pointer rounded-lg transition"
                    >
                      Exit
                    </button>

                    <button
                      onClick={addTask}
                      className="bg-blue-400 hover:bg-blue-500 text-white text-sm px-4 py-2 cursor-pointer rounded-lg transition"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
