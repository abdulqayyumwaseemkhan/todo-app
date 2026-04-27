import React, { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const apiKey = import.meta.env.VITE_APP_APIKEY;
  const handleFetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleFetchWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}
