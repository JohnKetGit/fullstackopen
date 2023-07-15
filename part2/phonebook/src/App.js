import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null);
  const [color, setColor] = useState("");

  const hook = () => {
    // console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        // console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])
  // console.log('render', persons.length, 'persons')

  const filterPerson = (event) => {
    // console.log(event.target.value)
    setFilter(event.target.value)

    setFilteredPersons(persons.filter((person) => (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 )));
  }

  const handleDelete = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          personService
            .getAll()
            .then((persons) => {
              setPersons(persons)
            })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} result={color} />
      <Filter filtered={filtered} filterPerson={filterPerson}/>

      <h2>add a new</h2>
      <PersonForm setColor={setColor} setErrorMessage={setErrorMessage} persons={persons} setPersons={setPersons}/>

      <h2>Numbers</h2>
      {filtered === '' ? persons.map((person) => <Person key={person.id} person={person} handleDelete={handleDelete}/>) : 
      filteredPersons.map((person) => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
    </div>
  )
}

export default App
