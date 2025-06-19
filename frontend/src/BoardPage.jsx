import React from "react";
import "./BoardPage.css";
import BoardCard from "./BoardCard";
import { useState } from 'react'
import CreateCard from './CreateCard'
import Buttons from './Buttons'
import { v4 as uuidv4 } from 'uuid';
import { useBoardContext } from "./BoardContext";

const baseUrl = import.meta.env.VITE_API_URL;

const BoardPage = ({ onClosePage, boardInfo }) => {
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [boardCards, setBoardCards] = useState(boardInfo.cards);
    const [refreshNeeded, setRefreshNeeded] = useState(false);  // if card was deleted, need to refetch to update state of boards when navigating back to homepage

    const {fetchBoardData} = useBoardContext();

    const toggleCardModal = () => {
        setCardModalOpen((prev) => !prev)
    }

    const handleDeleteCard = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/boards/${boardInfo.id}/cards/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Failed to delete card");
            }
            const data = await response.json();
            setBoardCards(boardCards.filter((card) => {return card.id !== data.id}));
            setRefreshNeeded(true);
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleNewCard = async (newCard) => {
        try {
            console.log("inside handle create card, card to create ", newCard)
            const response = await fetch(`${baseUrl}/boards/${boardInfo.id}/cards/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCard)
            })
            if (!response.ok) {
                throw new Error("Failed to create card");
            }
            const data = await response.json();
            setBoardCards((prev) => {
                return [...prev, data]
            });
            setRefreshNeeded(true);
        } catch (error) {
            console.error(error)
        }
    }

    // when the page is closed, 
    const handleClosePage = () => {
        onClosePage();
        if (refreshNeeded) {
            console.log("need to refresh due to delete or added card")
            fetchBoardData();
        } else {
            console.log("didnt refresh")
        }
    }

    return (
        <div className="board-page">
        <button className="back-btn" onClick={handleClosePage}>&lt;</button>
        <section className="board-header">
            <img className="logo" src="./kudoboard_logo.png" alt="kudos board logo" />
            <h1>{boardInfo.title}</h1>
            <Buttons buttonText="Create a Card" onClick={toggleCardModal}/>
            {cardModalOpen && <CreateCard onClose={toggleCardModal} onCreateCard={handleNewCard} />}
        </section>
        <section className="cards-container">
            {boardCards.map((card) => (
                <BoardCard key={uuidv4()} cardInfo={card} onDelete={handleDeleteCard} refreshNeeded={() => setRefreshNeeded(true)}/>
            ))}
        </section>
        </div>
    );
};

export default BoardPage;
