import React, { useState } from 'react'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [filter, setFilter] = useState('')

  const handleSearch = (event) => setFilter(event.target.value)

  return (
    <>
      <div>
        find countries: <input value={filter} onChange={handleSearch}/>
        <ShowCountries filter={filter} setFilter={setFilter}/>
      </div>
    </>
  )
}

export default App;
