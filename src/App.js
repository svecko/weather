import React, { useState } from 'react';
import './App.css';

const api = {
  key: '9266fcc2086ad19cac6483db3cfe27fb',
  baseURL: 'https://api.openweathermap.org/data/2.5/',
};

const weatherEmoji = {
  Thunderstorm: '⛈️',
  Drizzle: '🌧️',
  Rain: '🌧️',
  Mist: '🌫️',
  Smoke: '🌫️',
  Haze: '🌫️',
  Dust: '🌫️',
  Fog: '🌫️',
  Sand: '🌫️',
  Ash: '🌫️',
  Squall: '🌫️',
  Tornado: '🌪️',
  Clear: '☀️',
  Clouds: '☁️',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(
        `${api.baseURL}weather?q=${query}&units=metric&lang=sl&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setQuery('');
          setWeather(result);
        });
    }
  };

  return (
    <div className="App">
      <main>
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="🔍 Išči..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="container">
              <div className="weather-indicator">
                {weatherEmoji[weather.weather[0].main]}
              </div>
              <div className="weather">{weather.weather[0].description}</div>
              <div className="location">
                <span className="emoji" role="img" aria-label="pin">
                  📍
                </span>{' '}
                {weather.name}, {weather.sys.country}
              </div>
              <div className="temperature">
                <span className="emoji"></span> {Math.round(weather.main.temp)}
                °C
              </div>
            </div>
          </div>
        ) : (
          <div className="hero">
            <span className="icon" role="img" aria-label="satellite">
              🛰️
            </span>
            <span className="earth" role="img" aria-label="earth">
              🌎
            </span>
            <span className="text">Poišči mesto ali državo...</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
