import Card from '../card/card';
import { useState, useEffect } from 'react';
import style from '../hand/hand.module.css';
import { httpRequest } from '../../../services/HttpService';

const cardsFromBack = [
    {
    card_id: 1, 
    },
    {
    card_id: 2
    },
    {
    card_id: 3
    },
    {
    card_id: 4
    }
]

const Hand = (
    gameId, 
    playerId
    ) => {
  
    const [hand, setHand] = useState([]);
    useEffect(() => {
        const fetchHand = async () => {
            try {
            const data = await httpRequest({ method: 'GET', service: '/game/' + gameId + '/player/'+ playerId});
            setHand(data.my_cards);
            } catch (error) {
            console.log(error);
            }
        }
        fetchHand();
        }, []);
    
    const [cards,setCards] = useState([]);
    
    useEffect(()=>{
        setCards(cardsFromBack)
    },[]);

    return (
        <div id="hand" className={style.container}>
            {
                cards.map((cards,i)=>(
                    <Card 
                    key={i} 
                    card_id ={cards.card_id} 
                    />
                ))
            }
        </div>
    );
};

export default Hand;