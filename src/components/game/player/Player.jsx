import { useContext, useMemo, useState, useEffect } from "react";
import styles from "./player.module.css";
import { CardSelectedContext, PlayerSelectedContext, SetPlayerSelectedContext, PlayersAliveContext, TurnOwnerContext } from "../Game";


const Player = ({
  name,
  playerData
}) => {
  const namePlayerSelected = useContext(PlayerSelectedContext);
  const setPlayerSelected = useContext(SetPlayerSelectedContext);
  const cardSelected = useContext(CardSelectedContext)
  const playersAlive = useContext(PlayersAliveContext);
  const turnOwner = useContext(TurnOwnerContext);

  const isAlive = useMemo(() => playerData ? playerData.alive : undefined, [playerData]);
  const hasTurn = useMemo(() => turnOwner === playerData.table_position, [playerData, turnOwner]);
  const [playersToSelect, setPlayersToSelect] = useState([]);

  const playerStyle = namePlayerSelected === name ? styles.playerSelected : styles.playerStyle;

  const style = {
    backgroundColor: isAlive ? (namePlayerSelected === name ? "rgb(100, 240, 250)" : "rgb(70, 190, 119)") : "rgb(100, 100, 100)",
    borderColor: hasTurn ? "rgb(255, 127, 80)" : (namePlayerSelected === name ? "rgb(250, 250, 250)" : "rgb(0, 0, 0)"),
  };

  useEffect(() => {
    // obtain the player alives next to the turnOwner
    const pTS = () => {
      const turnOwnerIndex = playersAlive.findIndex(player => player.table_position === turnOwner);
      const player_on_right = playersAlive[(turnOwnerIndex + 1) % playersAlive.length];
      const player_on_left = playersAlive[(((turnOwnerIndex - 1) + playersAlive.length) % playersAlive.length)];
      return [player_on_left, player_on_right];
    };
    setPlayersToSelect(pTS());
  }, [turnOwner, cardSelected, namePlayerSelected]);

  const selectPlayer = () => {
    // verify if the player selected is one of the players alives next to the turnOwner
    // and if the player selected is not the player who is playing
    // and if the card was selected
    if (cardSelected.cardId !== undefined
      && name !== namePlayerSelected
      && (name == playersToSelect[0].name
        || name == playersToSelect[1].name)) {
      setPlayerSelected({ name: name });
    }
    else {
      return 0;
    }
    return 1;
  };

  return (
    <div className={playerStyle} style={style} onClick={selectPlayer} data-testid={"player-"+name}>
      <span className={styles.playerText}>{playerData.name}</span>

    </div>
  )
}

export default Player;