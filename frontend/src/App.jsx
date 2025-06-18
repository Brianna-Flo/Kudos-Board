import "./App.css";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons"
import CreateBoard from './CreateBoard'
import BoardList from './BoardList';
import Footer from './Footer';
import {useState, useEffect} from 'react';
import { categoryOptions, filterBoardsByCategory, sampleBoards } from "./utils/utils";
import { v4 as uuidv4 } from 'uuid';



const App = () => {
  // hold board cards in an array of board components
  const [boards, setBoards] = useState(sampleBoards);
  const [modalOpen, setModalOpen] = useState(false);
  // requested boards holds results of a search or category filter
  const [requestedBoards, setRequestedBoards] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  // error state if no results from search
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [noNavResults, setNoNavResults] = useState(false);
  const [navMode, setNavMode] = useState(false);

  useEffect(() => {
    // when search mode or searched boards changes indicates action in search bar, may set no results to true
    setNoSearchResults(searchMode && requestedBoards.length === 0)
  }, [searchMode, requestedBoards])
 
  useEffect(() => {
    // when search mode or searched boards changes indicates action in search bar, may set no results to true
    setNoNavResults(navMode && requestedBoards.length === 0)
  }, [navMode, requestedBoards])

  const toggleModal = () => {
      setModalOpen((prev) => !prev);
  }

  const handleSearch = (searchedList) => {
    setRequestedBoards(searchedList);
    setSearchMode(true);
  }

  const toggleMode = () => {
    setSearchMode((prev) => !prev)
  }

  const handleNewBoard = (newBoard) => {
    setBoards((prev) => [...prev, newBoard])
  }

  const handleCategoryChange = (event) => {
    // setFilterCategory(event.target.id);
    if (event.target.id !== "All") {
      setRequestedBoards(filterBoardsByCategory(boards, event.target.id));
      setNavMode(true);
    } else { // if "all category chosen, no longer in nav mode
      setNavMode(false);
    }
}



  return (
    <div className="app-container">
      <section id="banner">
        <h1>Kudos Board</h1>
      </section>
      <header className='homepage-header'>
        <div className='toolbar'>
          <SearchBar boardList={boards} onSearch={handleSearch} toggleSearchMode={toggleMode}/>
          <div className="category-btns">
            {categoryOptions.map((category) => {
              // return (<CategoryButton key={uuidv4()} category={category} />)
              return (<Buttons key={uuidv4()} buttonClass="category-btn" buttonId={category} buttonText={category} onClick={handleCategoryChange}/>)
            })}
          </div>
          {/* <button onClick={toggleModal} className="buttons">Create New Board</button> */}
          <Buttons buttonText="Create New Board" onClick={toggleModal} />
          {modalOpen && <CreateBoard onCloseModal={toggleModal} onCreate={handleNewBoard} />}
        </div>
      </header>
      <main>
        {
          // if in search mode or nav mode, present search boards, otherwise present list of boards
          <BoardList boardList={(searchMode || navMode) ? requestedBoards : boards} searchMode={searchMode} noSearchResults={noSearchResults} navMode={navMode} noNavResults={noNavResults}/>
        }
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
