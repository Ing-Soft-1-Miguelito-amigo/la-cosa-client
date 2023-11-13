import { useEffect } from 'react';
import style from '../card/card.module.css'

const Card = ({
    cardId,
    code,
    number_in_card,
    kind,
    setCardSelected,
    playerName,
    playerRole,
    tablePosition,
    turn,
    cardSelected
}) => {
    const cardStyle = cardSelected.cardId === cardId ? style.selected : style.card; //set the style of the card
    const turnState = turn.state; //get the state of the turn

    const isTurnOwner = (tablePosition === turn.owner)
    const isRecipientExchange = (turn.destination_player_exchange === playerName); //calculate if the player is the recipient of exchange

    useEffect(() => {
      if(kind === 4){
        setCardSelected({ cardId:cardId, code:code, kind:kind })
      }
    },[])

    const selectCard = () => {
      // console.log(kind);
      if (cardSelected.kind !== 4 && kind !== 5) {
        switch (turnState) {
          case 1: //playing card
            if (cardSelected.cardId === cardId) {
              setCardSelected({}); 
            }
            else if (isTurnOwner) {
              setCardSelected({ cardId:cardId, code:code, kind:kind });
            }
            break;
          case 3: //exchanging cards
            if (cardSelected.cardId === cardId) {
              setCardSelected({});
            }
            //check if the player selecting the card is the tOwner or 
            //check if the card is not a card is not a infected card or the player is the Thing
            //check if the card is not a card is not the Thing card
            else if (isTurnOwner && (kind !== 3 || playerRole === 3)) {
              setCardSelected({ cardId:cardId, code:code, kind:kind });
            }
            break;
          case 4://response exchanging cards
            if (cardSelected.cardId === cardId ) {
              setCardSelected({});
            }//check if the player selecting the card is the recipent of the exchange
            else if(isRecipientExchange && (kind !== 3 || playerRole === 3)){
              setCardSelected({ cardId:cardId, code:code, kind:kind });
            }

          default: //ending exchange or ending turn or lifting card
            return 0;     
        };
      }
    }

    return (
        <div onClick={selectCard} className={cardStyle} data-testid={"card-" + cardId}>
            <img src={`../../src/img/${code}${number_in_card}.png`} alt='img' role='imgs'/>
        </div>
    )
}

export default Card;
