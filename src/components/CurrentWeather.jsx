import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, MapPin } from 'lucide-react';
import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, wind, sys } = data;
    const condition = weather[0].main;
    const description = weather[0].description;

    const getWeatherIcon = (condition) => {
        const props = { size: 80, strokeWidth: 1.5 };
        switch (condition.toLowerCase()) {
            case 'clouds': return <Cloud {...props} className="weather-icon cloud" />;
            case 'rain': return <CloudRain {...props} className="weather-icon rain" />;
            case 'clear': return <Sun {...props} className="weather-icon sun" />;
            default: return <Sun {...props} className="weather-icon" />;
        }
    };

    return (
        <div className="current-weather glass-panel">
            <div className="weather-main">
                <div className="weather-info">
                    <div className="location-badge">
                        <MapPin size={16} />
                        <h2>{name}, {sys.country}</h2>
                    </div>
                    <h1 className="temp">{Math.round(main.temp)}°</h1>
                    <p className="description">{description}</p>
                </div>
                <div className="weather-visual">
                    {getWeatherIcon(condition)}
                    <span className="condition-tag">{condition}</span>
                </div>
            </div>

            <div className="weather-grid">
                <div className="grid-item">
                    <div className="icon-box">
                        <Droplets size={24} />
                    </div>
                    <div className="grid-info">
                        <span>Humidity</span>
                        <strong>{main.humidity}%</strong>
                    </div>
                </div>
                <div className="grid-item">
                    <div className="icon-box">
                        <Wind size={24} />
                    </div>
                    <div className="grid-info">
                        <span>Wind Speed</span>
                        <strong>{wind.speed} m/s</strong>
                    </div>
                </div>
                <div className="grid-item">
                    <div className="icon-box">
                        <Thermometer size={24} />
                    </div>
                    <div className="grid-info">
                        <span>Pressure</span>
                        <strong>{main.pressure} hPa</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
