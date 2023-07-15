const Person = ({person, handleDelete}) => {
    return (
      <>
        {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
        <br/>
      </>
    )
}

export default Person
