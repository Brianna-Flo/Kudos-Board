import React from 'react';
import Buttons from './Buttons'
import "./BoardCard.css"
import {useState} from 'react';
import {upvoteHelper} from './utils/utils'

const baseUrl = import.meta.env.VITE_API_URL;

// const BoardCard = ({cardInfo, onDelete, refreshNeeded}) => {
const BoardCard = ({cardInfo, onDelete}) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [upvotes, setUpvotes] = useState(cardInfo.cardUpvotes)

    const handleDelete = () => {
        onDelete(cardInfo.id);
    }

    const handleCardUpvote = async () => {
        try {
            const updated = await upvoteHelper(cardInfo);
            setUpvotes(cardInfo.cardUpvotes);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="board-card">
            <div className="card-top">
                <h2>{cardInfo.cardTitle}</h2>
                <p>{cardInfo.cardDescription}</p>
                <p>{cardInfo.cardAuthor}</p>
            </div>
            <img className="card-gif" src={cardInfo.gifURL}/>  
            <div className="card-btns">
                {/* Suggestions for how to pass the value upvotes into array to map */}
                <Buttons buttonId="details-btn" buttonText="Details" onClick={handleDetails} />
                <Buttons buttonId="upvote-btn" buttonText={`Upvote: ${upvotes}`} onClick={handleCardUpvote} />
                <Buttons buttonId="delete-btn" buttonText="Delete" onClick={handleDelete}/>
            </div>
        </div>
    )
}

export default BoardCard;