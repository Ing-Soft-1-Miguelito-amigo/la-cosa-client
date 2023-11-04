import Card from "../card/Card";
import { useState, useEffect} from "react";
import style from "../hand/hand.module.css";

const Hand = ({ 
  player, 
  gameData, 
  setCardSelected, 
  defendCard
}) => {
  const [hand, setHand] = useState([]);
  const [tablePosition, setTablePosition] = useState();

  useEffect(() => {
    setHand(player.hand)
    setTablePosition(player.table_position)
  },[player]);

  useEffect(() => {
    //If the state of the turn is defense and the destination player is me 
    // if (gameData.turn.state === 3 || (gameData.turn.state === 2 && gameData.turn.destination_change === player.name)){
      
    // }
    // else 
    if (gameData.turn.state === 2 && gameData.turn.destination_player === player.name) {
      //check if hand has a valid card to defend 
      const cardCode = gameData.turn.played_card.code;
      switch(cardCode){
        case "lla": 
          //Card played 'lanzallamas', then check if player has 'nada de barbacoas'
          const cardToDefendlla = hand.filter(card => card.code === "ndb");
          if (cardToDefendlla.length !== 0){
            setCardSelected({ cardId:cardToDefendlla[0].id, code:cardToDefendlla[0].code, kind:cardToDefendlla[0].kind });
            defendCard( cardToDefendlla[0].id);
          }else{
            defendCard(null);
          }
          break;
        case "cdl":
        case "mvc":
          const cardToDefendcdl = hand.filter(card => card.code === "aeb");
          if (cardToDefendcdl.length !== 0){
            setCardSelected({ cardId:cardToDefendcdl[0].id, code:cardToDefendcdl[0].code, kind:cardToDefendcdl[0].kind });
            defendCard( cardToDefendcdl[0].id);
          }else{
            defendCard(null);
          }
          break;
        default:
          defendCard(null);
          break;
      }}
    },[gameData]);

  hand.sort((a, b) => a.id - b.id)

  return (
    <div className={style.container} data-testid="hand" >
        {hand.map((card, i) => (
          <Card key={i}
            cardId={card.id}
            code={card.code} 
            tablePosition = {tablePosition}
            number_in_card={card.number_in_card}
            kind={card.kind}
            setCardSelected={setCardSelected}
            playerName={player.name}
            playerRole={player.role}
            isTurnOwner={player.owner}
            />
        ))}
    </div>
  );
};


export default Hand;

