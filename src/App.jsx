import { useState } from 'react'
import { getWeatherData, getForecastData } from './services/weatherService'
import SearchForm from './components/SearchForm'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import Loading from './components/Loading'
import Error from './components/Error'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('')
  const [unit, setUnit] = useState('C')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError(null)
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(city),
        getForecastData(city),
      ])
      setWeather(weatherData)
      setForecast(forecastData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    if (city.trim()) {
      handleSearch({ preventDefault: () => {} })
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchForm
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
      />
      {loading && <Loading />}
      {error && <Error message={error} onRetry={handleRetry} />}
      {weather && (
        <>
          <WeatherCard
            weather={weather}
            unit={unit}
            onUnitChange={setUnit}
          />
          {forecast && <Forecast forecastData={forecast} />}
        </>
      )}
    </div>
  )
}

export default App
