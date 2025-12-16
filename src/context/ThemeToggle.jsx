import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 cursor-pointer rounded-full
        bg-white text-black
        dark:bg-gray-900 dark:text-white
        dark:border-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition
      "
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}

export default ThemeToggle;
