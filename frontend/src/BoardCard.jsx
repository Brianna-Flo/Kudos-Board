import React from 'react';
import Buttons from './Buttons'
import "./BoardCard.css"
import CardModal from './CardModal'
import {useState} from 'react';
import {pinnedHelper, upvoteHelper} from './utils/utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const baseUrl = import.meta.env.VITE_API_URL;

const BoardCard = ({cardInfo, onDelete, refreshData, onPin}) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [upvotes, setUpvotes] = useState(cardInfo.cardUpvotes)
    const [pinned, setPinned] = useState(cardInfo.pinned);

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

    const handlePin = async () => {
        try {
            const updated = await pinnedHelper(cardInfo);
            setPinned((prev) => !prev)
            onPin()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="board-card">
            <FontAwesomeIcon icon={faMapPin} className="pin" color={pinned ? "#fc7488" : "#D6CFC7"}onClick={handlePin}/>
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