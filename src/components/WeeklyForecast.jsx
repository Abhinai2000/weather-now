import React from "react";
import { weatherDescriptions } from "../utils/weatherDescriptions";

const WeeklyForecast = ({ forecast }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 w-full max-w-4xl">
    {forecast.map((day) => (
      <div
        key={day.date}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform"
      >
        <p className="font-medium text-gray-700 dark:text-gray-100 text-sm mb-1">
          {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
        </p>
        <p className="text-2xl mb-1">
          {weatherDescriptions[day.code]?.split(" ")[0] || "☁️"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {day.min}° / <span className="font-semibold">{day.max}°</span>
        </p>
      </div>
    ))}
  </div>
);

export default WeeklyForecast;
