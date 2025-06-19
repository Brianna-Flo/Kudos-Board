import React from "react";
import "./BoardPage.css";
import BoardCard from "./BoardCard";
import { useState } from 'react'
import CreateCard from './CreateCard'
import Buttons from './Buttons'
import { v4 as uuidv4 } from 'uuid';


const BoardPage = ({ onClosePage, boardInfo }) => {
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [boardCards, setBoardCards] = useState(boardInfo.cards)
    
    const toggleCardModal = () => {
        setCardModalOpen((prev) => !prev)
    }

    const handleDeleteCard = (id) => {
        setBoardCards((prev) => {
            return prev.filter((curr) => {
                return curr.id !== id
            }
        )});
    }
    
    const handleNewCard = (newCard) => {
        console.log("new board card", newCard)
        setBoardCards((prev) => [...prev, newCard])
    }

    return (
        <div className="board-page">
        <button className="back-btn" onClick={onClosePage}>&lt;</button>
        <section className="board-header">
            <img className="logo" src="./kudoboard_logo.png" alt="kudos board logo" />
            <h1>{boardInfo.title}</h1>
            {/* <button onClick={toggleCardModal}>Create a Card</button> */}
            <Buttons buttonText="Create a Card" onClick={toggleCardModal}/>
            {cardModalOpen && <CreateCard onClose={toggleCardModal} onCreateCard={handleNewCard} />}
        </section>
        <section className="cards-container">
            {/* {boardInfo.cards.map((card) => (
                <BoardCard key={uuidv4()} cardInfo={card}  onDelete={handleDeleteCard}/>
            ))} */}
            {boardCards.map((card) => (
                <BoardCard key={uuidv4()} cardInfo={card}  onDelete={handleDeleteCard}/>
            ))}
        </section>
        </div>
    );
};

export default BoardPage;
