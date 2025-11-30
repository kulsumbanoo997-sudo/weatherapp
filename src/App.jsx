import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { getWeatherData } from './services/api';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('London'); // Default city
  }, []);

  return (
    <div className="app-container">
      <SearchBar onSearch={fetchWeather} />

      {loading && <div className="glass-panel" style={{ textAlign: 'center' }}>Loading...</div>}

      {error && <div className="glass-panel" style={{ textAlign: 'center', color: '#ff6b6b' }}>{error}</div>}

      {!loading && !error && weatherData && (
        <div className="dashboard-content">
          <div className="main-section">
            <CurrentWeather data={weatherData.current} />
          </div>
          <div className="side-section">
            <Forecast data={weatherData.forecast} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
