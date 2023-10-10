import Card from "../card/Card";
import { useState, useEffect } from "react";
import style from "../hand/hand.module.css";
import { httpRequest } from "../../../services/HttpService";
import FetchCards from "../../../containers/FetchCards";

const Hand = ({ gameId, playerId }) => {
  const [hand, setHand] = useState([]);
  useEffect(() => {
    FetchCards({
      onSetHand: setHand,
      gameId: gameId,
      playerId: playerId,
    });
  }, []);

  return (
    <div className={style.container} data-testid="cards">
      {/* Renderizar las primeras cuatro cartas */}
      <div className={style.cardGroup}>
        {hand.map((card, i) => (
          <Card key={i} card_id={card.id} code={card.code} number_in_card={card.number_in_card}/>
        ))}
      </div>
    </div>
  );
};

export default Hand;
