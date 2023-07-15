import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'

const ShowCountries = ({filter, setFilter}) => {
  const [countries, setCountries] = useState([])

  const hook = () => {
    // console.log('contacting rest countries')
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      // console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(hook, [])
  // console.log('rendering', countries.length, 'countries')

  const filterCountries = () => {
    const countriesToShow = 
    filter === ''
      ? countries.filter(country => country.name === '')
      : countries.filter((country) => 
        country.name.common.toLowerCase().includes(filter.toLowerCase()))
    // console.log('search filter:', countriesToShow)

    return countriesToShow
  }

  let countriesToShow = filterCountries()

  const handleShow = (country) => {
    setFilter(country.name.common)
    
    countriesToShow = filterCountries()
  }

  let result;

  if (countriesToShow.length > 10) {
    result = <><br/>Too many matches, specify another filter</>
  } else if (countriesToShow.length === 1) {
    result = <Country country={countriesToShow[0]}/>
  } else if (countriesToShow.length < 10) {
    result = countriesToShow.map((country) => <div key={country.name.common}><br/>{country.name.common} 
    <button onClick={() => handleShow(country)}>show</button></div>)
  } else {
    result = ""
  }

  return (
    <>
      {result}
    </>
  )
}

export default ShowCountries
