import React from "react";

const SearchFilter = ({ handleSearch, searchedName }) => {
  return (
    <div>
      <input value={searchedName} onChange={handleSearch} />
    </div>
  );
};

export default SearchFilter;
