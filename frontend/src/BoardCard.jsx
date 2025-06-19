import React from 'react';
import Buttons from './Buttons'
import "./BoardCard.css"
import {useState} from 'react';

const BoardCard = ({cardInfo, onDelete}) => {
    const [upvotes, setUpvotes] = useState(cardInfo.cardUpvotes)
    
    const handleUpvote = () => {
        setUpvotes((prev) => (prev + 1))
    }

    const handleDelete = () => {
        onDelete(cardInfo.id);
    }

    return (
        <div className="board-card">
            <div>
                <h2>{cardInfo.cardTitle}</h2>
                <p>{cardInfo.cardDescription}</p>
                <p>{cardInfo.cardAuthor}</p>
                <img className="card-gif" src={cardInfo.gifURL}/>
            </div>    
            <div className="card-btns">
                {/* Suggestions for how to pass the value upvotes into array to map */}
                <Buttons buttonId="upvote-btn" buttonText={`Upvote: ${upvotes}`} onClick={handleUpvote} />
                <Buttons buttonId="delete-btn" buttonText="Delete" onClick={handleDelete}/>
            </div>
        </div>
    )
}

export default BoardCard;