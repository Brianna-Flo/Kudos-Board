import "./BoardList.css";
import Board from "./Board";
import { useState } from "react";

const BoardList = () => {
  // hold board cards in an array of board components
  const [boards, setBoards] = useState([]);

  return (
    <div className="board-list">
      {
        // if there are no boards display welcome message
        boards.length === 0 ? (
            <section className='welcome'>
                <h2>Welcome to the Kudos Board!</h2>
                <p>Click create a new board to get started</p>
            </section>
        ) : (
            // otherwise display board components
            boards.map((board) => {
                return (<Board />);
            }
            )
        )
      }
    </div>
  );
};

export default BoardList;
