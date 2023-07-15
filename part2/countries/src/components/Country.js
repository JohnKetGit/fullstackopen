import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const objKeys = Object.keys(country.languages)

  const [weather, setWeather] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  const hook = () => {
    // console.log('contacting weatherstack')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        // console.log('2nd promise fulfilled')
        setWeather(response.data)
    })
  }

  useEffect(hook, [api_key, country.capital])
  // console.log(weather)
  // console.log('rendering weather for', country.capital, weather)

  if (weather != '') {
    return (
      <>
        <h2>{country.name.common}</h2>
        capital: {country.capital}<br/>
        region: {country.region}<br/>
        area: {country.area}<br/>
        population: {country.population}<br/>
        <h3>languages: </h3>
        <ul>
          {objKeys.map((key) => <li key={key}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} width="200" alt={`Flag of ${country.name.common}`} />
        <h3>Weather in {country.capital}</h3>
        <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons} width='100' alt={`Weather in ${country.capital} is ${weather.current.weather_descriptions}`} />
        <p><b>wind:</b> {weather.current.wind_speed} m/s</p>
      </>
      )
  }
}

export default Country
