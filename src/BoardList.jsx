import "./BoardList.css";
import Board from "./Board";
import { useState } from "react";

const BoardList = ({boardList}) => {

  return (
    <div className="board-list">
      {
        // if there are no boards display welcome message
        boardList.length === 0 ? (
            <section className='welcome'>
                <h2>Welcome to the Kudos Board!</h2>
                <p>Click create a new board to get started</p>
            </section>
        ) : (
            // otherwise display board components
            boardList.map((board) => {
                return (<Board />);
            }
        )
        )
      }
    </div>
  );
};

export default BoardList;
