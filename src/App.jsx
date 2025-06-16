import "./App.css";
// import Toolbar from './Toolbar';
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import CreateBoard from './CreateBoard'
import BoardList from './BoardList';
import Footer from './Footer';
import {useState} from 'react';

import BoardPage from './BoardPage'


const App = () => {
  // hold board cards in an array of board components
  const [boards, setBoards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
      setModalOpen((prev) => !prev);
  }

  const handleCreateBoard = (newBoard) => {
    console.log("new board",newBoard)
    setBoards((prev) => [...prev, newBoard]);
    console.log("setting boards");
    console.log(boards)
  }

  return (
    <div className="app-container">
      <header className='homepage-header'>
        <h1>Kudos Board</h1>
        <div className='toolbar'>
          <SearchBar />
          <Categories />
          <button onClick={toggleModal}>Create New Board</button>
          {modalOpen && <CreateBoard onCloseModal={toggleModal} onCreate={handleCreateBoard} />}
        </div>
        {/* <Toolbar onCreate/> */}
      </header>
      <main>
        <BoardList boardList={boards} />

        <BoardPage boardInfo={boards[0]} />
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
