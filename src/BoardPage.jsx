import React from 'react';
import './BoardPage.css'
import BoardCard from './BoardCard'

const BoardPage = ({boardInfo}) => {
    return(
        <div>
            <button>&lt;</button>
            <img alt="kudos board logo"/>
            <h1>Board Title</h1>
            <button>Create a Card</button>
            {boardInfo.cards.map((card) => <BoardCard key={uuid4()} cardInfo={card}/>)}
        </div>
    )
}

export default BoardPage;