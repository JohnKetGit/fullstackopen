const Filter = ({filtered, filterPerson}) => {
    return (
        <div>
        filter shown with <input value={filtered} onChange={filterPerson}/>
        </div>
    )
}

export default Filter
