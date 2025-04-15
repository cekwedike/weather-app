import { useState } from 'react'
import { getWeatherData } from './services/weatherService'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherData(city)
      setWeather(data)
    } catch (err) {
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <div className="weather-info">
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="details">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>Description: {weather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
