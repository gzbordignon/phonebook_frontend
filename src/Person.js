import React from "react";

const Person = ({ person: { name, number }, deletePerson }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{number}</p>{" "}
      <p>
        <button onClick={deletePerson}>delete</button>
      </p>
    </div>
  );
};

export default Person;
