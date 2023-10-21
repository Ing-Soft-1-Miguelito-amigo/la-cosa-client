import Card from "../card/Card";
import { useState, useEffect } from "react";
import style from "../hand/hand.module.css";
import FetchCards from "../../../containers/FetchCards";
import { useContext } from "react";
import { PlayerContext } from "../Game";

const Hand = ({ gameId, playerId }) => {
  const [hand, setHand] = useState([]);
  const [tablePosition, setTablePosition] = useState();
  
  // const player = useContext(PlayerContext);

  // useEffect(() => {
  //   setHand(player.hand)
  //   setTablePosition(player.table_position)
  // },[player]);

  useEffect(() => {
    FetchCards({
      onSetHand: setHand,
      gameId: gameId,
      playerId: playerId,
      onSetTablePosition: setTablePosition});
  });

  hand.sort((a, b) => a.id - b.id)


  return (
    <div className={style.container} data-testid="cards">
      {/* Renderizar las primeras cuatro cartas */}
        {hand.map((card, i) => (

          <Card key={i}
            cardId={card.id}
            code={card.code} 
            tablePosition = {tablePosition}
            number_in_card={card.number_in_card}
            kind={card.kind}
            />
        ))}
    </div>
  );
};


export default Hand;

