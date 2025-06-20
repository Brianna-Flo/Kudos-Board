import React from 'react'
import './CardModal.css'
import './CreateBoard.css'
import Comment from './Comment'
import Buttons from './Buttons'
import CreateComment from './CreateComment.jsx'

import {useState, useEffect} from 'react'

const baseUrl = import.meta.env.VITE_API_URL;


const CardModal = ({ cardInfo, onCloseModal }) => {
    const [comments, setComments] = useState(cardInfo.comments)
    const [newCommentForm, setNewCommentForm] = useState(false);
    const [refreshNeeded, setRefreshNeeded] = useState(false)

    const handleNewComment = async(newComment) => {
        try {
            const response = await fetch(`${baseUrl}/boards/${cardInfo.boardId}/cards/${cardInfo.id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            }
            );
            if (!response.ok) {
                throw new Error("Failed to create comment");
            }
            const data = await response.json();
            setRefreshNeeded(true)
            setComments((prev) => {
                return [...prev, data];
            });
        } catch (error) {
            console.error(error)
        }
    }

    const handleCloseModal = () => {
        onCloseModal(refreshNeeded);
    }

    return (
        <section className='modal' id="card-modal">
            <div className='modal-content cardModal'>
                <button className='modal-close' onClick={handleCloseModal}>&times;</button>
                <h2>{cardInfo.cardTitle}</h2>
                <p>{cardInfo.cardDescription}</p>
                <p>{cardInfo.cardAuthor}</p>
                <img className="card-gif" src={cardInfo.gifURL}/>
                <Buttons buttonClass="" buttonText="Comment!" onClick={()=>setNewCommentForm(true)}/>
                {newCommentForm && (<CreateComment onNewComment={handleNewComment} onCloseComment={()=>setNewCommentForm(false)}/>)}
                {comments.map((comment) => {
                    return <Comment key={comment.id} commentInfo={comment}/>
                })}
            </div>
        </section>
    )
}

export default CardModal;