import React from 'react';
import './CreateBoard.css';

const CreateCard = () => {
    return (
        <section className='modal' id='create-card-modal'>
            <div className='modal-content'>
                <button className='modal-close'>&times;</button>
                <h2>Create a New Card</h2>
                <form className='create-card-form'>
                    <input type='text' name='cardTitle' id='cardTitle' placeholder='Enter card title' required/>
                    <input type='text' name='cardDescription' id='cardDescription' placeholder='Enter card description' required/>
                    <input type='text' name='searchGIFs' id='searchGIFs' placeholder='Search GIFs...'/>
                    <button>Search</button>
                    <input type='text' name='gifURL' id='gifURL' placeholder='Enter GIF URL' />
                    <button>Copy GIF URL</button>
                    <input type='text' name='owner' id='owner' placeholder='Enter owner (optional)' />
                    <button>Create Card</button>
                </form>
            </div>
        </section>
    )
}

export default CreateCard;