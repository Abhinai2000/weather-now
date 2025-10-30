export default function CurrentWeather({ current, location }) {
  if (!current) return null;

  return (
    <div className="p-4 border rounded-xl shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-2">
        Current Weather in {location.name}, {location.country}
      </h2>
      <p className="text-3xl font-bold mb-1">
        🌡️ {current.temperature}°C
      </p>
      <p className="text-sm opacity-80">
        💨 Wind: {current.windspeed} km/h | {current.weathercode ? "☁️" : ""}
      </p>
    </div>
  );
}
