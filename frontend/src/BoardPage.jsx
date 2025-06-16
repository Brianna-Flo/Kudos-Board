import React from "react";
import "./BoardPage.css";
import BoardCard from "./BoardCard";
import { useState } from 'react'
import CreateCard from './CreateCard'

const BoardPage = ({ onClosePage, boardInfo }) => {
    const [cardModalOpen, setCardModalOpen] = useState(false);

    const toggleCardModal = () => {
        setCardModalOpen((prev) => !prev)
    }

    return (
        <div className="board-page">
        <button className="back-btn" onClick={onClosePage}>&lt;</button>
        <section className="board-header">
            <img alt="kudos board logo" />
            <h1>Board Title</h1>
            <button onClick={toggleCardModal}>Create a Card</button>
            {cardModalOpen && <CreateCard onClose={toggleCardModal} />}
        </section>
        {/* {boardInfo.cards.map((card) => (
            <BoardCard key={uuid4()} cardInfo={card} />
        ))} */}
        </div>
    );
};

export default BoardPage;
