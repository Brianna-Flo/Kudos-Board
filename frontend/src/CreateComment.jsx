import React from 'react'
import './CardModal.css'

const CreateComment = ({onNewComment, onCloseComment}) => {
    const handleNewComment = (event) => {
        event.preventDefault();
        const newComment = {
            commentMessage: event.target.commentMessage.value,
            commentAuthor: event.target.commentAuthor.value
        }
        onNewComment(newComment);
        onCloseComment()
    }

    return(
        <div>
            {/* <button className='comment-close' onClick={onCloseComment}>&times;</button> */}
            <form onSubmit={handleNewComment}>
                <input type='text' name='commentMessage' id='commentMessage' placeholder='Enter message' required/>
                <input type='text' name='commentAuthor' id='commentAuthor' placeholder='author (optional)' />
                <button type="submit" className="comment-btn">Comment!</button>
            </form>
        </div>
    )
}

export default CreateComment