import React from "react";

const Footer = ({ theme }) => (
  <footer
    className={`text-center py-4 text-sm mt-auto transition-colors duration-300 ${
      theme === "dark" ? "bg-[#1e293b] text-gray-400" : "bg-white text-gray-600"
    }`}
  >
    © {new Date().getFullYear()} WeatherNow | Built for Jamie 🌍
  </footer>
);

export default Footer;
