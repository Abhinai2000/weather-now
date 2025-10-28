import React from "react";

const SearchBar = ({ city, setCity, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    className="flex flex-col sm:flex-row w-full max-w-md gap-3 mb-6"
  >
    <input
      type="text"
      placeholder="Enter city..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
    />
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg transition-all"
    >
      Search
    </button>
  </form>
);

export default SearchBar;
