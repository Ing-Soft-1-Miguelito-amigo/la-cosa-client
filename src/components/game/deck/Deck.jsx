import { useState, useContext, useEffect } from 'react';
import { GameContext, PlayerContext } from "../Game"
import FetchStealCard from '../../../containers/FetchStealCard';
import style from '../deck/deck.module.css';

const Deck = (

) => {
    
    const gameCtx = useContext(GameContext);
    const player = useContext(PlayerContext);

    const gameId = gameCtx.id;
    const turnPlayer = gameCtx.turn_owner;
    
    const [message, setMessage] = useState('');
    const [clicked, setClicked] = useState(false);
    
    useEffect(()=>{
        setMessage('');
        setClicked(false)
    },[turnPlayer])


    const liftCard = async () => {
        if (player.hand.length >= 5){
            setMessage('Tienes el maximo de cartas ya!')
        }
        else
         if (player.table_position == turnPlayer && !clicked) {
            const data = {game_id: gameId, player_id: player.id}
            const response = await FetchStealCard(data)
            if(response.status === 200) {
                setMessage('Robaste una carta')
                setClicked(true);
            }
            else {
                setMessage(response.detail)
            }
        }
        else if (player.table_position == turnPlayer && clicked) {
            setMessage('Ya robaste una carta')
        }
        else {
            setMessage('No es tu turno')
        }
    }

    return (
        <div className={style.deckContainer}>
            <div className={style.cardDeckContainer}>
                <div className={style.cardDeck} onClick={liftCard} data-testid="card-deck">
                    <img src={`../../../src/img/atk.png`} className={style.img} />
                </div>
                <div className={style.cardDeck}>
                    <img src={`../../../src/img/default.png`} className={style.img2} />
                </div>
            </div>
            <div className={style.messageContainer}>
                <span className={style.span} data-testid="message">
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Deck;
