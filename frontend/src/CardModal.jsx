import React from 'react'
import './CardModal.css'
import './CreateBoard.css'
import Comment from './Comment'

import {useState} from 'react'

const CardModal = ({ cardInfo, onCloseModal }) => {
    const [comments, setComments] = useState(cardInfo.comments)

    return (
        <section className='modal' id="card-modal">
            <div className='modal-content'>
                <button className='modal-close' onClick={onCloseModal}>&times;</button>
                <h2>{cardInfo.cardTitle}</h2>
                <p>{cardInfo.cardDescription}</p>
                <p>{cardInfo.cardAuthor}</p>
                <img className="card-gif" src={cardInfo.gifURL}/>
                <Buttons buttonClass="" buttonText="Comment!" onClick/>  
                {comments.map((comment) => {
                    return <Comment key={uuidv4()} commentInfo={comment}/>
                })}
            </div>
        </section>
    )
}

export default CardModal;