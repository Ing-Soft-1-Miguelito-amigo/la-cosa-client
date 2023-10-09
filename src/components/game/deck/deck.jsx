import { useState, useContext } from 'react';
import { GameContext, PlayersContext , PlayerContext } from "../Game"
import FetchStealCard from '../../../containers/FetchStealCard';
import style from '../deck/deck.module.css';

const Deck = () => {
    
    const gameCtx = useContext(GameContext);
    const players = useContext(PlayersContext);
    const player = useContext(PlayerContext);

    const gameId = gameCtx.id;
    const turnPlayer = gameCtx.turn_owner;
    
    const [message, setMessage] = useState('');
	const [clicked, setClicked] = useState(false);
    
    const liftCard = async () => {
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
            setMessage('Ya jugaste tu turno')
        }
        else {
            setMessage('No es tu turno')
        }
    }

    return (
        <div className={style.deck}>
            <div className={style.cardDeck} onClick={liftCard}>
                <img src={`../../../src/img/default.jpg`} className={style.img} />
            </div>
            <div className={style.cardDeck}>
                <img src={`../../../src/img/default.jpg`} className={style.img} />
            </div>            
            <span className = {style.span}> {message} </span>
        </div>
    );
};

export default Deck;
