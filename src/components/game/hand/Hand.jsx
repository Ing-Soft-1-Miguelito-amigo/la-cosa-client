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
  // const [tablePosition, setTablePosition] = useState();
  const turn = gameData.turn;

  useEffect(() => {
    setHand(player.hand)
    // setTablePosition(player.table_position)
  },[player]);

  useEffect(() => {
    //If the state of the turn is defense and the destination player is me 
    if ( (turn.state === 4 || turn.state === 2) && turn.destination_change === player.name){
      const arrayCodes = ["ate", "ngs", "fal"];
      const defendCard = hand.filter(card => arrayCodes.includes(card.code));
      if (defendCard.length !== 0){
        setCardSelected({ cardId:defendCard[0].id, code:defendCard[0].code, kind:defendCard[0].kind });       
        defendCard( defendCard[0].id);
      }else{
        defendCard(null);
      }
    }
    else if (turn.state === 2 && turn.destination_player === player.name) {
      //check if hand has a valid card to defend 
      const cardCode = turn.played_card.code;
      switch(cardCode){
        case "lla": 
          //Card played 'lanzallamas', then check if player has 'nada de barbacoas'
          const defendCardlla = hand.filter(card => card.code === "ndb");
          if (defendCardlla.length !== 0){
            setCardSelected({ cardId:defendCardlla[0].id, code:defendCardlla[0].code, kind:defendCardlla[0].kind });
            defendCard( defendCardlla[0].id);
          }else{
            defendCard(null);
          }
          break;
        case "cdl":
        case "mvc":
          const defendCardcdl = hand.filter(card => card.code === "aeb");
          if (defendCardcdl.length !== 0){
            setCardSelected({ cardId:defendCardcdl[0].id, code:defendCardcdl[0].code, kind:defendCardcdl[0].kind });
            defendCard( defendCardcdl[0].id);
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
            number_in_card={card.number_in_card}
            kind={card.kind}
            setCardSelected={setCardSelected}
            playerName={player.name}
            playerRole={player.role}
            tablePosition={player.table_position}
            />
        ))}
    </div>
  );
};


export default Hand;

