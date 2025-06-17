import React from 'react';
import Buttons from './Buttons'

const BoardCard = ({cardInfo}) => {
    return (
        <div className="board-card">
            <h2>Title</h2>
            <p>description</p>
            <img />
            <div className="card-btns">
                {/* Suggestions for how to pass the value upvotes into array to map */}
                <Buttons buttonId="upvote-btn" buttonText={`Upvote: ${upvotes}`} />
                <Buttons buttonId="delete-btn" buttonText="Delete" />
                {/* <button>{`Upvote: ${upvotes}`}</button>
                <button>Delete</button> */}
            </div>
        </div>
    )
}

export default BoardCard;