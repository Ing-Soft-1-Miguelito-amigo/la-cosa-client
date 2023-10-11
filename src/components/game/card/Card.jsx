import style from '../card/card.module.css'
import { useContext } from "react"
import { CardSelectedContext, SetCardSelectedContext, TurnOwnerContext } from "../Game"

const Card = ({
    cardId,
    code,
    tablePosition,
    number_in_card
}) => {
    const setCardSelected = useContext(SetCardSelectedContext);
    const cardSelected = useContext(CardSelectedContext);
    const turnOwner = useContext(TurnOwnerContext);

    const cardStyle = cardSelected.cardId === cardId ? style.selected : style.card;

    const selectCard = () => {
        if (cardId !== cardSelected.cardId && turnOwner === tablePosition) {
          setCardSelected({ cardId:cardId, code:code,number_in_card:number_in_card });
        }
        else {
          return 0;
        }
        return 1;
      };

    return (
        <div onClick={selectCard} className={cardStyle} data-testid={"card-" + cardId}>
            <img src={`../../src/img/${code}${number_in_card}.png`} alt='img' role='imgs'/>
        </div>
    )
}

export default Card;
