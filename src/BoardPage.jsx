import React from "react";
import "./BoardPage.css";
import BoardCard from "./BoardCard";

const BoardPage = ({ onClosePage, boardInfo }) => {
    return (
        <div className="board-page">
        <button className="back-btn" onClick={onClosePage}>&lt;</button>
        <section className="board-header">
            <img alt="kudos board logo" />
            <h1>Board Title</h1>
            <button>Create a Card</button>
        </section>
        {/* {boardInfo.cards.map((card) => (
            <BoardCard key={uuid4()} cardInfo={card} />
        ))} */}
        </div>
    );
};

export default BoardPage;
