import React from "react";

const RecentCities = ({ cities, onSelect, onClear }) => (
  <div className="w-full max-w-md mb-6">
    <div className="flex items-center justify-between mb-2">
      <p className="text-gray-700 dark:text-gray-200 font-semibold">
        Recent Searches:
      </p>
      <button onClick={onClear} className="text-sm text-red-500 hover:underline">
        Clear All
      </button>
    </div>
    <div className="flex flex-wrap justify-center gap-2">
      {cities.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all text-sm"
        >
          {c}
        </button>
      ))}
    </div>
  </div>
);

export default RecentCities;
