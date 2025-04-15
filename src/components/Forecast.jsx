import PropTypes from 'prop-types';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './Forecast.css';

const getWeatherIcon = (weatherCode) => {
  switch (weatherCode) {
    case 'Clear':
      return <WiDaySunny size={40} />;
    case 'Rain':
      return <WiRain size={40} />;
    case 'Clouds':
      return <WiCloudy size={40} />;
    case 'Snow':
      return <WiSnow size={40} />;
    case 'Thunderstorm':
      return <WiThunderstorm size={40} />;
    default:
      return <WiDaySunny size={40} />;
  }
};

const Forecast = ({ forecastData }) => {
  // Group forecast data by day
  const dailyForecast = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        date,
        temp: item.main.temp,
        weather: item.weather[0].main,
        icon: getWeatherIcon(item.weather[0].main),
      };
    }
    return acc;
  }, {});

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {Object.values(dailyForecast).map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{day.date}</div>
            <div className="forecast-icon">{day.icon}</div>
            <div className="forecast-temp">{Math.round(day.temp)}°C</div>
            <div className="forecast-weather">{day.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  forecastData: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            main: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Forecast; 