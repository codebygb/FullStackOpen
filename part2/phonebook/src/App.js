import { useEffect, useState } from "react";
import { create, getAll, remove, update } from "./services/phonebookService";
import { Search } from "./components/Search";
import { Phonebook } from "./components/Phonebook";
import { Numbers } from "./components/Numbers";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.error);
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
        update(id, newObject).catch((error) => {
          setErrorMsg(error.response.data.error);
          setTimeout(() => {
            setErrorMsg("");
          }, 5000);
          return;
        });
        setPersons(
          persons.map((person) => (person.id !== id ? person : newObject))
        );
        setMessage(`${newName} has been updated`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
        return;
      } else return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    create(newPerson)
      .then((person) => setPersons(persons.concat(person)))
      .catch((error) => {
        setErrorMsg(error.response.data.error);
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
        return;
      });
    setNewName("");
    setNewNumber("");
    setMessage(`${newName} has been added`);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const removeContact = (id, name) => {
    remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage(`${name} has been removed`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setErrorMsg(`${name} has already been removed from the server`);
          setTimeout(() => {
            setErrorMsg("");
          }, 5000);
        }

        return;
      });
  };

  const searchedContact =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="phonebook">
      <h2>Phonebook</h2>
      <Notification message={message} errorMsg={errorMsg} />
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
