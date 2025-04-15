import PropTypes from 'prop-types';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './WeatherCard.css';

const getWeatherIcon = (weatherCode) => {
  switch (weatherCode) {
    case 'Clear':
      return <WiDaySunny size={60} />;
    case 'Rain':
      return <WiRain size={60} />;
    case 'Clouds':
      return <WiCloudy size={60} />;
    case 'Snow':
      return <WiSnow size={60} />;
    case 'Thunderstorm':
      return <WiThunderstorm size={60} />;
    default:
      return <WiDaySunny size={60} />;
  }
};

const WeatherCard = ({ weather, unit, onUnitChange }) => {
  const convertTemperature = (temp) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.name}</h2>
        <div className="unit-toggle">
          <button
            className={`unit-button ${unit === 'C' ? 'active' : ''}`}
            onClick={() => onUnitChange('C')}
          >
            °C
          </button>
          <button
            className={`unit-button ${unit === 'F' ? 'active' : ''}`}
            onClick={() => onUnitChange('F')}
          >
            °F
          </button>
        </div>
      </div>
      <div className="weather-info">
        <div className="weather-icon">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <div className="temperature">
          {convertTemperature(weather.main.temp)}°{unit}
        </div>
        <div className="details">
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  unit: PropTypes.oneOf(['C', 'F']).isRequired,
  onUnitChange: PropTypes.func.isRequired,
};

export default WeatherCard; 