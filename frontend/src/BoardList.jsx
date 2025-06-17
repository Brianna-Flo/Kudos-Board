import "./BoardList.css";
import Board from "./Board";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BoardList = ({ boardList, searchMode, noResults }) => {

  return (
    <div>
      {/* if there are no boards and not in search mode display welcome message */}
      {boardList && boardList.length === 0 && !searchMode ? (
        <section className="welcome">
          <h2>Welcome to the Kudos Board!</h2>
          <p>Click create a new board to get started</p>
        </section>
      ) : (
        // otherwise display board components
        <div className="board-list">
          {boardList && boardList.map((board) => {
            return <Board key={uuidv4()} boardInfo={board} />;
          })}
        </div>
      )}
      {noResults && <p>No results, try another search</p>}
    </div>
  );
};

export default BoardList;
