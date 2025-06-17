import React from "react";
import { searchBoards, searchButtons } from "./utils/utils";
import Buttons from './Buttons'

const SearchBar = ({boardList, onSearch, toggleSearchMode}) => {

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
      {/* <button className="search-btn buttons" type="submit" onClick={toggleSearchMode}>
        Search
      </button>
      <button className="clear-btn buttons" type="reset" onClick={toggleSearchMode}>
        Clear
      </button> */}

      {/* <Buttons buttonType={searchButtons[0].type} buttonId={searchButtons[0].id} buttonText={searchButtons[0].text} onClick={toggleSearchMode}/>
      <Buttons buttonType={searchButtons[1].type} buttonId={searchButtons[1].id} buttonText={searchButtons[1].text} onClick={toggleSearchMode}/> */}
      {searchButtons.map((entry) => {
        return <Buttons key={entry.id} buttonType={entry.type} buttonId={entry.id} buttonText={entry.text} clickAction={toggleSearchMode} />
      })}
    </form>
  );
};

export default SearchBar;
