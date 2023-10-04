import Card from '../card/card';
import { useState, useEffect } from 'react';
import style from '../hand/hand.module.css';
import { httpRequest } from '../../../services/HttpService';

const Hand = ({
    gameId, 
    playerId
    }) => {
    
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

    return (
      <div className={style.container} data-testid='cards' >
        {/* Renderizar las primeras cuatro cartas */}
        <div className={style.cardGroup}>
          {hand.map((card, i) => (
                <Card key={i} card_id={card.id} code={card.code}/>
          ))}
        </div>
      </div>
    );
  };

export default Hand;