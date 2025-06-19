import React from 'react'

const Comment = ({commentInfo}) => {
    return (
        <div>
            {commentInfo.author ? <p>{commentInfo.author}</p> : <p>Annonymous Potato</p>}
            <p>{commentInfo.message}</p>
        </div>
    )
}

export default Comment;