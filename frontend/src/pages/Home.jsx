import "../App.css";
import SearchBar from "../SearchBar";
import Buttons from "../Buttons";
import CreateBoard from "../CreateBoard";
import BoardList from "../BoardList";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import {
  categoryOptions,
  filterEndpoints,
  fetchHelper,
  deleteHelper,
  newHelper,
  filterHelper
} from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  // hold board cards in an array of board components
  const [boards, setBoards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // requested boards holds results of a search or category filter
  const [requestedBoards, setRequestedBoards] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  // error state if no results from search
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [noNavResults, setNoNavResults] = useState(false);
  const [navMode, setNavMode] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("")
  
  // on load
  useEffect(() => {
    fetchBoardData();
  }, []);

  useEffect(() => {
    // when search mode or searched boards changes indicates action in search bar, may set no results to true
    setNoSearchResults(searchMode && requestedBoards.length === 0);
  }, [searchMode, requestedBoards]);

  useEffect(() => {
    // when search mode or searched boards changes indicates action in search bar, may set no results to true
    setNoNavResults(navMode && requestedBoards.length === 0);
  }, [navMode, requestedBoards]);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleSearch = (searchedList) => {
    setRequestedBoards(searchedList);
    setSearchMode(true);
    setNavMode(false)
  };

  const toggleMode = () => {
    setSearchMode((prev) => !prev);
  };

  const handleNewBoard = async (newBoard) => {
    try {
      // see all boards on board creation
      setNavMode(false);
      setSearchMode(false);
      const created = await newHelper(newBoard);
      fetchBoardData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBoardData = async () => {
    setBoards(await fetchHelper());
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const deleted = await deleteHelper(boardId);
      fetchBoardData();
      // if in navigation mode, reflect board deleted by refetching filtered boards
      if (navMode) {
        fetchFilteredBoards(currentFilter)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilteredBoards = async (filter) => {
    try {
      const filteredBoards = await filterHelper(filter)
      setRequestedBoards(filteredBoards);
    } catch (error) {
      console.error(error)
    }
  }

  const handleCategoryChange = (event) => {
    if (event.target.id !== "All") {
      const indexOfEndpoint = categoryOptions.indexOf(event.target.id);
      setCurrentFilter(filterEndpoints[indexOfEndpoint])
      fetchFilteredBoards(filterEndpoints[indexOfEndpoint]);
      setNavMode(true);
      setSearchMode(false);
    } else {
      setNavMode(false);
    }
  };


  return (
    <div className="home-container">
      <section id="banner">
        <h1>Kudos Board</h1>
      </section>
      <header className="homepage-header">
        <div className="toolbar">
          <SearchBar
            onSearch={handleSearch}
            toggleSearchMode={toggleMode}
          />
          <div className="category-btns">
            {categoryOptions.map((category) => {
              return (
                <Buttons
                  key={uuidv4()}
                  buttonClass="category-btn"
                  buttonId={category}
                  buttonText={category}
                  onClick={handleCategoryChange}
                />
              );
            })}
          </div>
          <Buttons buttonText="Create New Board" onClick={toggleModal} />
          {modalOpen && (
            <CreateBoard onCloseModal={toggleModal} onCreate={handleNewBoard} />
          )}
        </div>
      </header>
      <main>
        {
          // if in search mode or nav mode, present search boards, otherwise present list of boards
          <BoardList
            boardList={searchMode || navMode ? requestedBoards : boards}
            searchMode={searchMode}
            noSearchResults={noSearchResults}
            navMode={navMode}
            noNavResults={noNavResults}
            onDelete={handleDeleteBoard}
          />
        }
      </main>
      <Footer />
    </div>
  );
};

export default Home;
