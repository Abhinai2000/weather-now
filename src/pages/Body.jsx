import React, { useState, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import SearchBar from "../components/SearchBar";
import RecentCities from "../components/RecentCities";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import WeeklyForecast from "../components/WeeklyForecast";

const Body = () => {
  const [city, setCity] = useState("");
  const [recentCities, setRecentCities] = useState([]);
  const { weather, forecast, error, loading, fetchWeather } = useWeather();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city, recentCities, setRecentCities);
  };

  const clearRecentCities = () => {
    localStorage.removeItem("recentCities");
    setRecentCities([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-6 text-center transition-all">
      <SearchBar city={city} setCity={setCity} onSubmit={handleSubmit} />
      {recentCities.length > 0 && (
        <RecentCities
          cities={recentCities}
          onSelect={(c) => fetchWeather(c, recentCities, setRecentCities)}
          onClear={clearRecentCities}
        />
      )}
      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
      {loading && (
        <div className="flex items-center justify-center mb-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      {weather && !loading && <CurrentWeatherCard weather={weather} />}
      {forecast.length > 0 && <WeeklyForecast forecast={forecast} />}
    </div>
  );
};

export default Body;
