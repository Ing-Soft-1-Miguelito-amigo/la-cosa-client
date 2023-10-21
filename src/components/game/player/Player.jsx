import { useContext, useMemo, useState, useEffect } from "react";
import styles from "./player.module.css";
import { CardSelectedContext, 
  PlayerSelectedContext, 
  SetPlayerSelectedContext, 
  PlayersAliveContext, 
  TurnOwnerContext, 
  SetDiscardContext, 
  GameContext
} from "../Game";

const Player = ({
  name,
  playerData
}) => {
  const namePlayerSelected = useContext(PlayerSelectedContext);
  const setPlayerSelected = useContext(SetPlayerSelectedContext);
  const cardSelected = useContext(CardSelectedContext)
  const playersAlive = useContext(PlayersAliveContext);
  const setDiscard = useContext(SetDiscardContext);
  const gameData = useContext(GameContext)
  const turnOwner = gameData.turn.owner;
  const turnState = gameData.turn.state; 
  
  const isAlive = useMemo(() => playerData ? playerData.alive : undefined, [playerData]);
  const hasTurn = useMemo(() => turnOwner === playerData.table_position, [playerData, turnOwner]);
  const [playersToSelect, setPlayersToSelect] = useState([]);
  let turnOwnerIndex; 
  
  const playerStyle = namePlayerSelected === name ? styles.playerSelected : styles.playerStyle;

  const style = {
    backgroundColor: isAlive ? (namePlayerSelected === name ? "rgb(100, 240, 250)" : "rgb(70, 190, 119)") : "rgb(100, 100, 100)",
    borderColor: hasTurn ? "rgb(255, 127, 80)" : (namePlayerSelected === name ? "rgb(250, 250, 250)" : "rgb(0, 0, 0)"),
  };

  useEffect(() => {
    if (cardSelected.cardId == undefined) {
      setPlayerSelected({});
    }
  },[cardSelected])

  
  useEffect(() => {
    // obtain the player alives next to the turnOwner
    const pTS = () => {
      turnOwnerIndex = playersAlive.findIndex(player => player.table_position === turnOwner);
      const player_on_right = playersAlive[(turnOwnerIndex + 1) % playersAlive.length];
      const player_on_left = playersAlive[(((turnOwnerIndex - 1) + playersAlive.length) % playersAlive.length)];
      return [player_on_left, player_on_right];

    };
    setPlayersToSelect(pTS());
  }, [turnOwner, cardSelected, namePlayerSelected]);

  console.log("card", cardSelected);
    
  const selectPlayer = () => {
    console.log("turn state", turnState)
    switch(turnState){
      
    //taking decision
    case 1: 
            if (cardSelected.cardId !== undefined  &&   //if a card has been selected. 
                name !== namePlayerSelected )           //if another player has been selected   
              {
                /*check how to select depending on the card selected 
                if the card is sospecha or cambio de lugar => select adyacent player
                if the card is whisky or vigila tus espaldas => don't select player
                if the card is mas vale que corras => select any player who is alive */
                switch (cardSelected.code){
                  case "whk": //whisky
                  case "vte": //vigila tus espaldas
                    setPlayerSelected({});
                    setDiscard.setDiscard(false);
                    break; 

                  case "mvc": //más vale que corras  
                    //check if the player selected is alive. 
                    if (playerData.name !== playersAlive[turnOwnerIndex].name && 
                      playersAlive.findIndex(player => player.name === name) !== -1) {
                      setPlayerSelected({name: name})
                      setDiscard.setDiscard(false);
                    }
                    break; 
                 
                  default: //sospecha, análisis, lanzallamas, cambio de lugar
                    if (name == playersToSelect[0].name || name == playersToSelect[1].name){
                      setPlayerSelected({ name: name });
                      setDiscard.setDiscard(false);
                    } 
                  break; 
              }
            }
            else{
              console.log(cardSelected.cardId, namePlayerSelected)
            }
            break; 
    case 2: 
      setPlayerSelected({})
      break;
    default: 
      setPlayerSelected({})
      break;
      
    }
  }; 

  return (
    <div className={playerStyle} style={style} onClick={selectPlayer} data-testid={"player-"+name}>
      <span className={styles.playerText}>{playerData.name}</span>

    </div>
  )
}

export default Player;
