import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./Notification";
import SearchFilter from "./SearchFilter";
import PersonForm from "./PersonForm";
import Person from "./Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchedName, setSearchedName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({ color: "", message: "" });

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleInputs = e => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const showMessage = (color, message) => {
    setNotificationMessage({ color, message });
    setTimeout(() => {
      setNotificationMessage({ color: "", message: "" });
    }, 5000);
  };

  const addPerson = e => {
    e.preventDefault();
    const personFounded = persons.find(person => person.name === newPerson.name);
    if (newPerson.name === "") {
      showMessage("red", "Esse nome não pode ser branco.");
    } else if (newPerson.number === "") {
    } else if (personFounded) {
      if (window.confirm(`${newPerson.name} já está na lista. Deseja atualizar o número?`)) {
        personService
          .update(personFounded.id, newPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person => (person.name !== newPerson.name ? person : returnedPerson))
            );
          })
          .catch(error => {
            showMessage("red", "Esse usuário já foi excluído");
            setPersons(persons.filter(person => person.id !== personFounded.id));
          });
      }
      setNewPerson({ name: "", number: "" });
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)));
      showMessage("green", `${newPerson.name} adicionado aos contatos.`);
      setNewPerson({ name: "", number: "" });
    }
  };

  const deletePersonOf = id => {
    if (window.confirm("Tem certeza que deseja deletar esse contato?")) {
      personService.destroy(id).then(res => setPersons(persons.filter(person => person.id !== id)));
    }
  };

  const handleSearch = e => {
    setSearchedName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook </h2>
      {notificationMessage.message !== "" && (
        <Notification notificationMessage={notificationMessage} />
      )}

      <div>
        <h3>Search </h3>
        <SearchFilter handleSearch={handleSearch} searchedName={searchedName} />
      </div>
      <div>
        <h3>Add new contact </h3>
        <PersonForm handleInputs={handleInputs} addPerson={addPerson} newPerson={newPerson} />
      </div>
      <div>
        <h3>Contacts </h3>
        <div>
          {persons.length > 0 &&
            persons.map(person =>
              person.name.toLowerCase().includes(searchedName.toLowerCase()) ? (
                <Person
                  key={person.id}
                  person={person}
                  deletePerson={() => deletePersonOf(person.id)}
                />
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </div>
  );
};
export default App;
