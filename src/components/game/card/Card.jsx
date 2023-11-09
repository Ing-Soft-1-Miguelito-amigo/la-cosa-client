import style from '../card/card.module.css'
import { useContext } from "react"
import { CardSelectedContext, GameContext} from "../Game"
// import { CardToDefendContext } from "../hand/Hand"
const Card = ({
    cardId,
    code,
    number_in_card,
    kind,
    setCardSelected,
    playerName,
    playerRole,
    isTurnOwner,
}) => {
    const game = useContext(GameContext);
    const cardSelected = useContext(CardSelectedContext);
    const cardStyle = cardSelected.cardId === cardId ? style.selected : style.card; //set the style of the card
    
    const turn = game.turn; //get the turn
    const turnState = turn.state; //get the state of the turn

    const isRecipientExchange = (turn.destination_player_exchange === playerName); //calculate if the player is the recipient of exchange

    const selectCard = () => {
      switch (turnState) {
        case 1: //playing card
          if (cardSelected.cardId === cardId) {
            setCardSelected({}); 
          }
          else if (isTurnOwner && kind !== 5) {
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
          else if (isTurnOwner && (kind !== 3 || playerRole === 3) && kind !== 5) {
            setCardSelected({ cardId:cardId, code:code, kind:kind });
          }
          break;
        case 4://response exchanging cards
          if (cardSelected.cardId === cardId ) {
            setCardSelected({});
          }//check if the player selecting the card is the recipent of the exchange
          else if(isRecipientExchange && (kind !== 3 || playerRole === 3) && kind !== 5){
            setCardSelected({ cardId:cardId, code:code, kind:kind });
          }

        default: //ending exchange or ending turn or lifting card
          return 0;     
        
      };
    }

    return (
        <div onClick={selectCard} className={cardStyle} data-testid={"card-" + cardId}>
            <img src={`../../src/img/${code}${number_in_card}.png`} alt='img' role='imgs'/>
        </div>
    )
}

export default Card;
