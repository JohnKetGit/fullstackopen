import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({setErrorMessage, setColor, persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const handleNameChange = (event) => {
      // console.log(event.target.value)
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      // console.log(event.target.value)
      setNewNumber(event.target.value)
    }
  
    const addPerson = (event) => {
      event.preventDefault()

      const personObject = {
        name: newName,
        number: newNumber
        // id: persons.length + 1
      }

      const existingUser = persons.find((person) => newName === person.name)
      
      if (existingUser) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(existingUser.id, personObject)
            .then(() => {
              personService
              .getAll()
              .then((persons) => {
                setPersons(persons)
                setErrorMessage(`Updated ${existingUser.name}'s contact number`);
                setColor("green");
                setNewName('')
                setNewNumber('')
              })
            })
            .catch((error) => {
              setErrorMessage(`${error.response.data.error}`);
              setColor("red");
              // setErrorMessage(
              //   `Information of ${existingUser.name} has already been removed from server`
              // );
              // setColor("red");
              // setPersons(persons.filter((p) => p.id !== existingUser.id));
            })
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }
      }
      else {
        personService
          .create(personObject)
          .then(response => {
            // console.log(response)
            setPersons(persons.concat(response))
            setErrorMessage(`Added ${newName}`);
            setColor("green");
            setNewName('')
            setNewNumber('')
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`);
          setColor("red");
          // console.log(error.response.data.error)
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm
