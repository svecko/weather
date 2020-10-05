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

  const dateBuilder = (d) => {
    const months = [
      'Januar',
      'Februar',
      'Marec',
      'April',
      'Maj',
      'Junij',
      'Julij',
      'Avgust',
      'September',
      'Oktober',
      'November',
      'December',
    ];

    const days = [
      'Nedelja',
      'Ponedeljek',
      'Torek',
      'Sreda',
      'Četrtek',
      'Petek',
      'Sobota',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}. ${month.toLocaleLowerCase()} ${year}`;
  };

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Išči..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="container">
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">{weather.weather[0].description}</div>
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
