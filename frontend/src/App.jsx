import "./App.css";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons"
import CreateBoard from './CreateBoard'
import BoardList from './BoardList';
import Footer from './Footer';
import {useState, useEffect} from 'react';
import { categoryOptions } from "./utils/utils";
import { v4 as uuidv4 } from 'uuid';



const App = () => {
  // hold board cards in an array of board components
  const [boards, setBoards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchedBoards, setSearchedBoards] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  // error state if no results from search
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    // when search mode or searched boards changes indicates action in search bar, may set no results to true
    setNoResults(searchMode && searchedBoards.length === 0)
  }, [searchMode, searchedBoards])

  const toggleModal = () => {
      setModalOpen((prev) => !prev);
  }

  const handleSearch = (searchedList) => {
    setSearchedBoards(searchedList);
    setSearchMode(true);
  }

  const toggleMode = () => {
    setSearchMode((prev) => !prev)
  }

  const handleNewBoard = (newBoard) => {
    setBoards((prev) => [...prev, newBoard])
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
              return (<Buttons key={uuidv4()} buttonClass="category-btn" buttonId={category} buttonText={category} />)
            })}
          </div>
          {/* <button onClick={toggleModal} className="buttons">Create New Board</button> */}
          <Buttons buttonText="Create New Board" onClick={toggleModal} />
          {modalOpen && <CreateBoard onCloseModal={toggleModal} onCreate={handleNewBoard} />}
        </div>
      </header>
      <main>
        {
          // if in search mode, present search boards, otherwise present list of boards
          <BoardList boardList={searchMode ? searchedBoards : boards} searchMode={searchMode} noResults={noResults}/>
        }
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
