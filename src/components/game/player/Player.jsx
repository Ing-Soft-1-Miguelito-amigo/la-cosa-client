import { useMemo } from "react";
import styles from "./player.module.css";

const Player = ({ name, apiData, selectPlayer }) => {
    const playerData = apiData.players.find((player) => player.name === name);
    const isAlive = useMemo(() => playerData ? playerData.alive : undefined, [playerData]);
    const hasTurn = useMemo(() => apiData.turn_owner === playerData.table_position, [apiData]);

    const style = {
        backgroundColor: isAlive ? "rgb(68, 204, 159)": "rgb(100, 100, 100)",
        borderColor: hasTurn ? "rgb(255, 127, 80)" : "rgb(0, 0, 0)",
    };

    return (
        <div className={styles.playerStyle} style={style} onClick={() => selectPlayer(name)}>
            <span className={styles.playerText}>{playerData.name}</span>
        </div>
    )
}

export default Player;