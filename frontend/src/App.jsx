import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home"
import BoardPage from "./pages/BoardPage"
import {useState} from 'react'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleModeSwitch = () => {
    setDarkMode((prev) => { // say prev was false
      if (!prev === true) { // prev is now true (we are now in dark mode)
        document.body.className = "dark-mode"
      } else {
        document.body.className = "light-mode"
      }
      return !prev;
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} onSwitch={handleModeSwitch} />} />
        <Route path="/boards/:boardId" element={<BoardPage darkMode={darkMode} onSwitch={handleModeSwitch} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;