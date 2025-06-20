import React from 'react'
import './Comment.css'

const Comment = ({commentInfo}) => {
    return (
        <div className="comment">
            <p className="author">{commentInfo.commentAuthor ? commentInfo.commentAuthor : "Annonymous Potato"}:</p>
            <p>{commentInfo.commentMessage}</p>
        </div>
    )
}

export default Comment;