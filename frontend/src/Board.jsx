import React from "react";
import {useState} from 'react';
import BoardPage from './BoardPage'
import './Board.css'
import { boardButtons } from "./utils/utils";
import Buttons from './Buttons'
import { v4 as uuidv4 } from 'uuid';

const Board = ({boardInfo}) => {
    const [openBoard, setOpenBoard] = useState(false);
    
    const toggleBoardPage = () => {
        setOpenBoard((prev) => !prev);
    }
    return(
        <div>
            <div className="board-container">
                <img className="boardImg" src={`https://picsum.photos/seed/${Math.random()}200/300`}/>
                <div className="board-info">
                    <h2>{boardInfo.title}</h2>
                    <p>{boardInfo.category}</p>
                    <div className="board-btns">
                        {boardButtons.map((entry) => {
                            return <Buttons key={uuidv4()} buttonId={entry.id} buttonText={entry.text} onClick={entry.id === "view-btn" ? toggleBoardPage : {}}/>
                        })}
                    </div>
                </div>
            </div>
            {openBoard && <BoardPage onClosePage={toggleBoardPage} boardInfo={boardInfo} />}
        </div>
    )
}

export default Board;