🌦️ WeatherNow

A clean, modern, and responsive weather app built for Jamie, an outdoor enthusiast who wants to quickly check current and weekly weather conditions for any city.
Built using React + Vite, styled with Tailwind CSS, and powered by the Open-Meteo API.

🧭 Features

🌤 Current Weather: View temperature, humidity, and wind speed for any city.

📅 7-Day Forecast: Get a clear weekly weather outlook.

🕶 Theme Toggle: Switch between light and dark modes with localStorage persistence.

🏙 Recent Searches: Quickly access previously searched cities.

🧹 Clear History: Option to remove all recent cities.

⚙️ Error Handling: User-friendly messages for network errors or invalid locations.

📱 Responsive UI: Works smoothly on mobile, tablet, and desktop.

🗂️ Folder Structure
src/
├── api/
│   └── weatherApi.js
├── components/
│   ├── SearchBar.jsx
│   ├── CurrentWeatherCard.jsx
│   ├── WeeklyForecast.jsx
│   ├── RecentCities.jsx
│   └── Loader.jsx
├── hooks/
│   └── useWeather.js
├── pages/
│   └── Body.jsx
├── utils/
│   └── weatherDescriptions.js
├── App.jsx
└── main.jsx

⚙️ Tech Stack

Frontend: React 18, Vite

Styling: Tailwind CSS v3.4 + DaisyUI

API: Open-Meteo API

State Management: React Hooks

Deployment: GitHub Pages / Vercel