import { useState } from "react";

const API_BASE = "https://api.open-meteo.com/v1/forecast";

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${API_BASE}?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      const data = await res.json();
      setForecast(data);
      setCurrent(data.current_weather);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return { loading, forecast, current, error, getWeather };
};
