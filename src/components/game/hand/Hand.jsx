import Card from "../card/Card";
import { useState, useEffect } from "react";
import style from "../hand/hand.module.css";
import FetchCards from "../../../containers/FetchCards";

const Hand = ({ gameId, playerId, selectCard, cardSelected }) => {
  const [hand, setHand] = useState([]);
  const [tablePosition, setTablePosition] = useState();
  
  useEffect(() => {
    FetchCards({
      onSetHand: setHand,
      gameId: gameId,
      playerId: playerId,
      onSetTablePosition: setTablePosition});
    },[]);

  return (
    <div className={style.container} data-testid="cards">
      {/* Renderizar las primeras cuatro cartas */}
        {hand.map((card, i) => (
          <Card key={i}
            cardId={card.id}
            code={card.code} 
            selectCard={selectCard}
            cardSelected={cardSelected}
            tablePosition = {tablePosition}/>
        ))}
    </div>
  );
};

export default Hand;
