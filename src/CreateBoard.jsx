import React from "react";
import './CreateBoard.css'

const CreateBoard = ({onCloseModal, onCreate}) => {

    const handleCreate = (event) => {
        event.preventDefault();
        // create an object containing information to use on the created board
        const newBoard = {
            title: event.target.title,
            description: event.target.description.value,
            category: event.target.category.value,
            image: event.target.image.value,
            author: event.target.author.value,
        }
        onCreate(newBoard);
        onCloseModal();
    }

    return (
        <section className='modal' id='create-board-modal'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onCloseModal}>&times;</button>
                <h2>Create a New Board</h2>
                <form className='create-board-form' onSubmit={handleCreate}>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' name='title' id='title' required/>
                    <label htmlFor='description'>Description:</label>
                    <input type='text' name='description' id='description' required/>
                    <label>Category:</label>
                    <select id="category" name='category' required>
                        {/* TODO change to map to list of categories?? */}
                        <option value=''>Select a category</option>
                        <option id='celebration' value='celebration'>Celebration</option>
                        <option id='thank-you' value='thank-you'>Thank You</option>
                        <option id="inspiration" value="inspiration">Inspiration</option>
                    </select>
                    <label htmlFor='image'>Image:</label>
                    <input type='file' name='image' id='image' required/>
                    <label htmlFor='author'>Author:</label>
                    <input type='text' name='author' id='author'/>
                    <button className='create-board-btn' type='submit'>Create Board</button>
                </form>
            </div>
        </section>
    )
}

export default CreateBoard;