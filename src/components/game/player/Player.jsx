import { useMemo } from "react";
import styles from "./player.module.css";

const Player = ({ name, apiData }) => {
    const playerData = apiData.players.find((player) => player.name === name);
    const isAlive = useMemo(() => playerData ? playerData.alive : undefined, [playerData]);
    const hasTurn = useMemo(() => apiData.turn_owner === playerData.table_position, [apiData]);

    const style = {
        backgroundColor: isAlive ? "rgb(98, 173, 35)": "rgb(100, 100, 100)",
        borderColor: hasTurn ? "rgb(181, 35, 35)" : "rgb(80,80,80)",
    };

    return (
        <div className={styles.playerStyle} style={style}>
            <span className={styles.playerText}>{name}</span>
        </div>
    )
}

export default Player;