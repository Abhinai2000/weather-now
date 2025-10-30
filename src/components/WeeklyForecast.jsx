export default function WeeklyForecast({ forecast, location }) {
  if (!forecast) return null;

  const { daily } = forecast;

  return (
    <div className="text-center mt-6 w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-3">
        Weekly Forecast for {location.name}, {location.country}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {daily.time.map((day, i) => (
          <div
            key={day}
            className="p-4 border rounded-xl shadow-sm bg-base-100 
            hover:shadow-lg hover:-translate-y-1 hover:bg-base-200 
            transition-all duration-300"
          >
            <p className="font-medium">{day}</p>
            <p className="text-blue-600 dark:text-blue-400">
              🌡️ Max: {daily.temperature_2m_max[i]}°C
            </p>
            <p className="text-gray-500 dark:text-gray-300">
              🌡️ Min: {daily.temperature_2m_min[i]}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
