import React, { useState, useEffect } from 'react';
import style from '../deck/deck.module.css';
import FetchStealCard from '../../../containers/FetchStealCard';

const Deck = ({ gameId, playerId }) => {

    const [message, setMessage] = useState('');
	const [clicked, setClicked] = useState(false);

    const liftCard = () => {
        //if (playerId == 1) { //corregir
        if(!clicked) {
            const data = {game_id:gameId, player_id:playerId}
            const response = FetchStealCard(data)
            console.log(response.status)
            if(response.status == 200) {
                setMessage('Robaste una carta')
                setClicked(true);
            }
            else {
                setMessage(response.detail)
            }
        }
        /*}
        else {
            setMessage('No es tu turno')
        }*/
    }

    return (
        <div className={style.deck}>
            <div className={style.cardDeck}>
                <img src={`../../../src/img/default.jpg`} className={style.img} />
            </div>
            <div className={style.cardDeck} onClick={liftCard}>
                <img src={`../../../src/img/default.jpg`} className={style.img} />
            </div>
            <span className = {style.span}> {message} </span>
        </div>
    );
};

export default Deck;
