import React from 'react';
import './CreateBoard.css';
import {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';


const API_KEY = import.meta.env.VITE_API_KEY;

const CreateCard = ({onClose, onCreateCard}) => {
    
    const[searchQuery, setSearchQuery] = useState("");
    const[inSearchMode, setInSearchMode] = useState(false);
    const[searchResults, setSearchResults] = useState([]);
    const[chosenGif, setChosenGif] = useState("");

    const handleCreateCard = (event) => {
        event.preventDefault();
        const newCard = {
            cardTitle: event.target.cardTitle.value,
            cardDescription: event.target.cardDescription.value,
            gifURL: event.target.gifURL.value,
            cardAuthor: event.target.cardAuthor.value,
            cardUpvotes: 0
        }
        onCreateCard(newCard)
        onClose();      
    }

    const fetchGifs = async () => {
        try {
            const response = await fetch (`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchQuery}&limit=4`)
            if (!response.ok) {
                throw new Error("Failed to fetch gifs");
            }
            const data = await response.json();
            setSearchResults(data.data);
            setInSearchMode(true);
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value)
    }

    useEffect(() => {
        if (inSearchMode) {
            console.log(searchResults);
        }
    }, [searchResults, inSearchMode])

    const handleClickOnGif = (event) => {
        event.preventDefault();
        setChosenGif(event.target.src);
        setInSearchMode(false);
    }

    const handleGifChange = (event) => {
        setChosenGif(event.target.value)
    }

    return (
        <section className='modal' id='create-card-modal'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onClose}>&times;</button>
                <h2>Create a New Card</h2>
                <form className='create-form' onSubmit={handleCreateCard}>
                    <input type='text' name='cardTitle' id='cardTitle' placeholder='Enter card title' required/>
                    <input type='text' name='cardDescription' id='cardDescription' placeholder='Enter card description' required/>
                    <input type='text' name='searchGIFs' id='searchGIFs' value={searchQuery} onChange={handleSearchChange} placeholder='Search GIFs...'/>
                    <button type='button' onClick={fetchGifs}>Search</button>
                    {inSearchMode && 
                    <section id="gif-results">
                        {searchResults.map((result) => {
                            return (<img key={uuidv4()} src={result.images.original.url} value={result.images.original.url} onClick={handleClickOnGif} object-fit="cover" width="50%" height="150"/>)})}
                    </section>
                    } 
                    <input type='text' name='gifURL' id='gifURL' value={chosenGif} onChange={handleGifChange} placeholder='Enter GIF URL' required/>
                    {/* <button type="button">Copy GIF URL</button> */}
                    <input type='text' name='cardAuthor' id='cardAuthor' placeholder='Enter owner (optional)' />
                    <button type="submit">Create Card</button>
                </form>
            </div>
        </section>
    )
}

export default CreateCard;