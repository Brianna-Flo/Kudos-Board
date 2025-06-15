import React from "react";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import "./Toolbar.css";

const Toolbar = () => {
  return (
    <div>
      <SearchBar />
      <Categories />
      <button>Create New Board</button>
    </div>
  );
};

export default Toolbar;
