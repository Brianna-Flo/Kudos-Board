import React from "react";
import { searchBoards, searchButtons } from "./utils/utils";
import Buttons from './Buttons'

const SearchBar = ({boardList, onSearch, searchMode}) => {

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchInput.value;
    onSearch(searchBoards(boardList, searchTerm));
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        className="search-input" name="searchInput" type="text" placeholder="Search"
      />
      {/* <button className="search-btn buttons" type="submit" onClick={searchMode}>
        Search
      </button>
      <button className="clear-btn buttons" type="reset" onClick={searchMode}>
        Clear
      </button> */}
      {searchButtons.map((entry) => {
        return <Buttons key={entry.id} buttonType={entry.type} buttonId={entry.id} buttonText={entry.text} clickAction={searchMode} />
      })}
    </form>
  );
};

export default SearchBar;
