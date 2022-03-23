import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addName = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons((persons) => persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const filterPersons =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Phonebook
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addName={addName}
      />
      <Numbers persons={filterPersons} />
    </div>
  );
};

const Search = ({ search, setSearch }) => {
  // const [filteredPersons, setFilteredPersons] = useState(persons);
  // const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const val = event.target.value;
    setSearch(val);
  };

  return (
    <div>
      <h2>Search</h2>
      <form>
        <div>
          <input value={search} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

const Phonebook = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addName,
}) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

const Numbers = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default App;
