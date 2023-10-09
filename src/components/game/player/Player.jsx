import { useMemo } from "react";
import styles from "./player.module.css";

const Player = ({ 
    name,
    apiData, 
    selectPlayer, 
    namePlayerSelected
}) => {
    const playerData = apiData.players.find((player) => player.name === name);
    const isAlive = useMemo(() => playerData ? playerData.alive : undefined, [playerData]);
    const hasTurn = useMemo(() => apiData.turn_owner === playerData.table_position, [apiData]);


    const playerStyle = namePlayerSelected === name ? styles.playerSelected : styles.playerStyle;
    
    const style = {
        backgroundColor: isAlive ? (namePlayerSelected === name ? "rgb(100, 240, 250)" : "rgb(70, 190, 119)") : "rgb(100, 100, 100)",
        borderColor: hasTurn ? "rgb(255, 127, 80)" : (namePlayerSelected === name ? "rgb(250, 250, 250)":"rgb(0, 0, 0)"),
    };

    return (
        <div className={playerStyle} style={style} onClick={() => selectPlayer(name)}>
            <span className={styles.playerText}>{playerData.name}</span>
            
        </div>
    )
}

export default Player;