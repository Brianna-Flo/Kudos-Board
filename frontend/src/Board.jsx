import React from "react";
import {useState} from 'react';
import BoardPage from './pages/BoardPage'
import './Board.css'
import { boardButtons } from "./utils/utils";
import Buttons from './Buttons'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom"


const Board = ({boardInfo, onDelete}) => {
    const [openBoard, setOpenBoard] = useState(false);

    const navigate = useNavigate();
    
    const toggleBoardPage = () => {
        navigate(`/boards/${boardInfo.id}`)
    }


    return(
        <div>
            <div className="board-container">
                <img className="boardImg" src={`https://picsum.photos/seed/${Math.random()}200/300`}/>
                <div className="board-info">
                    <h2>{boardInfo.title}</h2>
                    <p>{boardInfo.category}</p>
                    <p>{boardInfo.author}</p>
                    <div className="board-btns">
                        {boardButtons.map((entry) => {
                            return <Buttons key={uuidv4()} buttonId={entry.id} buttonText={entry.text} onClick={entry.id === "view-btn" ? toggleBoardPage : (() => {
                                onDelete(boardInfo.id)
                            })}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board;