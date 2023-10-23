import Card from "../card/Card";
import { useState, useEffect, createContext } from "react";
import style from "../hand/hand.module.css";
import FetchCards from "../../../containers/FetchCards";
import FetchResponse from "../../../containers/FetchResponse";
import { useContext } from "react";
import { PlayerContext, GameContext, SetCardSelectedContext } from "../Game";
// import FetchEndTurn from "../../../containers/FetchEndTurn";

// export const CardToDefendContext = createContext();

const Hand = ({ gameId, playerId, onSetHasCardToDefend, player, gameData, setCardSelected, defendCard}) => {
  const [hand, setHand] = useState([]);
  const [tablePosition, setTablePosition] = useState();

  useEffect(() => {
    setHand(player.hand)
    setTablePosition(player.table_position)
  },[player]);

  useEffect(() => {
    //If the state of the turn is defense and the destination player is me 
    if (gameData.turn.state === 2 && 
      gameData.turn.destination_player === player.name) {
      //check if hand has a valid card to defend 
      switch(gameData.turn.played_card.code){
        case "lla": 
          //Card played 'lanzallamas', then check if player has 'nada de barbacoas'
          const cardToDefend = hand.filter(card => card.code === "ndb")
          if (cardToDefend.length !== 0){
            console.log("card to defend",cardToDefend[0].cardId)
            defendCard( cardToDefend[0].cardId)
          }else{
            defendCard(null)
          }
          break;
        // the others cases for next spring (cdl,mvc.sos,ana,det,sed)
        default:
          defendCard(null)
          break;
      }}
  
    },[gameData]);

  hand.sort((a, b) => a.id - b.id)

  return (
    <div className={style.container} data-testid="cards" >
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

