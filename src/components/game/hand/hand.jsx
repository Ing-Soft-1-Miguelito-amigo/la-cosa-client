import Card from '../card/card';
import { useState, useEffect } from 'react';
import style from '../hand/hand.module.css';
import { httpRequest } from '../../../services/HttpService';
import cardsFromBack from '../../../mocks/cardsData';

const Hand = ({
    gameId, 
    playerId
    }) => {
 
    const [stealCard, setStealCard] = useState([]);
    useEffect(() => {
        const fetchStealCard = async () => {
            try {
            const data = await httpRequest({ method: 'PUT', service: 'game/steal', payload: {game_id: gameId, player_id: playerId}});
            setStealCard(data.steal_card);
          } catch (error) {
            console.log(error);
          }
        }
        fetchStealCard();
        }
    , []);  

    
    const [hand, setHand] = useState([]);
    useEffect(() => {
        const fetchHand = async () => {
            try {
            const data = await httpRequest({ method: 'GET', service: 'game/' + gameId + '/player/'+ playerId});
            setHand(data.json.hand);
            } catch (error) {
            console.log(error);
            }
        }
        fetchHand();
        }, []);
    
    {/* 
    const [cards,setCards] = useState([]);
    useEffect(()=>{
        setCards(cardsFromBack)
    },[]);
    
    const stolenCard = cards[4];  
  */}

    return (
      <div className={style.container}>
        {/* Renderizar las primeras cuatro cartas */}
        <div className={style.cardGroup}>
          {hand.map((card, i) => (
            <Card key={i} card_id={card.card_id} />
          ))}
        </div>
        {/* Renderizar la quinta carta 
        <div className={style.cornerCard}>
          {stolenCard && <Card card_id={stolenCard.card_id} />}
        </div>
        */}
      </div>
    );
  };

export default Hand;