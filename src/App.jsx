import { useState } from 'react'
import { getWeatherData } from './services/weatherService'
import SearchForm from './components/SearchForm'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
import Error from './components/Error'
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
      {weather && <WeatherCard weather={weather} />}
    </div>
  )
}

export default App
