import "./BoardList.css";
import Board from "./Board";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const BoardList = ({boardList}) => {
    const printList = () => {
        console.log(boardList);
    }

  return (
    <div className="board-list">
      {
        // if there are no boards display welcome message
        // boardList.length === 0 ? (
        //     <section className='welcome'>
        //         <h2>Welcome to the Kudos Board!</h2>
        //         <p>Click create a new board to get started</p>
        //     </section>
        // ) : (
            // otherwise display board components
            boardList.map((board) => {
                return (<Board key={uuidv4()} boardInfo={board}/>);
            }
        )
        // )
      }
    </div>
  );
};

export default BoardList;
