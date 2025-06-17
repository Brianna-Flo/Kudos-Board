import React from "react";
import { searchBoards } from "./utils/utils";

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
      <button className="search-btn buttons" type="submit" onClick={searchMode}>
        Search
      </button>
      <button className="clear-btn buttons" type="reset" onClick={searchMode}>
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
