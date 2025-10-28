import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";

const App = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0f172a] text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Body theme={theme} />
      <Footer theme={theme} />
    </div>
  );
};

export default App;
