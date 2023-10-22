import Card from "../card/Card";
import { useState, useEffect, createContext } from "react";
import style from "../hand/hand.module.css";
import FetchCards from "../../../containers/FetchCards";
import FetchResponse from "../../../containers/FetchResponse";
import { useContext } from "react";
import { PlayerContext, GameContext } from "../Game";
import { set } from "react-hook-form";

export const CardToDefendContext = createContext();

const Hand = ({ gameId, playerId }) => {
  const [hand, setHand] = useState([]);
  const [tablePosition, setTablePosition] = useState();
  const gameData = useContext(GameContext);
  const playerData = useContext(PlayerContext);
  const [hasCardToDefend, setHasCardToDefend] = useState(false);
  
  // const player = useContext(PlayerContext);

  // useEffect(() => {
  //   setHand(player.hand)
  //   setTablePosition(player.table_position)
  // },[player]);

  useEffect(() => {
    //If the state of the turn is defense and the destination player is me 
    if (gameData.turn.state === 2 && 
      gameData.turn.destination_player === playerData.name) {

      //check if hand has a valid card to defend 
      switch(gameData.turn.played_card.code){
        case "lla": 
          //Card played lanzallamas, then check if player has nada de barbacoas
          if (hand.filter(card => card.code === "nbd").length === 0) {
            const data = {game_id: null, player_id: playerId, response_card_id: 0}
            setHasCardToDefend(false);
            FetchResponse(data);
          } 
          break;
        default:
          setHasCardToDefend(true);
          break;
    }
  }},[gameData.turn.state]);


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
          <CardToDefendContext.Provider value={hasCardToDefend}>
          <Card key={i}
            cardId={card.id}
            code={card.code} 
            tablePosition = {tablePosition}
            number_in_card={card.number_in_card}
            kind={card.kind}
            />
          </CardToDefendContext.Provider>
        ))}
    </div>
  );
};


export default Hand;

