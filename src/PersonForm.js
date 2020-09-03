import React from "react";

const PersonForm = ({ handleInputs, addPerson, newPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label>Name:</label>
        <br />
        <input value={newPerson.name} onChange={handleInputs} name="name" />
      </div>
      <div>
        <label>Number:</label>
        <br />
        <input value={newPerson.number} onChange={handleInputs} name="number" />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
