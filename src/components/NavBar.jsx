import React from "react";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav
      className={`w-full px-6 py-4 flex justify-between items-center shadow-md transition-all ${
        theme === "dark" ? "bg-[#1e293b]" : "bg-white"
      }`}
    >
      <h1 className="text-2xl font-bold tracking-wide">🌦️ WeatherNow</h1>
      <button
        onClick={toggleTheme}
        className={`px-4 py-2 rounded-full font-medium transition-all shadow-sm ${
          theme === "dark"
            ? "bg-[#334155] hover:bg-[#475569] text-gray-100"
            : "bg-gray-200 hover:bg-gray-300 text-gray-900"
        }`}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
};

export default Navbar;
