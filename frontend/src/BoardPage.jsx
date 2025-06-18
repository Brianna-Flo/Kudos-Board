import React from "react";
import "./BoardPage.css";
import BoardCard from "./BoardCard";
import { useState, useEffect } from 'react'
import CreateCard from './CreateCard'
import Buttons from './Buttons'
import { v4 as uuidv4 } from 'uuid';

const baseUrl = import.meta.env.VITE_API_URL;

const BoardPage = ({ onClosePage, boardInfo }) => {
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [boardCards, setBoardCards] = useState(boardInfo.cards)

    const toggleCardModal = () => {
        setCardModalOpen((prev) => !prev)
    }

    const handleDeleteCard = async (id) => {
        console.log("card id is ", id);
        try {
            console.log("inside handle delete card")
            console.log("printing cards for board")
            const response = await fetch(`${baseUrl}/boards/${boardInfo.id}/cards/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Failed to delete card");
            }
            const data = await response.json();
            console.log("deleted card", data)
            console.log("remaining cards", boardInfo.cards)
            setBoardCards(boardInfo.cards.filter((card) => {return card.id !== data.id}));
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleNewCard = (newCard) => {
        setBoardCards((prev) => [...prev, ...newCard])
    }

    useEffect(() => {
        console.log("board cards changed, need to refetch board from database")
    }, [boardCards])

    

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
                <BoardCard key={uuidv4()} cardInfo={card} onDelete={handleDeleteCard}/>
            ))}
        </section>
        </div>
    );
};

export default BoardPage;
