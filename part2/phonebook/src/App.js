import React, { useState, useEffect } from "react";
import Person from "./Components/Person";
import AddForm from "./Components/AddForm";
import Filter from "./Components/Filter";
import personService from "./services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  const fetchPersons = () => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  };

  useEffect(fetchPersons, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName) === undefined) {
      personService
        .create(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
          setMessage({
            message: `Successfully added ${newPerson.name}`,
            type: "status",
          });
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => {
          setMessage({
            message: `Failed to add ${newPerson.name}`,
            type: "error",
          });
          setTimeout(() => setMessage(null), 5000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Update the number?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        personService
          .updateNumber(id, newPerson)
          .then((data) => {
            setPersons(persons.map((p) => (p.id !== id ? p : data)));
            setNewName("");
            setNewNumber("");
            setMessage({
              message: `Successfully updated ${newPerson.name}`,
              type: "status",
            });
            setTimeout(() => setMessage(null), 5000);
          })
          .catch((error) => {
            setMessage({
              message: `Failed to update ${newPerson.name}. Entry already removed from server`,
              type: "error",
            });
            //setTimeout(() => setMessage(null), 5000);
          });
      }
    }
  };

  const filteredPersons =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== id));
          setMessage({
            message: `Successfully removed entry for ${person.name}`,
            type: "status",
          });
        })
        .catch((error) => {
          setMessage({
            message: `Failed to remove entry entry for ${person.name}. Entry already removed from server.`,
            type: "error",
          });
          setTimeout(() => setMessage(null), 5000);
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Filter
        filter={newFilter}
        onChange={(event) => setNewFilter(event.target.value)}
      ></Filter>
      <h2>Add new</h2>
      <AddForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      ></AddForm>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            id={person.id}
            deleteHandler={removePerson}
          ></Person>
        ))}
      </ul>
    </div>
  );
};

export default App;
