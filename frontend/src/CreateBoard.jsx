import React from "react";
import './CreateBoard.css'
import './Buttons.css'

const CreateBoard = ({onCloseModal, onCreate}) => {

    const handleCreate = (event) => {
        event.preventDefault();
        // create an object containing information to use on the created board
        const newBoard = {
            title: event.target.boardTitle.value,
            description: event.target.description.value,
            category: event.target.category.value,
            image: `https://picsum.photos/seed/${Math.random()}300/500`,
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
                <form className='create-form' onSubmit={handleCreate}>
                    <label htmlFor='boardTitle'>Title:</label>
                    <input type='text' name='boardTitle' id='boardTitle' required/>
                    <label htmlFor='description'>Description:</label>
                    <input type='text' name='description' id='description' required/>
                    <label>Category:</label>
                    <select id="category" name='category' required>
                        <option value=''>Select a category</option>
                        <option id='celebration' value='Celebration'>Celebration</option>
                        <option id='thank-you' value='Thank You'>Thank You</option>
                        <option id="inspiration" value="Inspiration">Inspiration</option>
                    </select>
                    {/* <label htmlFor='image'>Image:</label>
                    <input type='text' name='image' id='image'/> */}
                    <label htmlFor='author'>Author:</label>
                    <input type='text' name='author' id='author'/>
                    <button className='create-board-btn buttons' type='submit'>Create Board</button>
                </form>
            </div>
        </section>
    )
}

export default CreateBoard;