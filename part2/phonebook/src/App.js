import { useEffect, useState } from "react";
import { create, getAll, remove, update } from "./services/phonebookService";
import { Search } from "./components/Search";
import { Phonebook } from "./components/Phonebook";
import { Numbers } from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const id = person.id;
        const newObject = {
          ...person,
          number: newNumber,
        };
        update(id, newObject);
        setPersons(
          persons.map((person) => (person.id !== id ? person : newObject))
        );
        return;
      } else return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    create(newPerson).then((person) => setPersons(persons.concat(person)));
    setNewName("");
    setNewNumber("");
  };

  const removeContact = (id) => {
    remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const searchedContact =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch} />
      <Phonebook
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addName={addName}
      />
      <Numbers persons={searchedContact} remove={removeContact} />
    </div>
  );
};

export default App;
