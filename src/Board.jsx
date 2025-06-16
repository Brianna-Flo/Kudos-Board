import React from "react";
import {useState} from 'react';

const Board = ({boardInfo}) => {
    console.log(boardInfo);
    return(
        <div className="board-container">
            <img src={boardInfo.image}/>
            <p>{boardInfo.title}</p>
            <p>{boardInfo.category}</p>
            <div className="board-btns">
                <button>View Board</button>
                <button>Delete Board</button>
            </div>
        </div>
    )
}

export default Board;