import React from "react";
import {useState} from 'react';
import BoardPage from './BoardPage'
import './Board.css'

const Board = ({boardInfo}) => {
    const [openBoard, setOpenBoard] = useState(false);
    
    const toggleBoardPage = () => {
        setOpenBoard((prev) => !prev);
    }

    return(
        <div>
            <div className="board-container">
                <img className="boardImg" src={boardInfo.image}/>
                <div className="board-info">
                    <h2>{boardInfo.title}</h2>
                    <p>{boardInfo.category}</p>
                    <div className="board-btns">
                        <button className="view-btn" onClick={toggleBoardPage}>View Board</button>
                        <button className="delete-btn">Delete Board</button>
                    </div>
                </div>
            </div>
            {openBoard && <BoardPage onClosePage={toggleBoardPage} boardInfo={boardInfo} />}
        </div>
    )
}

export default Board;