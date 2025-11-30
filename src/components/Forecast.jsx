import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning } from 'lucide-react';
import './Forecast.css';

const Forecast = ({ data }) => {
    if (!data || !data.list) return null;

    // Filter for noon forecasts (approximate daily)
    // OpenWeatherMap returns data every 3 hours. We want one per day.
    // If it's mock data, it might just be a list of 5 days.
    // We'll check if we have a lot of items or just a few.

    let dailyData = [];
    if (data.list.length > 10) {
        dailyData = data.list.filter(item => item.dt_txt && item.dt_txt.includes("12:00:00"));
        // If we don't get 5 days (e.g. it's past noon), take every 8th item
        if (dailyData.length < 5) {
            dailyData = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
        }
    } else {
        dailyData = data.list;
    }

    const getIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'clouds': return <Cloud size={24} />;
            case 'rain': return <CloudRain size={24} />;
            case 'clear': return <Sun size={24} />;
            case 'snow': return <CloudSnow size={24} />;
            case 'thunderstorm': return <CloudLightning size={24} />;
            default: return <Sun size={24} />;
        }
    };

    const getDayName = (dt) => {
        const date = new Date(dt * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="forecast glass-panel">
            <h3>5-Day Forecast</h3>
            <div className="forecast-list">
                {dailyData.map((item, index) => (
                    <div key={index} className="forecast-item">
                        <span className="day">{getDayName(item.dt)}</span>
                        <div className="icon">
                            {getIcon(item.weather[0].main)}
                        </div>
                        <div className="temps">
                            <span className="max">{Math.round(item.main.temp_max)}°</span>
                            <span className="min">{Math.round(item.main.temp_min)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
