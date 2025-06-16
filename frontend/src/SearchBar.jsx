import React from "react";

const SearchBar = () => {
  return (
    <form className="search-bar">
      <input
        className="search-input" name="searchInput" type="text" placeholder="Search"
      />
      <button className="search-btn" type="submit">
        Search
      </button>
      <button className="clear-btn" type="reset">
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
