import React from "react";
import "../BoardPage.css";
import BoardCard from "../BoardCard";
import { useState, useEffect } from "react";
import CreateCard from "../CreateCard";
import Buttons from "../Buttons";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleBoard } from "../utils/utils";

const BoardPage = () => {
  const {boardId} = useParams();
  const [fetchedBoardInfo, setFetchedBoardInfo] = useState({});
  const navigate = useNavigate();

  // when board id changes (a new page is navigated to), refetch data
  useEffect(() => {
    const fetchData = async () => {
      const board = await fetchSingleBoard(boardId);
      console.log(board);
      console.log(board.cards);
      setFetchedBoardInfo(board);
      setBoardCards(board.cards);
    };
    fetchData();
  }, [boardId]);

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

  return (
    <div className="board-page">
      <button className="back-btn" onClick={handleClosePage}>
        &lt;
      </button>
      <section className="board-header">
        <img
          className="logo"
          src="../kudoboard_logo.png"
          alt="kudos board logo"
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
            />
          ))}
      </section>
    </div>
  );
};

export default BoardPage;
