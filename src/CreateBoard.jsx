import React from "react";

const CreateBoard = ({onCloseModal}) => {


    return (
        <div className='create-board-modal'>
            <button className='create-board-close' onClick={onCloseModal}>&times;</button>
            <h2>Create a New Board</h2>
            <form className='create-board-form'>
                <label for='title'>Title:</label>
                <input type='text' name='title' id='title' required/>
                <label>Category:</label>
                <select id="category" name='category'>
                    {/* TODO change to map to list of categories?? */}
                    <option value=''>Select a category</option>
                    <option id='celebration' value='celebration'>Celebration</option>
                    <option id='thank-you' value='thank-you'>Thank You</option>
                    <option id="inspiration" value="inspiration">Inspiration</option>
                </select>
                <label>Author:</label>
                <input type='text' name='author' id='author'/>
                <button className='create-board-btn' type='submit'>Create Board</button>
            </form>
        </div>
    )
}

export default CreateBoard;