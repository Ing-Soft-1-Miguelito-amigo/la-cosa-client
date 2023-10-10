import { useState, useContext } from 'react';
import { GameContext, PlayerContext } from "../Game"
import FetchStealCard from '../../../containers/FetchStealCard';
import style from '../deck/deck.module.css';

const Deck = () => {
    
    const gameCtx = useContext(GameContext);
    const player = useContext(PlayerContext);

    const gameId = gameCtx.id;
    const turnPlayer = gameCtx.turn_owner;
    
    const [message, setMessage] = useState('');
    
    const liftCard = async () => {
        if (player.table_position == turnPlayer) {
            const data = {game_id: gameId, player_id: player.id}
            const response = await FetchStealCard(data)
            if(response.status === 200) {
                setMessage('Robaste una carta')
            }
            else {
                setMessage(response.detail)
            }
        }
        /* Implement case in which player has already picked a card using sockets (sprint2) */
        else {
            setMessage('No es tu turno')
        }
    }

    return (
        <div className={style.deck}>
            <div className={style.cardDeck} onClick={liftCard} data-testid="card-deck">
                <img src={`../../../src/img/default.png`} className={style.img} />
            </div>
            <div className={style.cardDeck}>
                <img src={`../../../src/img/default.png`} className={style.img} />
            </div>
            <span className = {style.span} data-testid="message"> 
                {message} 
            </span>
        </div>
    );
};

export default Deck;
