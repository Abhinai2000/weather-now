import React, { useState, useEffect } from "react";

const Body = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState([]);

  // 🧠 Load recent cities from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(saved);
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast([]);

      // 🌍 Geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // ☀️ Weather API (current + 7-day)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      // 🕒 Current Weather
      setWeather({
        city: name,
        country,
        temp: weatherData.current.temperature_2m,
        wind: weatherData.current.wind_speed_10m,
        code: weatherData.current.weather_code,
        time: weatherData.current.time,
      });

      // 📆 Weekly Forecast
      const dailyData = weatherData.daily;
      const weeklyForecast = dailyData.time.map((date, i) => ({
        date,
        max: dailyData.temperature_2m_max[i],
        min: dailyData.temperature_2m_min[i],
        code: dailyData.weather_code[i],
      }));
      setForecast(weeklyForecast);

      // 💾 Save to recent searches
      const updated = [name, ...recentCities.filter((c) => c !== name)].slice(0, 5);
      setRecentCities(updated);
      localStorage.setItem("recentCities", JSON.stringify(updated));
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }
    fetchWeather(city);
  };

  const clearRecentCities = () => {
    localStorage.removeItem("recentCities");
    setRecentCities([]);
  };

  const weatherDescriptions = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    48: "🌫️ Rime fog",
    51: "🌦️ Drizzle",
    61: "🌧️ Light rain",
    63: "🌧️ Moderate rain",
    71: "❄️ Snow",
    80: "🌦️ Showers",
    95: "⛈️ Thunderstorm",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-6 text-center transition-all">
      {/* 🔍 Search */}
      <form
        onSubmit={handleSubmit}
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

      {/* 🕓 Recent Searches */}
      {recentCities.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
              Recent Searches:
            </p>
            <button
              onClick={clearRecentCities}
              className="text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {recentCities.map((c) => (
              <button
                key={c}
                onClick={() => fetchWeather(c)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all text-sm"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ❌ Error */}
      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

      {/* ⏳ Loading */}
      {loading && (
        <div className="flex items-center justify-center mb-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* 🌦️ Current Weather */}
      {weather && !loading && (
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
      )}

      {/* 📆 Weekly Forecast */}
      {forecast.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 w-full max-w-4xl">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <p className="font-medium text-gray-700 dark:text-gray-100 text-sm mb-1">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
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
      )}
    </div>
  );
};

export default Body;
