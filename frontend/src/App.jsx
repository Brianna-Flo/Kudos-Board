import "./App.css";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons"
import CreateBoard from './CreateBoard'
import BoardList from './BoardList';
import Footer from './Footer';
import {useState, useEffect} from 'react';
import { categoryOptions, filterBoardsByCategory } from "./utils/utils";
import { v4 as uuidv4 } from 'uuid';
import { BoardContext } from "./BoardContext";

const API_KEY = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_URL;
// fetch(`${baseUrl}`);

const App = () => {
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

  const fetchBoardData = async () => {
    try {
      const response = await fetch(`${baseUrl}/boards`);
      // console.log(`${baseUrl}/boards`)
      if (!response.ok) {
        throw new Error("Failed to fetch board data");
      }
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteBoard = async (boardId) => {
    const response = await fetch(`${baseUrl}/boards/${boardId}`, {
      method: "DELETE"
    })
    if (!response.ok) {
      throw new Error("Failed to delete board")
    }
    const data = await response.json();
    // update boards state to reflect deleted board
    // fetchBoardData();
    setBoards((prev) => {
      return prev.filter((board) => {return board.id !== data.id})
    })
  }

  // on load
  useEffect(() => {
    fetchBoardData();
  }, [])

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

  // const handleNewBoard = (newBoard) => {
  //   setBoards((prev) => [...prev, newBoard])
  // }

  const handleNewBoard = async (newBoard) => {
    try {
        console.log("inside handle create board ", newBoard)
        const response = await fetch(`${baseUrl}/boards/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBoard)
        })
        if (!response.ok) {
            throw new Error("Failed to create board");
        }
        const data = await response.json();
        // fetch board data to update
        fetchBoardData();
    } catch (error) {
        console.error(error)
    }
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
    <BoardContext.Provider value={{boards, fetchBoardData}}>
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
            <Buttons buttonText="Create New Board" onClick={toggleModal} />
            {modalOpen && <CreateBoard onCloseModal={toggleModal} onCreate={handleNewBoard} />}
          </div>
        </header>
        <main>
          {
            // if in search mode or nav mode, present search boards, otherwise present list of boards
            <BoardList boardList={(searchMode || navMode) ? requestedBoards : boards} searchMode={searchMode} noSearchResults={noSearchResults} navMode={navMode} noNavResults={noNavResults} onDelete={handleDeleteBoard} />
          }
        </main>
        <footer></footer>
      </div>
    </BoardContext.Provider>
  );
}

export default App;
