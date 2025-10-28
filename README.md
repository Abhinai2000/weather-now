# 🌦️ WeatherNow

A simple and responsive weather application built using **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Project Overview

- **WeatherNow** allows users to check current weather conditions quickly by searching for any city.
- It uses the **Open-Meteo API** for fetching real-time weather data and geolocation.
- Designed for **Jamie**, an outdoor enthusiast who needs quick access to weather details.

---

## 🧩 Tech Stack

- ⚛️ **React** – For building dynamic UI components.  
- ⚡ **Vite** – For fast builds and hot module replacement.  
- 🎨 **Tailwind CSS** – For responsive and modern styling.  
- 🌍 **Open-Meteo API** – For fetching live weather data.  

---

## 📁 Folder Structure

weather-now/
├─ public/
│ └─ favicon.ico
├─ src/
│ ├─ apis/
│ │ └─ weatherApi.js # Functions to call geocoding and weather endpoints
│ ├─ components/
│ │ ├─ Navbar.jsx # Top bar with app title and theme toggle
│ │ ├─ Body.jsx # Search input + weather results
│ │ └─ Footer.jsx # Clean footer section
│ ├─ App.jsx
│ ├─ main.jsx
│ └─ index.css
├─ package.json
└─ README.md



---

## ✨ Features

- 🔍 **City Search** – Enter a city name and fetch current weather instantly.  
- 🌤️ **Real-Time Weather** – Displays temperature, wind speed, and weather conditions.  
- 🌓 **Theme Toggle** – Switch between light and dark themes easily.  
- 📱 **Responsive UI** – Works seamlessly on both desktop and mobile devices.  
- ⚠️ **Error Handling** – Shows user-friendly messages for invalid cities or network issues.  
- ⏳ **Loading State** – Displays a loader while data is being fetched.  
- 🧼 **Clean Code** – Simple component structure with meaningful comments.  

---

## 🧠 How It Works

1. The user types a city name into the search bar.
2. The app calls the **Open-Meteo Geocoding API** to get the city’s latitude and longitude.
3. Then it calls the **Current Weather API** using those coordinates.
4. The weather data (temperature, wind speed, etc.) is displayed neatly in the results card.

---

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-now.git
