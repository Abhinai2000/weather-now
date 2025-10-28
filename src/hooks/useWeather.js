import { useState } from "react";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName, recentCities, setRecentCities) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast([]);

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results?.length) {
        setError("City not found.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      );
      const data = await weatherRes.json();

      setWeather({
        city: name,
        country,
        temp: data.current.temperature_2m,
        wind: data.current.wind_speed_10m,
        code: data.current.weather_code,
        time: data.current.time,
      });

      const weekly = data.daily.time.map((date, i) => ({
        date,
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        code: data.daily.weather_code[i],
      }));
      setForecast(weekly);

      const updated = [name, ...recentCities.filter((c) => c !== name)].slice(0, 5);
      setRecentCities(updated);
      localStorage.setItem("recentCities", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, error, loading, fetchWeather };
};
