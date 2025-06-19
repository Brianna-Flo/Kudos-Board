import React from "react";
import { searchButtons, fetchSearchedBoards } from "./utils/utils";
import Buttons from './Buttons'

const SearchBar = ({onSearch, toggleSearchMode}) => {

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchInput.value;
    onSearch(await fetchSearchedBoards(searchTerm));
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        className="search-input" name="searchInput" type="text" placeholder="Search"
      />
      {searchButtons.map((entry) => {
        return <Buttons key={entry.id} buttonType={entry.type} buttonId={entry.id} buttonText={entry.text} onClick={toggleSearchMode} />
      })}
    </form>
  );
};

export default SearchBar;
