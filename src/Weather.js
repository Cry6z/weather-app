import React, { useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiSunrise, WiSunset } from "react-icons/wi";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weathers, setWeathers] = useState([]); // array untuk banyak card
  const apiKey = "8c939d484ba40d0bc0bb5ad018e2723d"; // Ganti API Key OpenWeatherMap

  const addCityWeather = async () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeathers(prev => [...prev, data]); // tambah data ke array
      setCity(""); // reset input
    } catch (err) {
      console.error(err);
    }
  };

  const getWeatherIcon = (main) => {
    switch(main){
      case "Clear": return <WiDaySunny size={80} color="#FFD700" />;
      case "Clouds": return <WiCloud size={80} color="#000" />;
      case "Rain": return <WiRain size={80} color="#00BFFF" />;
      case "Snow": return <WiSnow size={80} color="#00FFFF" />;
      case "Thunderstorm": return <WiThunderstorm size={80} color="#FFA500" />;
      default: return <WiDaySunny size={80} color="#FFD700" />;
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App React</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Masukkan kota..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={addCityWeather}>Tambah Kota</button>
      </div>

      <div className="cards-container">
        {weathers.map((w, index) => (
          <div key={index} className="weather-card">
            <h2>{w.name}</h2>
            {getWeatherIcon(w.weather[0].main)}
            <p className="temp">{w.main.temp} °C</p>
            <p className="desc">{w.weather[0].description}</p>
            <p>Kelembaban: {w.main.humidity}%</p>
            <p>Angin: {w.wind.speed} m/s</p>
            <p>Tekanan: {w.main.pressure} hPa</p>
            <p><WiSunrise /> Sunrise: {new Date(w.sys.sunrise*1000).toLocaleTimeString()}</p>
            <p><WiSunset /> Sunset: {new Date(w.sys.sunset*1000).toLocaleTimeString()}</p>
            {w.weather[0].main === "Rain" && <div className="rain"></div>}
            {w.weather[0].main === "Snow" && <div className="snow"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
