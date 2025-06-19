// import "./App.css";
// import SearchBar from "./SearchBar";
// import Buttons from "./Buttons";
// import CreateBoard from "./CreateBoard";
// import BoardList from "./BoardList";
// import Footer from "./Footer";
// import { useState, useEffect } from "react";
// import {
//   categoryOptions,
//   filterBoardsByCategory,
//   fetchHelper,
//   deleteHelper,
//   newHelper,
// } from "./utils/utils";
// import { v4 as uuidv4 } from "uuid";
// import { BoardContext } from "./BoardContext";

// const App = () => {
//   // hold board cards in an array of board components
//   const [boards, setBoards] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   // requested boards holds results of a search or category filter
//   const [requestedBoards, setRequestedBoards] = useState([]);
//   const [searchMode, setSearchMode] = useState(false);
//   // error state if no results from search
//   const [noSearchResults, setNoSearchResults] = useState(false);
//   const [noNavResults, setNoNavResults] = useState(false);
//   const [navMode, setNavMode] = useState(false);

//   // on load
//   useEffect(() => {
//     fetchBoardData();
//   }, []);

//   useEffect(() => {
//     // when search mode or searched boards changes indicates action in search bar, may set no results to true
//     setNoSearchResults(searchMode && requestedBoards.length === 0);
//   }, [searchMode, requestedBoards]);

//   useEffect(() => {
//     // when search mode or searched boards changes indicates action in search bar, may set no results to true
//     setNoNavResults(navMode && requestedBoards.length === 0);
//   }, [navMode, requestedBoards]);

//   const toggleModal = () => {
//     setModalOpen((prev) => !prev);
//   };

//   const handleSearch = (searchedList) => {
//     setRequestedBoards(searchedList);
//     setSearchMode(true);
//   };

//   const toggleMode = () => {
//     setSearchMode((prev) => !prev);
//   };

//   const handleNewBoard = async (newBoard) => {
//     try {
//       const created = await newHelper(newBoard);
//       fetchBoardData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchBoardData = async () => {
//     setBoards(await fetchHelper());
//   };

//   const handleDeleteBoard = async (boardId) => {
//     try {
//       const deleted = await deleteHelper(boardId);
//       fetchBoardData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCategoryChange = (event) => {
//     if (event.target.id !== "All") {
//       setRequestedBoards(filterBoardsByCategory(boards, event.target.id));
//       setNavMode(true);
//     } else {
//       setNavMode(false);
//     }
//   };

//   return (
//     <BoardContext.Provider value={{ boards, fetchBoardData }}>
//       <div className="app-container">
//         <section id="banner">
//           <h1>Kudos Board</h1>
//         </section>
//         <header className="homepage-header">
//           <div className="toolbar">
//             <SearchBar
//               boardList={boards}
//               onSearch={handleSearch}
//               toggleSearchMode={toggleMode}
//             />
//             <div className="category-btns">
//               {categoryOptions.map((category) => {
//                 return (
//                   <Buttons
//                     key={uuidv4()}
//                     buttonClass="category-btn"
//                     buttonId={category}
//                     buttonText={category}
//                     onClick={handleCategoryChange}
//                   />
//                 );
//               })}
//             </div>
//             <Buttons buttonText="Create New Board" onClick={toggleModal} />
//             {modalOpen && (
//               <CreateBoard
//                 onCloseModal={toggleModal}
//                 onCreate={handleNewBoard}
//               />
//             )}
//           </div>
//         </header>
//         <main>
//           {
//             // if in search mode or nav mode, present search boards, otherwise present list of boards
//             <BoardList
//               boardList={searchMode || navMode ? requestedBoards : boards}
//               searchMode={searchMode}
//               noSearchResults={noSearchResults}
//               navMode={navMode}
//               noNavResults={noNavResults}
//               onDelete={handleDeleteBoard}
//             />
//           }
//         </main>
//         <footer></footer>
//       </div>
//     </BoardContext.Provider>
//   );
// };

// export default App;

import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home"
import BoardPage from "./pages/BoardPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:boardId" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;