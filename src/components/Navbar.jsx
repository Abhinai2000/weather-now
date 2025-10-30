import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center px-4 py-3 shadow-md bg-base-200">
      <h1 className="text-xl font-bold">🌦️ Weather Now</h1>
      <button
        onClick={toggleTheme}
        className="btn btn-sm btn-outline hover:scale-105 transition-transform duration-200"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
}
