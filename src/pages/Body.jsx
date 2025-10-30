import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeeklyForecast from "../components/WeeklyForecast";
import CurrentWeather from "../components/CurrentWeather";
import { useWeather } from "../hooks/useWeather";

export default function Body() {
  const [location, setLocation] = useState(null);
  const { forecast, current, getWeather, loading } = useWeather();

  const handleSearch = (loc) => {
    setLocation(loc);
    getWeather(loc.latitude, loc.longitude);
  };

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-start py-6 px-4 
      bg-gradient-to-b from-base-100 to-base-300 text-base-content
      transition-colors duration-500"
    >
      <h2 className="text-2xl font-bold mb-4 hover:scale-105 transition-transform duration-300">
        Check Weekly Weather 🌦️
      </h2>

      <div className="w-full sm:w-[400px]">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && (
        <p className="mt-6 animate-pulse text-blue-500 font-semibold">
          Loading...
        </p>
      )}

      <div className="mt-4 w-full flex flex-col items-center gap-4">
        <CurrentWeather current={current} location={location} />
        <WeeklyForecast forecast={forecast} location={location} />
      </div>
    </div>
  );
}
