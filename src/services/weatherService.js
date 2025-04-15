import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        throw new Error('City not found');
      case 401:
        throw new Error('Invalid API key');
      case 429:
        throw new Error('API rate limit exceeded');
      default:
        throw new Error('Failed to fetch weather data');
    }
  } else if (error.request) {
    throw new Error('No response from server');
  } else {
    throw new Error('Error setting up request');
  }
};

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getForecastData = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}; 