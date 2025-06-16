import React from "react";
import {useState} from 'react';
import BoardPage from './BoardPage'

const Board = ({boardInfo}) => {
    const [openBoard, setOpenBoard] = useState(false);
    
    const toggleBoardPage = () => {
        setOpenBoard((prev) => !prev);
    }

    return(
        <div className="board-container">
            <img src={boardInfo.image}/>
            <p>{boardInfo.title}</p>
            <p>{boardInfo.category}</p>
            <div className="board-btns">
                <button onClick={toggleBoardPage}>View Board</button>
                <button>Delete Board</button>
            </div>
            {openBoard && <BoardPage onClosePage={toggleBoardPage} boardInfo={boardInfo} />}
        </div>
    )
}

export default Board;