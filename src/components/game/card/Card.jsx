import style from '../card/card.module.css'
import { useContext } from "react"
import { CardSelectedContext, GameContext, PlayerContext} from "../Game"
// import { CardToDefendContext } from "../hand/Hand"
const Card = ({
    cardId,
    code,
    tablePosition,
    number_in_card,
    kind,
    setCardSelected
}) => {
    const game = useContext(GameContext);
    const player = useContext(PlayerContext);
    const cardSelected = useContext(CardSelectedContext);
    const cardStyle = cardSelected.cardId === cardId ? style.selected : style.card;
    
    const turn = game.turn;
    const turnOwner = turn.owner;
    const turnState = turn.state;
    const turnDestPlayer = turn.destination_player;

    const selectCard = () => {
      switch (turnState) {
        case 1: //playing card
          if (cardSelected.cardId === cardId) {
            setCardSelected({}); 
          }
          else if (turnOwner === tablePosition && kind !== 5) {
            setCardSelected({ cardId:cardId, code:code, kind:kind });
          }
          break;
        // case 3: //exchanging cards (for spring 3!!)
        //   if (cardSelected.cardId === cardId) {
        //     setCardSelected({});
        //   }
        //   //check if the player selecting the card is the Towner or the next Towner
        //   break;

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
