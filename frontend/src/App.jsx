import "./App.css";
// import Toolbar from './Toolbar';
import SearchBar from "./SearchBar";
import CategoryButton from "./CategoryButton";
import CreateBoard from './CreateBoard'
import BoardList from './BoardList';
import Footer from './Footer';
import {useState} from 'react';
import { categoryOptions } from "./utils/utils";
import { v4 as uuidv4 } from 'uuid';



const App = () => {
  // hold board cards in an array of board components
  const [boards, setBoards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
      setModalOpen((prev) => !prev);
  }

  return (
    <div className="app-container">
      <section id="banner">
        <h1>Kudos Board</h1>
      </section>
      <header className='homepage-header'>
        <div className='toolbar'>
          <SearchBar />
          <div className="category-btns">
            {categoryOptions.map((category) => {
              return (<CategoryButton key={uuidv4()} category={category} />)
            })}
          </div>
          <button onClick={toggleModal} className="buttons">Create New Board</button>
          {/* {modalOpen && <CreateBoard onCloseModal={toggleModal} onCreate={handleCreateBoard} />} */}
          {modalOpen && <CreateBoard onCloseModal={toggleModal} onCreate={(newBoard) => {setBoards((prev) => [...prev, newBoard])}} />}
        </div>
        {/* <Toolbar onCreate/> */}
      </header>
      <main>
        <BoardList boardList={boards} />

        {/* <BoardPage boardInfo={boards[0]} /> */}
        {/* <CreateCard/> */}
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
