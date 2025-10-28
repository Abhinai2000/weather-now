import React, { useState } from "react";

const Body = ({ theme }) => {
  // State variables for city input, weather data, and UI feedback
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch weather for the entered city
  const fetchWeather = async () => {
    if (!city.trim()) return; // Prevent empty requests
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // 1️⃣ Step 1: Get latitude and longitude for the given city
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      const geoData = await geoRes.json();

      // If city not found, display friendly error message
      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found. Try another one.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2️⃣ Step 2: Use coordinates to fetch current weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      // Store result in state
      setWeather({ ...weatherData.current_weather, name, country });
    } catch (err) {
      // Handle network or fetch errors gracefully
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-10">
      {/* Weather search card */}
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-6 text-center transition-all ${
          theme === "dark" ? "bg-[#1e293b]" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-5">Search Weather by City</h2>

        {/* Input and search button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              theme === "dark"
                ? "bg-[#334155] border-[#475569] text-white focus:ring-blue-500"
                : "bg-gray-100 border-gray-300 focus:ring-blue-400"
            }`}
          />
          <button
            onClick={fetchWeather}
            className="px-5 py-3 bg-blue-500 text-white rounded-lg w-full sm:w-auto hover:bg-blue-600 transition-all"
          >
            Search
          </button>
        </div>

        {/* Loading feedback */}
        {loading && <p className="animate-pulse">Fetching weather...</p>}

        {/* Error feedback */}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {/* Display weather results */}
        {weather && !loading && (
          <div className="mt-4 space-y-2 text-lg">
            <h3 className="font-semibold text-xl">
              {weather.name}, {weather.country}
            </h3>
            <p>🌡️ Temperature: {weather.temperature}°C</p>
            <p>💨 Wind Speed: {weather.windspeed} km/h</p>
            <p>🧭 Direction: {weather.winddirection}°</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
