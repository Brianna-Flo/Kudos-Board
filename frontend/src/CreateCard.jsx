import React from 'react';
import './CreateBoard.css';

const CreateCard = ({onClose, onCreateCard}) => {
    
    const handleCreateCard = (event) => {
        event.preventDefault();
        const newCard = {
            cardTitle: event.target.cardtitle.value,
            cardDescription: event.target.cardDescription.value,
            gifURL: event.target.gifURL.value,
            cardAuthor: event.target.cardAuthor,value,
            cardUpvotes: 0
        }
        onCreateCard(newCard)
        onClose();      
    }

    return (
        <section className='modal' id='create-card-modal'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onClose}>&times;</button>
                <h2>Create a New Card</h2>
                <form className='create-form' onSubmit={handleCreateCard}>
                    <input type='text' name='cardTitle' id='cardTitle' placeholder='Enter card title' required/>
                    <input type='text' name='cardDescription' id='cardDescription' placeholder='Enter card description' required/>
                    <input type='text' name='searchGIFs' id='searchGIFs' placeholder='Search GIFs...'/>
                    <button>Search</button>
                    <input type='text' name='gifURL' id='gifURL' placeholder='Enter GIF URL' />
                    <button>Copy GIF URL</button>
                    <input type='text' name='cardAuthor' id='cardAuthor' placeholder='Enter owner (optional)' />
                    <button>Create Card</button>
                </form>
            </div>
        </section>
    )
}

export default CreateCard;