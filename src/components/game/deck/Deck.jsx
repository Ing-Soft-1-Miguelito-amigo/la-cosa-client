import { useState, useContext, useEffect } from 'react';
import { GameContext, PlayerContext, CardSelectedContext, SetDiscardContext, SetPlayerSelectedContext } from "../Game"
import FetchStealCard from '../../../containers/FetchStealCard';
import style from '../deck/deck.module.css';

const Deck = ({
    player
}) => {
    
    console.log("player in deck",player)
    const game = useContext(GameContext);
    const cardSelected = useContext(CardSelectedContext); //Discard Card
    const setDiscard = useContext(SetDiscardContext);
    const setPlayerSelected = useContext(SetPlayerSelectedContext);

    const gameId = game.id;
    const turn = game.turn;
    const turnOwner = turn.owner;
    const turnState = turn.state;
    
    const [message, setMessage] = useState('');
    const [clicked, setClicked] = useState(false);
    
    const styleDeck = player.table_position == turnOwner ? style.img : style.img2;


    useEffect(()=>{
        setMessage('');
        setClicked(false)
    },[turnOwner])


    const liftCard = async () => {
        switch (turnState) {
            case 0: //lifting card
                if (player.hand.length >= 5){
                    setMessage('Tienes el maximo de cartas ya!')
                }
                else if (player.table_position == turnOwner && !clicked) {
                    const data = {game_id: gameId, player_id: player.id}
                    const response = await FetchStealCard(data)
                    if(response.status === 200) {
                        setMessage(response.detail)
                        setClicked(true);
                    }
                    else {
                        setMessage(response.detail)
                    }
                }
                else if (player.table_position == turnOwner && clicked) {
                    setMessage('Ya robaste una carta')
                }
                else {
                    setMessage('No es tu turno')
                }
                break;
            default:
                setMessage('No puedes robar cartas ahora')
                }
        return 0;
    }

    const discardCard = async () => {
        if (player.table_position == turnOwner && cardSelected.cardId !== undefined) {     
            setDiscard.setDiscard(!setDiscard.discard);
            setPlayerSelected({});
        }
    }


    return (
        <div className={style.deckContainer}>
            <div className={style.cardDeckContainer}>
                <div className={style.cardDeck} onClick={liftCard} data-testid="card-deck">
                    <img src={`../../../src/img/atk.png`} className={styleDeck} />
                </div>
                <div className={style.cardDeck} onClick={discardCard} data-testid="discard">
                    <img src={`../../../src/img/tachoBasura.png`}  className={style.trash} />
                </div>
            </div>
            <div className={style.messageContainer}>
                <span className={style.span} data-testid="message" >
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Deck;
