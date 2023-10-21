import style from '../card/card.module.css'
import { useContext } from "react"
import { CardSelectedContext, SetCardSelectedContext, GameContext, PlayerContext} from "../Game"

const Card = ({
    cardId,
    code,
    tablePosition,
    number_in_card,
    kind
}) => {
    const game = useContext(GameContext);
    const player = useContext(PlayerContext);
    const setCardSelected = useContext(SetCardSelectedContext);
    const cardSelected = useContext(CardSelectedContext);
    const cardStyle = cardSelected.cardId === cardId ? style.selected : style.card;
    
    const turn = game.turn;
    const turnOwner = turn.owner;
    const turnState = turn.state;
    const turnDestPlayer = turn.destination_player;
    const turnPlayedCard = turn.played_card;

    const selectCard = () => {
      switch (turnState) {
        case 1: //playing card
          console.log("kind", kind);
          if (cardSelected.cardId === cardId) {
            setCardSelected({}); 
          }
          else if (turnOwner === tablePosition && (kind === 0 || kind === 2)) {
            setCardSelected({ cardId:cardId, code:code, kind:kind });
          }
          break;

        case 2: //defending card
          if (cardSelected.cardId === cardId) {
            setCardSelected({});
          }
          else if ( kind === 1 && turnDestPlayer === player.name ) {
            setCardSelected({ cardId:cardId, code:code, kind:kind});
          }
          break;

        case 3: //exchanging cards (for spring 3!!)
          if (cardSelected.cardId === cardId) {
            setCardSelected({});
          }
          //check if the player selecting the card is the Towner or the next Towner
          break;

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
