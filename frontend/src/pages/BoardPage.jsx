import React from "react";
import "../BoardPage.css";
import BoardCard from "../BoardCard";
import { useState, useEffect } from "react";
import CreateCard from "../CreateCard";
import Buttons from "../Buttons";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleBoard } from "../utils/utils";
import Footer from '../Footer'

const baseUrl = import.meta.env.VITE_API_URL;

const BoardPage = () => {
  const {boardId} = useParams();
  const [fetchedBoardInfo, setFetchedBoardInfo] = useState({});
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  // when board id changes (a new page is navigated to), refetch data
  useEffect(() => {
    const fetchData = async () => {
      const board = await fetchSingleBoard(boardId);
      setFetchedBoardInfo(board);
      setBoardCards(board.cards);
    };
    fetchData();
  }, [boardId, refresh]);

  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [boardCards, setBoardCards] = useState(fetchedBoardInfo.cards);

  const toggleCardModal = () => {
    setCardModalOpen((prev) => !prev);
  };

  const handleDeleteCard = async (id) => {
    try {
      const response = await fetch(
        `${baseUrl}/boards/${fetchedBoardInfo.id}/cards/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
      const data = await response.json();
      setBoardCards(
        boardCards.filter((card) => {
          return card.id !== data.id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewCard = async (newCard) => {
    try {
      const response = await fetch(
        `${baseUrl}/boards/${fetchedBoardInfo.id}/cards/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create card");
      }
      const data = await response.json();
      setBoardCards((prev) => {
        return [...prev, data];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePage = () => {
    navigate(`/`);
  };

  const handleRefresh = (refreshNeeded) => {
    if (refreshNeeded) {
      setRefresh(true)
    }
  }

  return (
      <div className="board-page">
        <button className="back-btn" onClick={handleClosePage}>
          &lt;
        </button>
        <section className="board-header">
          <img
            className="logo"
            src="https://images.unsplash.com/vector-1739803316215-6edf1a5b09c9?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="unsplash smile face"
          />
          <h1>{fetchedBoardInfo.title}</h1>
          <Buttons buttonText="Create a Card" onClick={toggleCardModal} />
          {cardModalOpen && (
            <CreateCard onClose={toggleCardModal} onCreateCard={handleNewCard} />
          )}
        </section>
        <section className="cards-container">
          {boardCards &&
            boardCards.map((card) => (
              <BoardCard
                key={uuidv4()}
                cardInfo={card}
                onDelete={handleDeleteCard}
                refreshData={handleRefresh}
              />
            ))}
        </section>
        <Footer />
      </div>
  );
};

export default BoardPage;
