import React from "react";
import { weatherDescriptions } from "../utils/weatherDescriptions";

const CurrentWeatherCard = ({ weather }) => (
  <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 max-w-md w-full mb-8 transition-all">
    <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
      {weather.city}, {weather.country}
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
      {weatherDescriptions[weather.code] || "🌍 Weather Info"}
    </p>
    <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
      {weather.temp}°C
    </p>
    <p className="text-gray-700 dark:text-gray-300">
      💨 Wind: {weather.wind} km/h
    </p>
    <p className="text-gray-600 dark:text-gray-400 mt-1">
      🕒 {new Date(weather.time).toLocaleString()}
    </p>
  </div>
);

export default CurrentWeatherCard;
