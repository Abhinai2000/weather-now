import React, { useState, useEffect } from "react";
import Body from "./pages/Body";

function App() {
  const [theme, setTheme] = useState("dark");

  //  Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  //  Toggle between themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/*Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold tracking-tight">WeatherNow</h1>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/*  Main body */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <Body />
      </main>

      {/*  Footer */}
      <footer className="py-4 text-center text-sm bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <p>
          Built with ❤️ for outdoor enthusiasts – Powered by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-blue-500"
          >
            Open-Meteo API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
