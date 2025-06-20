import React from 'react';
import Buttons from './Buttons'
import "./BoardCard.css"
import CardModal from './CardModal'
import {useState} from 'react';
import {upvoteHelper} from './utils/utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const baseUrl = import.meta.env.VITE_API_URL;

const BoardCard = ({cardInfo, onDelete, refreshData}) => {
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

    const handleModalClose = (refreshNeeded) => {
        setDetailsOpen(false);
        refreshData(refreshNeeded)
    }

    return (
        <div className="board-card">
            <FontAwesomeIcon icon={faMapPin}/>
            <div className="card-top">
                <h2>{cardInfo.cardTitle}</h2>
                <p>{cardInfo.cardDescription}</p>
                <p>{cardInfo.cardAuthor}</p>
            </div>
            <img className="card-gif" src={cardInfo.gifURL}/>  
            <div className="card-btns">
                {/* Suggestions for how to pass the value upvotes into array to map */}
                <Buttons buttonId="details-btn" buttonText="Details" onClick={() => {setDetailsOpen(true)}} />
                <Buttons buttonId="upvote-btn" buttonText={`Upvote: ${upvotes}`} onClick={handleCardUpvote} />
                <Buttons buttonId="delete-btn" buttonText="Delete" onClick={handleDelete}/>
            </div>
            {detailsOpen && <CardModal cardInfo={cardInfo} onCloseModal={handleModalClose}/>}
        </div>
    )
}

export default BoardCard;