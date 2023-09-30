import { useNavigate } from "react-router-dom";
import styles from "./game.module.css";
import Player from "./players/Player";

const players = [
    { id: 1, name: "juan", alive: true, quarantine: false, tablePosition: 1 },
    { id: 2, name: "pedro", alive: true, quarantine: false, tablePosition: 2 },
    { id: 3, name: "pablo", alive: true, quarantine: false, tablePosition: 3 },
    { id: 4, name: "roman", alive: true, quarantine: false, tablePosition: 4 },
    { id: 5, name: "roman2", alive: true, quarantine: false, tablePosition: 5 },
    { id: 6, name: "roman3", alive: true, quarantine: false, tablePosition: 6 },
    { id: 7, name: "roman4", alive: true, quarantine: false, tablePosition: 7 },
];  

const Game = () => {
    const navigate = useNavigate()
    const gotoEndOfGame = () => {
        navigate("/end-of-game")
    }

    return (
        <div className="game">
            <div>
                <h2>Esta es la partida</h2>
                <button onClick={ gotoEndOfGame }>Ir a pantalla de finalizcion de partida</button>
            </div>
            <div className={styles.playersContainer}>
                {players.map((player) => {
                    return (
                            <Player
                                key={player.id} 
                                name={player.name} 
                            />
                    )
                })}
            </div>
        </div>
    )
}

export default Game;