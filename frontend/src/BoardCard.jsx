import React from 'react';
import Buttons from './Buttons'
import "./BoardCard.css"
import {useState} from 'react';

const baseUrl = import.meta.env.VITE_API_URL;

const BoardCard = ({cardInfo, onDelete}) => {

    
    const [upvotes, setUpvotes] = useState(cardInfo.cardUpvotes)
    
    // const handleUpvote = () => {
    //     // setUpvotes((prev) => (prev + 1))
    //     onUpvote(cardInfo)
    // }

    const handleDelete = () => {
        onDelete(cardInfo.id);
    }

    const handleCardUpvote = async () => {
        try {
            console.log("inside handle card upvote")
            console.log("printing card info", cardInfo)
            const response = await fetch(`${baseUrl}/boards/${cardInfo.boardId}/cards/${cardInfo.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...cardInfo, 
                                        cardUpvotes: (++cardInfo.cardUpvotes),})
            })
            if (!response.ok) {
                throw new Error("Failed to upvote card");
            }
            const data = await response.json();
            setUpvotes(cardInfo.cardUpvotes);
        } catch (error) {
            console.error(error)
        }
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
                <Buttons buttonId="upvote-btn" buttonText={`Upvote: ${cardInfo.cardUpvotes}`} onClick={handleCardUpvote} />
                <Buttons buttonId="delete-btn" buttonText="Delete" onClick={handleDelete}/>
            </div>
        </div>
    )
}

export default BoardCard;