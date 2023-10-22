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
      switch (cardSelected.code){
        case "whk": //whisky
        case "vte": //vigila tus espaldas
          return [];
        case "mvc": //más vale que corras
          return playersAlive.filter(player => player.table_position != turnOwner)

        default: //sospecha, análisis, lanzallamas, cambio de lugar
          turnOwnerIndex = playersAlive.findIndex(player => player.table_position === turnOwner);
          const player_on_right = playersAlive[(turnOwnerIndex + 1) % playersAlive.length];
          const player_on_left = playersAlive[(((turnOwnerIndex - 1) + playersAlive.length) % playersAlive.length)];
          return [player_on_left, player_on_right];}
    };
    setPlayersToSelect(pTS());

    if(namePlayerSelected !== playersToSelect.filter(player => player.name === name)[0].name){
      setPlayerSelected({});
    }

  }, [cardSelected]);

    
  const selectPlayer = () => {
    console.log("turn state", turnState)
    if (name === namePlayerSelected){
      setPlayerSelected({});
      setDiscard.setDiscard(false);
    }
    else if ( cardSelected.cardId !== undefined &&
              turnState === 1){
        //if a card has been selected. 
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

        default: //sospecha, análisis, lanzallamas, cambio de lugar, más vale que corras 
          if (name === playersToSelect.filter(player => player.name === name)[0].name){
            setPlayerSelected({ name: name });
            setDiscard.setDiscard(false);
          } 
        }
  };} 
  

  return (
    <div className={playerStyle} style={style} onClick={selectPlayer} data-testid={"player-"+name}>
      <span className={styles.playerText}>{playerData.name}</span>

    </div>
  )
}

export default Player;
