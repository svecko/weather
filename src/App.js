import React, { useState } from 'react';
import './App.css';

const api = {
  key: '9266fcc2086ad19cac6483db3cfe27fb',
  baseURL: 'https://api.openweathermap.org/data/2.5/',
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
              <div className="weather">{weather.weather[0].description}</div>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
