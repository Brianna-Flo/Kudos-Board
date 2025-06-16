import React from "react";
import "./BoardPage.css";
import BoardCard from "./BoardCard";

const BoardPage = ({ onClosePage, boardInfo }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="board-page">
        <button className="back-btn" onClick={onClosePage}>&lt;</button>
        <section className="board-header">
            <img alt="kudos board logo" />
            <h1>Board Title</h1>
            <button onClick={() => setModalOpen((prev) => !prev)}>Create a Card</button>
            {modalOpen && <CreateCard />}
        </section>
        {/* {boardInfo.cards.map((card) => (
            <BoardCard key={uuid4()} cardInfo={card} />
        ))} */}
        </div>
    );
};

export default BoardPage;
