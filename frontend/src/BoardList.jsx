import "./BoardList.css";
import Board from "./Board";
import { v4 as uuidv4 } from "uuid";

const BoardList = ({ boardList, searchMode, noSearchResults, navMode, noNavResults, onDelete}) => {

  return (
    <div>
      {/* if there are no boards and not in search mode display welcome message */}
      {boardList && boardList.length === 0 && (!searchMode && !navMode) ? (
        <section className="welcome">
          <h2>Welcome to the Kudos Board!</h2>
          <p>Click create a new board to get started</p>
        </section>
      ) : (
        // otherwise display board components
        <div className="board-list">
          {boardList && boardList.map((board) => {
            return <Board key={uuidv4()} boardInfo={board} onDelete={onDelete}/>;
          })}
        </div>
      )}
      {noSearchResults && <p>No results, try another search</p>}
      {noNavResults && <p>No boards in this category</p>}
    </div>
  );
};

export default BoardList;
