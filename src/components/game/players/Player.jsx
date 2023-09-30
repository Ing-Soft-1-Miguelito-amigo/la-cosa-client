import { useState, useEffect } from "react";
import styles from "./player.module.css";

const Player = ({ name, tablePosition }) => {
    const [isAlive, setIsAlive] = useState(true)
    const [turn, setTurn] = useState(false)

    useEffect(() =>{
        // retrieve api data
        const apiData = {   gameId: 1,
                            name: "partidita",
                            state: 0,
                            turnOwner: 2,
                            players: [  {name: "augusto", position: 1, alive: true, quarantine: false},
                                        {name: "corazondemiel", position: 2, alive: true, quarantine: false}]
                        };
        // filter api data per player (?
        const playerData = {name: "augusto", position: 1, alive: true, quarantine: false, turnOwner: 2}
        setIsAlive(playerData.alive)
        setTurn(playerData.turnOwner == tablePosition)
    }, [])

    return (
        <div className={styles.playerStyle}>
            <span className={styles.playerText}>{tablePosition}</span>
        </div>
    )
}

export default Player;