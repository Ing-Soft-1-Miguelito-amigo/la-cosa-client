import Card from "../card/Card";
import { useState, useEffect } from "react";
import style from "../hand/hand.module.css";
import FetchCards from "../../../containers/FetchCards";

const Hand = ({ gameId, playerId }) => {
  const [hand, setHand] = useState([]);
  const [tablePosition, setTablePosition] = useState();
  
  useEffect(() => {
    FetchCards({
      onSetHand: setHand,
      gameId: gameId,
      playerId: playerId,

      onSetTablePosition: setTablePosition});
    

    });
  });
  
  hand.sort((a, b) => a.id - b.id)


  return (
    <div className={style.container} data-testid="cards">
      {/* Renderizar las primeras cuatro cartas */}
        {hand.map((card, i) => (

          <Card key={i}
            cardId={card.id}
            code={card.code} 
            tablePosition = {tablePosition}/>

        ))}
    </div>
  );
};


export default Hand;

