import React from 'react';

const BoardCard = ({cardInfo}) => {
    return (
        <div className="board-card">
            <h2>Title</h2>
            <p>description</p>
            <img />
            <div className="card-btns">
                <button>{`Upvote: ${upvotes}`}</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default BoardCard;