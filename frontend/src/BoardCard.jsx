import React from 'react';
import Buttons from './Buttons'
import "./BoardCard.css"
import {useState} from 'react';

const BoardCard = ({cardInfo}) => {
    const [upvotes, setUpvotes] = useState(cardInfo.cardUpvotes)
    
    const handleUpvote = () => {
        setUpvotes((prev) => (prev + 1))
    }

    return (
        <div className="board-card">
            <div>
                <h2>Title</h2>
                <p>description</p>
                <img className="card-gif" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTRwbjVjOXplMDU0bG52N2p4OXM3ZjR6b2w2aGUwY293eGpwanpzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Hq1MkVwdESwSPG2yMa/giphy.gif"/>
            </div>    
            <div className="card-btns">
                {/* Suggestions for how to pass the value upvotes into array to map */}
                <Buttons buttonId="upvote-btn" buttonText={`Upvote: ${upvotes}`} onClick={handleUpvote} />
                <Buttons buttonId="delete-btn" buttonText="Delete" />
            </div>
        </div>
    )
}

export default BoardCard;