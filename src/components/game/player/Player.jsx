import { useContext, useMemo, useState, useEffect } from "react";
import styles from "./player.module.css";
import { CardSelectedContext, 
  PlayerSelectedContext, 
  SetPlayerSelectedContext, 
  PlayersAliveContext, 
  SetDiscardContext, 
  GameContext
} from "../Game";

const Player = ({
  name,
  playerData,
  player
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
    turnOwnerIndex = playersAlive.findIndex(player => player.table_position === turnOwner);  
    const player_on_right = playersAlive[(turnOwnerIndex + 1) % playersAlive.length];
    const player_on_left = playersAlive[(((turnOwnerIndex - 1) + playersAlive.length) % playersAlive.length)];    

    const pTS = () => {    
      switch (cardSelected.code){
        //sospecha, análisis, lanzallamas, cambio de lugar
        case "sos": //sospecha
        case "ana": //análisis
          return [player_on_left, player_on_right];        
        case "lla": //lanzallamas
          if (player.quarantine == 0){
            return [player_on_left, player_on_right];        
          }
          else {
            return [];
          }
        case "cua": //cuarentena
          return [player_on_left, player_on_right];
        case "sed": //seducción
          return playersAlive.filter(player => player.table_position != turnOwner);
        case "cdl": //cambio de lugar
          if (player.quarantine == 0){
            if (player_on_right.quarantine == 0 && player_on_left.quarantine == 0)
              return [player_on_left, player_on_right];        
            else if (player_on_right.quarantine !== 0)
              return [player_on_left];
            else if (player_on_left.quarantine !== 0)
              return [player_on_right]
          }
          else {
            return [];
          }
        case "mvc": //más vale que corras
          if (player.quarantine == 0){
            return playersAlive.filter(player => player.table_position != turnOwner && player.quarantine == 0);
          }
          else {
            return [];
          }
        default: // defense cards, wiskey and vigila tus espaldas
          return [];
      }
    };
    setPlayersToSelect(pTS());

    if(namePlayerSelected !== playersToSelect.filter(player => player.name === namePlayerSelected).name){
      setPlayerSelected({});
    }

    
  }, [cardSelected]);
    
  const selectPlayer = () => {
    if (name === namePlayerSelected){
      setPlayerSelected({});
    }
    else if ( cardSelected.cardId !== undefined &&
              turnState === 1){
        //if a card has been selected. 
        /*check how to select depending on the card selected 
        if the card is sospecha or cambio de lugar => select adyacent player
        if the card is whisky or vigila tus espaldas => don't select player
        if the card is mas vale que corras => select any player who is alive */
      switch (cardSelected.code){
        case "sos": //sospecha
        case "ana": //análisis
        case "lla": //lanzallamas
        case "cdl": //cambio de lugar
        case "mvc": //mas vale que corras
        case "sed": //seducción
        case "cua": //cuarentena
          if (playersToSelect.filter(player => player.name === name).length !== 0){
            setPlayerSelected({ name: name });
            setDiscard.setDiscard(false);
          }
          break; 
        default: // defense cards, wiskey and vigila tus espaldas
          setPlayerSelected({});
          setDiscard.setDiscard(false);
        }
  };} 
  

  return (
    <div className={playerStyle} style={style} onClick={selectPlayer} data-testid={"player-"+name}>
      {name === player.name ? <span className={styles.me}>{"Tu"}</span> : <span className={styles.playerText}>{playerData.name}</span>}
    </div>
  )
}

export default Player;
